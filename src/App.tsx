import { createContext, useContext, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import map4d from './map4d'

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
  const [mainObjects, setMainObjects] = useState({})
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

  console.log(mainObjects)

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

  useEffect(() => {
    map4dContext.createDataLayer(dataLayerId)
    // console.log('start fetch data layer ', dataLayerId)
    fetch(`data-layers/${dataLayerId}/objects/count`)
      .then(value => value.json())
      .then(value => {
        const count: number = value.count as any
        const pageNum = Math.ceil(count / 3)
        const pages = new Array<number>()
        for (let i = 1; i <= pageNum; i++) {
          pages.push(i)
        }
        setPages(pages)
      })

    return () => map4dContext.deleteMainObjects(dataLayerId)
  }, [])

  return <>
    {pages.map(page => <FetchDataLayerObjectsPerPage key={page} dataLayerId={dataLayerId} page={page} />)}
  </>
}

function FetchDataLayerObjectsPerPage({ dataLayerId, page }: { dataLayerId: string, page: number }) {
  const map4dContext = useContext(Map4dContext)

  const controller = useRef(new AbortController())
  useEffect(() => {
    return () => {
      controller.current.abort()
    }
  }, [])

  useEffect(() => {
    // console.log('start fetch data layer ', dataLayerId, 'page ', page)
    fetch(`data-layers/${dataLayerId}/objects?page=${page}`, { signal: controller.current.signal })
      .then(value => value.json())
      .then(value => {
        // console.log(value)
        map4dContext.pushMainObjects(dataLayerId, page, value)
      })
  }, [])

  return null
}
export default App
