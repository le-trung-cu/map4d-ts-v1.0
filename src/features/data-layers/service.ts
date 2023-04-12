import { response } from 'msw'
import { emptySplitApi } from '../../app/emptySplitApi'
import TrasnformMainObjectWorker from './workers/transformMainObjectWorker?worker'
import { db } from '../../database'
import Dexie from 'dexie'

const dataLayerApi = emptySplitApi.injectEndpoints({
  overrideExisting: true,
  endpoints: build => ({
    getMainObjectPageCount: build.query<number, string>({
      query: id => id ? `/api/data-layers/${id}/main-objects/count` : '',
      transformResponse: (response: { count: number }) => {
        return response.count
      }
    }),
    getMainObjectsByDataLayerId: build.query<string, { id: string, page: number }>({
      query: ({ id, page }) => id ? `/api/data-layers/${id}/main-objects?page=${page}` : '',
      transformResponse: async (response: { mainObjects: Array<any> }, meta, { id, page }) => {
        const worker = new TrasnformMainObjectWorker()
        worker.postMessage({ mainObjects: response.mainObjects, dataLayerId: id, page })

        const result = await new Promise((resolve, reject) => {
          worker.onmessage = (e: { data: string }) => {
            console.log('onmessage getMainObjectsByDataLayerId', e)
            resolve(e.data)
          }

          setTimeout(() => {
            resolve('reject ABC')
          }, 10000)
        })
        console.log('result', result)
        return 'result'
      }
    }),
    // getGeometryPropertiesByLayerId: build.query<string, string>({
    //   query: id => id ? `/api/data-layers/${id}/geometry-properties` : '',
    //   transformResponse: async (response: {}, meta, id) => {
    //     //
    //   }
    // }),
    getMainObjects: build.query<string, string>({
      query: id => id ? `/api/data-layers/${id}/main-objects/count` : '',
      transformResponse: async (response: { count: number }, meta, id) => {
        await db.geometryProperties
          .where('[dataLayerId+id]')
          .between([id, Dexie.minKey], [id, Dexie.maxKey])
          .delete()

        await db.mainObjects
          .where({ dataLayerId: id })
          .delete()

        const geometryProperties = await fetch(`/api/data-layers/${id}/geometry-properties`)
          .then(value => value.json())
          .then(value => {
            // db.geometryProperties.bulkAdd(value.geometryProperties)
            return value.geometryProperties.reduce((result: any, item: any) => {
              result[item.id] = item
              return result 
            }, {})
          })

        console.log(geometryProperties)

        const numPages = Math.ceil(response.count / 3)
        for (let page = 1; page <= numPages; page++) {
          fetch(`/api/data-layers/${id}/main-objects?page=${page}`)
            .then(value => value.json())
            .then(({ mainObjects }) => {
              for (const mainObject of mainObjects) {
                mainObject.page = page
                mainObject.dataLayerId = id
                for (const timeline of mainObject.timelines) {
                  timeline.geometry.properties =  geometryProperties[timeline.geometryPropertyId]
                }
              }
              db.mainObjects.bulkAdd(mainObjects)
            })
        }

        return ''
      }
    })
  })
})

export const {
  useGetMainObjectPageCountQuery,
  useGetMainObjectsByDataLayerIdQuery,
  useGetMainObjectsQuery,
  // useGetGeometryPropertiesByLayerIdQuery,
} = dataLayerApi