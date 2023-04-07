import { createContext, useContext, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import map4d from './map4d'
import { useGetMainObjectPageCountQuery, useGetMainObjectsByDataLayerIdQuery } from './features/data-layers/service'

const Map4dContext = createContext({
  mainObjects: {},
  createDataLayer: (dataLayerId: string) => {/* */ },
  pushMainObjects: (dataLayerId: string, page: number, objects: any) => {/* */ },
  deleteMainObjects: (dataLayerId: string) => {/* */ },
})


function App() {
  const dataLayers = [
    {
      name: 'layer 1',
      id: '1',
    },
    {
      name: 'layer 2',
      id: '2',
    },
    {
      name: 'layer 3',
      id: '3',
    },
    {
      name: 'layer 4',
      id: '4',
    }
  ]
  const [selectedIds, setSelectedIds] = useState(new Array<string>())
  const mainObjectsRef = useRef<Record<string, any>>({})
  const [mainObjects, setMainObjects] = useState<Record<string, any>>({})
  const drawnMainObjects = useRef<Record<string, any>>({})
  const boundedDrawTimmer = useRef<ReturnType<typeof setTimeout> | null>()

  const map4dContext = {
    mainObjects: mainObjectsRef.current,
    createDataLayer: (dataLayerId: string) => {
      mainObjectsRef.current[dataLayerId] = {}
    },
    pushMainObjects: (dataLayerId: string, page: number, objects: any) => {
      console.log('pushMainObjects')
      mainObjectsRef.current[dataLayerId] = { ...mainObjectsRef.current[dataLayerId], [page]: objects }
      setMainObjects({ ...mainObjectsRef.current })
    },
    deleteMainObjects: (dataLayerId: string) => {
      console.log('deleteMainObjects')
      delete mainObjectsRef.current[dataLayerId]
      setMainObjects({ ...mainObjectsRef.current })
    }
  }

  useEffect(() => {
    if (boundedDrawTimmer.current !== null) {
      clearTimeout(boundedDrawTimmer.current)
      boundedDrawTimmer.current = null
    }
    boundedDrawTimmer.current = setTimeout(() => {
      boundedDrawTimmer.current = null
      draw()
    }, 300)

    function draw() {
      const selectedIds = Object.keys(mainObjects)
      const drawnIds = Object.keys(drawnMainObjects.current)
      const unChecedSelectedIds = drawnIds.filter(id => !selectedIds.includes(id))

      if (unChecedSelectedIds.length > 0) {
        console.log('xóa các datalayer khỏi map, ', unChecedSelectedIds)
        for (const id of unChecedSelectedIds) {
          delete drawnMainObjects.current[id]
        }
      }

      /** xác định việc vẽ thêm sẽ hơi khác vì mỗi layer sẽ vẽ nhiều page */
      // các page trong mainObjects
      const selectedPages = new Map()
      for (const dataLayerId in mainObjects) {
        for (const page in mainObjects[dataLayerId]) {
          selectedPages.set(`${dataLayerId}:${page}`, { dataLayerId, page })
        }
      }

      // các page đã vẽ
      const drawnPages = new Map()
      for (const dataLayerId in drawnMainObjects.current) {
        for (const page in drawnMainObjects.current[dataLayerId]) {
          drawnPages.set(`${dataLayerId}:${page}`, { dataLayerId, page })
        }
      }

      const newPageKeys = [...selectedPages.keys()].filter(key => !drawnPages.has(key))
      if (newPageKeys.length > 0) {
        for (const key of newPageKeys) {
          const { dataLayerId, page } = selectedPages.get(key)
          if (drawnMainObjects.current[dataLayerId] === undefined) {
            drawnMainObjects.current[dataLayerId] = {}
          }
          console.log('vẽ thêm page: ', key)
          drawnMainObjects.current[dataLayerId][page] = mainObjects[dataLayerId][page]
        }
      }
    }
  }, [mainObjects])

  return (
    <Map4dContext.Provider value={map4dContext}>
      <div className="App">
        {dataLayers.map(item => (
          <div key={item.id}>
            <label><input type="checkbox" value={item.id} onChange={(e) => {
              const indexOf = selectedIds.indexOf(item.id)
              if (indexOf === -1) {
                setSelectedIds(state => state.concat(item.id))
              } else {
                setSelectedIds(state => state.filter(id => id !== item.id))
              }
            }} /> {item.name}</label>
          </div>
        ))}
        <div>
          {selectedIds.map(id => <FetchDataLayerObjects key={id} dataLayerId={id} />)}
        </div>
      </div>
    </Map4dContext.Provider>
  )
}


function FetchDataLayerObjects({ dataLayerId }: { dataLayerId: string }) {
  const map4dContext = useContext(Map4dContext)
  const [pages, setPages] = useState(new Array<number>())
  const pageCount = useGetMainObjectPageCountQuery(dataLayerId)

  useEffect(() => {
    map4dContext.createDataLayer(dataLayerId)
    // // console.log('start fetch data layer ', dataLayerId)
    // fetch(`data-layers/${dataLayerId}/objects/count`)
    //   .then(value => value.json())
    //   .then(value => {
    //     const count: number = value.count as any
    //     const pageNum = Math.ceil(count / 3)
    //     const pages = new Array<number>()
    //     for (let i = 1; i <= pageNum; i++) {
    //       pages.push(i)
    //     }
    //     setPages(pages)
    //   })
    return () => map4dContext.deleteMainObjects(dataLayerId)
  }, [])

  useEffect(() => {
    const count = pageCount.data
    if (count) {
      const pageNum = Math.ceil(count / 3)
      const pages = new Array<number>()
      for (let i = 1; i <= pageNum; i++) {
        pages.push(i)
      }
      setPages(pages)
    }
  }, [pageCount.data, setPages])

  return <>
    {pages.map(page => <FetchDataLayerObjectsPerPage key={page} dataLayerId={dataLayerId} page={page} />)}
  </>
}

function FetchDataLayerObjectsPerPage({ dataLayerId, page }: { dataLayerId: string, page: number }) {
  const map4dContext = useContext(Map4dContext)
  const mainObjects = useGetMainObjectsByDataLayerIdQuery({ id: dataLayerId, page })

  useEffect(() => {
    map4dContext.pushMainObjects(dataLayerId, page, mainObjects.data)
  }, [mainObjects.data])

  // const controller = useRef(new AbortController())
  useEffect(() => {
    // console.log('start fetch data layer ', dataLayerId, 'page ', page)
    // fetch(`data-layers/${dataLayerId}/objects?page=${page}`, { signal: controller.current.signal })
    //   .then(value => value.json())
    //   .then(value => {
    //     // console.log(value)
    //     map4dContext.pushMainObjects(dataLayerId, page, value)
    //   })

    return () => {
      // controller.current.abort()
    }
  }, [])

  return null
}
export default App
