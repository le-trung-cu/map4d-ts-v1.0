import { useEffect } from 'react'
import map4dx from '../../map4d'

export default function Mapclient() {
  useEffect(() => {
    const initmap = () => {
      const map = new map4dx.Map4d(document.getElementById('maproot') as HTMLElement)
      // map.setMapId(defaultConfig.mapOption.mapType)
      map.setPOIsEnabled(false)
      map.setWaterEffect(true)
      map.setTimeEffect('live')
    }

    initmap()
  }, [])

  return (
    <div id="maproot" className="fixed inset-0" />
  )
}
