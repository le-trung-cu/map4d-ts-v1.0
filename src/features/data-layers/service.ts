import { response } from 'msw'
import { emptySplitApi } from '../../app/emptySplitApi'
import TrasnformMainObjectWorker from './workers/transformMainObjectWorker?worker'

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
        console.log('worker', worker)
        worker.postMessage({ mainObjects: [], layerId: id, page })

        const result = await new Promise((resolve, reject) => {
          worker.onmessage = (e: { data: string }) => {
            console.log('onmessage getMainObjectsByDataLayerId', e)
            resolve(e.data)
          }

          setTimeout(() => {
            resolve('ABC')
          }, 2000)
        })
        console.log('result', result)
        return 'result'
      }
    }),
  })
})

export const {
  useGetMainObjectPageCountQuery,
  useGetMainObjectsByDataLayerIdQuery,
} = dataLayerApi