import { useEffect, useRef, useState } from 'react'
import './App.css'
import { useGetMainObjectsQuery } from './features/data-layers/service'
import drawMap from './core/drawMap'
import Mapclient from './features/mapclient/mapclient'
import indexedMainObject from './core/createIndexMainObject'

function App() {
  const vitualDrawn = useRef({
    selectedObjects: { selectedMainObjects: new Map<string, any>() },
    dataLayers: {},
  })

  const drawnObjects = useRef({
    selectedObjects: { selectedMainObjects: new Map<string, any>() },
    dataLayers: {},
  })
  
  drawMap.setContext(vitualDrawn.current, drawnObjects.current)

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
  const controller = useRef(new AbortController)
  const getMainObjectsQuery = useGetMainObjectsQuery(dataLayerId)
  useEffect(() => {
    drawMap.createDataLayer(dataLayerId, 'Polygon')
    return () => {
      controller.current.abort()
      drawMap.deleteMainObjects(dataLayerId)
    }
  }, [])

  useEffect(() => {
    let _dataLayerId = ''
    if (getMainObjectsQuery.isSuccess) {
      for (const { dataLayerId, page, geoJson } of getMainObjectsQuery.data) {
        _dataLayerId = dataLayerId
        drawMap.pushMainObjects(dataLayerId, page, geoJson)
      }
      if(_dataLayerId !== '')
        indexedMainObject.createIndexDataLayer(_dataLayerId)
    }
  }, [getMainObjectsQuery])

  return <> </>
}

export default App
