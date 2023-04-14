import { emptySplitApi } from '@/app/emptySplitApi'
import TrasnformMainObjectWorker from './workers/transformMainObjectWorker?worker'
import { db } from '@/database'
import Dexie from 'dexie'
import drawMap from '@/core/drawMap'

const dataLayerApi = emptySplitApi.injectEndpoints({
  overrideExisting: true,
  endpoints: build => ({
    getMainObjectPageCount: build.query<number, string>({
      query: id => id ? `/api/data-layers/${id}/main-objects/count` : '',
      transformResponse: (response: { count: number }) => {
        return response.count
      }
    }),
    getMainObjectsByDataLayerId: build.query<string, { id: string, page: number, signal: any }>({
      query: ({ id, page }) => id ? `/api/data-layers/${id}/main-objects?page=${page}` : '',
      transformResponse: async (response: { mainObjects: Array<any> }, meta, { id, page, signal }) => {
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
    getMainObjects: build.query<{ dataLayerId: string, page: number, geoJson: any }[], string>({
      keepUnusedDataFor: 5,
      query: id => id ? `/api/data-layers/${id}/main-objects/count` : '',
      transformResponse: async (response: { count: number }, meta, id) => {

        await db.geometryProperties
          .where({ dataLayerId: id })
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
        const requests: any = []
        for (let page = 1; page <= numPages; page++) {
          const task = fetch(`/api/data-layers/${id}/main-objects?page=${page}`)
            .then(value => value.json())
            .then(({ type, mainObjects }) => {
              if (type === 'Polygon') {
                for (const mainObject of mainObjects) {
                  mainObject.page = page
                  mainObject.dataLayerId = id
                  for (const timeline of mainObject.timelines) {
                    timeline.geometry.properties = geometryProperties[timeline.geometryPropertyId]
                  }
                }

                const features = mainObjects.map((t: any) => {
                  return {
                    'type': 'Feature',
                    'properties': {
                      'stroke': '#555555',
                      'stroke-width': 0,
                      'stroke-opacity': 1,
                      'fill': '#ff0000',
                      'fill-opacity': 1,
                      userData: {
                        dataLayerId: id,
                        page,
                        id: t.id,
                        isMainObject: true,
                      }
                    },
                    'geometry': {
                      'type': t.timelines[0].geometry.type,
                      'coordinates': t.timelines[0].geometry.coordinates,
                    }
                  }
                })

                const geoJson = {
                  'type': 'FeatureCollection',
                  'features': features,
                }

                drawMap.pushMainObjects(id, page, geoJson)
                db.mainObjects.bulkAdd(mainObjects)

                return {
                  dataLayerId: id,
                  type,
                  page,
                  geoJson,
                }
              }

              if(type === 'Point') {
                //
              }
            })

          requests.push(task)
        }

        return Promise.all(requests)
      }
    })
  })
})

export const {
  useGetMainObjectPageCountQuery,
  useGetMainObjectsByDataLayerIdQuery,
  useGetMainObjectsQuery,
  useLazyGetMainObjectsQuery
  // useGetGeometryPropertiesByLayerIdQuery,
} = dataLayerApi