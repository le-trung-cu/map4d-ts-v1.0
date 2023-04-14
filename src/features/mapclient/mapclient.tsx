import { useEffect, useRef } from 'react'
import map4dx from '../../core/map4d'
import drawMap from '../../core/drawMap'
import { DrawPolygonSingle } from '@/core/interactions/drawPolygonSingle'
import indexedMainObject from '@/core/createIndexMainObject'

export default function Mapclient() {
  const drawPolygon = useRef(new DrawPolygonSingle({circle: true, modified: true}))

  useEffect(() => {
    const initmap = () => {
      const map = new map4dx.Map4d(document.getElementById('maproot') as HTMLElement)
      // map.setMapId(defaultConfig.mapOption.mapType)
      map.setPOIsEnabled(false)
      map.setWaterEffect(true)
      // map.setTimeEffect('live')
      map.moveCamera({ target: [108.22278807479455, 16.07148579810236], zoom: 17 })
      drawMap.setMap(map)
      drawPolygon.current.setMap(map)
      drawPolygon.current.subscribe()
      drawPolygon.current.onCompleted = (polygon) => indexedMainObject.search('1', polygon as any)
    }

    initmap()
  }, [])

  return (
    <div id="maproot" className="fixed inset-0" />
  )
}
