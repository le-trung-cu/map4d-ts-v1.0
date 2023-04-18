import { emptySplitApi } from '@/app/emptySplitApi'
import TrasnformMainObjectWorker from './workers/transformMainObjectWorker?worker'
import { IDataLayer, db } from '@/database'
import Dexie from 'dexie'
import drawMap from '@/core/drawMap'
import { GeometryTypes } from '@/core/types'


export const dataLayerApi = emptySplitApi.injectEndpoints({
  overrideExisting: true,
  endpoints: build => ({
    getDataLayers: build.query<{ ids: Array<IDataLayer['id']>, items: Record<IDataLayer['id'], IDataLayer> }, void>({
      query: () => '/api/data-layers',
      transformResponse: async (response: IDataLayer[], meta, id) => {
        await db.dataLayers.clear()
        await db.dataLayers.bulkAdd(response)
        const items = response.reduce((result: Record<IDataLayer['id'], IDataLayer>, item) => {
          result[item.id] = item
          return result
        }, {})
        return {
          ids: Object.keys(items),
          items,
        }
      }
    }),
    getMainObjectPageCount: build.query<number, string>({
      query: id => id ? `/api/data-layers/${id}/main-objects/count` : '',
      transformResponse: (response: { count: number }) => {
        return response.count
      }
    }),
    getMainObjects: build.query<{ dataLayerId: string, page: number, type: GeometryTypes, geoJson?: any }[], string>({
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

        const numPages = Math.ceil(response.count / 30)
        const requests: any = []
        for (let page = 1; page <= numPages; page++) {
          const task = fetch(`/api/data-layers/${id}/main-objects?page=${page}&page-size=30`)
            .then(value => value.json())
            .then(({ type, mainObjects }) => {
              for (const mainObject of mainObjects) {
                mainObject.page = page
                mainObject.dataLayerId = id
                for (const timeline of mainObject.timelines) {
                  timeline.geometry.properties = geometryProperties[timeline.geometryPropertyId]
                }
              }

              if (type === 'Polygon') {
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

                drawMap.pushMainObjects(id, page, { type, geoJson })
                db.mainObjects.bulkAdd(mainObjects)

                return {
                  dataLayerId: id,
                  type,
                  page,
                  geoJson,
                }
              }

              if (type === 'Point') {
                drawMap.pushMainObjects(id, page, { type })
                db.mainObjects.bulkAdd(mainObjects)

                return {
                  dataLayerId: id,
                  type,
                  page,
                }
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
  useGetDataLayersQuery,
  useGetMainObjectPageCountQuery,
  useGetMainObjectsQuery,
  useLazyGetMainObjectsQuery
  // useGetGeometryPropertiesByLayerIdQuery,
} = dataLayerApi


