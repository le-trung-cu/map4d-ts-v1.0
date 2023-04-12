import { useEffect, useState } from 'react'
import './App.css'
import { useGetMainObjectPageCountQuery, useGetMainObjectsByDataLayerIdQuery, useGetMainObjectsQuery } from './features/data-layers/service'
import drawMap from './drawMap'
import Mapclient from './features/mapclient/mapclient'



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

  return (
    <div className="App">
      <div className="fixed top-0 left-0 z-10 bg-white p-5">
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
      <Mapclient />
    </div>
  )
}


function FetchDataLayerObjects({ dataLayerId }: { dataLayerId: string }) {
  const [pages, setPages] = useState(new Array<number>())
  const getMainObjectsQuery = useGetMainObjectsQuery(dataLayerId)

  useEffect(() => {
    drawMap.createDataLayer(dataLayerId)
    return () => drawMap.deleteMainObjects(dataLayerId)
  }, [])

  // useEffect(() => {
  //   const count = pageCount.data
  //   if (count) {
  //     const pageNum = Math.ceil(count / 10)
  //     const pages = new Array<number>()
  //     for (let i = 1; i <= pageNum; i++) {
  //       pages.push(i)
  //     }
  //     setPages(pages)
  //   }
  // }, [pageCount.data, setPages])

  return <>
    {/* { && pages.map(page => <FetchDataLayerObjectsPerPage key={page} dataLayerId={dataLayerId} page={page} />)} */}
  </>
}

function FetchDataLayerObjectsPerPage({ dataLayerId, page }: { dataLayerId: string, page: number }) {
  const mainObjects = useGetMainObjectsByDataLayerIdQuery({ id: dataLayerId, page })

  useEffect(() => {
    drawMap.pushMainObjects(dataLayerId, page, mainObjects.data)
  }, [mainObjects.data])

  return null
}
export default App
