import { useEffect, useRef, useState } from 'react'
import { useGetDataLayersQuery, useGetMainObjectsQuery } from '../dataLayerApi'
import { GeometryTypes } from '@/core/types'
import drawMap from '@/core/drawMap'
import indexedMainObject from '@/core/createIndexMainObject'
import { useSelector } from 'react-redux'
import { dataLayerSelectors } from '../dataLayerSlice'

export default function Folders() {
  useGetDataLayersQuery()
  const [selectedIds, setSelectedIds] = useState(new Array<string>())
  const [mapDrawnPageDataLayer, setmapDrawnPageDataLayer] = useState<Record<string, number>>({})
  const dataLayers = useSelector(dataLayerSelectors.dataLayerList)

  useEffect(() => {
    drawMap.emmiter.on('drawn-data-layer', (e) => {
      setmapDrawnPageDataLayer(e)
    })

    return () => drawMap.emmiter.off('drawn-data-layer')
  }, [])

  return (
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
          }} /> {item.name}: {mapDrawnPageDataLayer[item.id]}</label>
        </div>
      ))}
      <div>
        {selectedIds.map(id => <FetchDataLayerObjects key={id} dataLayerId={id} type={dataLayers.find(t => t.id === id)!.type as GeometryTypes} />)}
      </div>
    </div>
  )
}

function FetchDataLayerObjects({ dataLayerId, type }: { dataLayerId: string, type: GeometryTypes }) {
  const controller = useRef(new AbortController)
  const getMainObjectsQuery = useGetMainObjectsQuery(dataLayerId)
  useEffect(() => {
    drawMap.createDataLayer(dataLayerId, type)
    return () => {
      controller.current.abort()
      drawMap.deleteMainObjects(dataLayerId)
    }
  }, [])

  useEffect(() => {
    let _dataLayerId = ''
    if (getMainObjectsQuery.isSuccess) {
      for (const { dataLayerId, page, geoJson, type } of getMainObjectsQuery.data) {
        _dataLayerId = dataLayerId
        drawMap.pushMainObjects(dataLayerId, page, { type, geoJson })
      }
      if (_dataLayerId !== '')
        indexedMainObject.createIndexDataLayer(_dataLayerId, type)
    }
  }, [getMainObjectsQuery])

  return <> </>
}