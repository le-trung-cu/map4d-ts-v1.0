import { useEffect, useRef, useState } from 'react'
import './App.css'
import { useGetDataLayersQuery, useGetMainObjectsQuery } from './features/data-layers/dataLayerApi'
import drawMap from './core/drawMap'
import Mapclient from './features/mapclient/mapclient'
import indexedMainObject from './core/createIndexMainObject'
import { GeometryTypes } from '@/core/types'
import Folders from './features/data-layers/components/Folders'

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



  return (
    <div className="App">
      <Folders/>
      <Mapclient />
    </div>
  )
}




export default App
