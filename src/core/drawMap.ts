import type { Map4d, MapEvent, Marker, Polygon, Polyline } from 'typeing-map4d'
import map4dx from '@/core/map4d'
import { db } from '@/database'
import mitt, { Emitter } from 'mitt'
import { delay } from '@/utils'
import { DrawType, GeometryTypes } from './types'


type GeoJsonStringType = string
type DataLayerId = string
type MainObjectId = string

interface IDrawnObject {
  selectedObjects: {
    selectedMainObjects: Map<MainObjectId, {
      dataLayerId: string,
      type: GeometryTypes,
      geometries: Polyline[] | Marker[],
      [x: string]: any,
    } | null>,
  },
  dataLayers: Record<DataLayerId, {
    type: GeometryTypes,
    drawnType: DrawType,
    pages: {
      [page: number]: Record<MainObjectId, {
        markers: Marker | Marker[],
      }>
    },
  }>
}

interface IVitualDrawObject {
  isDrawing?: boolean,
  selectedObjects: {
    selectedMainObjects: Map<MainObjectId, {
      dataLayerId: string,
      type: GeometryTypes,
      geometries: any[],
      [x: string]: any,
    } | null>,
  },
  dataLayers: Record<string, {
    type: GeometryTypes,
    drawType: DrawType,
    pages: {
      [page: number]: GeoJsonStringType | boolean,
    }
  }>
}

const drawn: IDrawnObject = {
  selectedObjects: { selectedMainObjects: new Map<MainObjectId, any>() },
  dataLayers: {
    'layer_1': {
      type: 'Polygon',
      drawnType: 'DataLayer',
      pages: {
        [1]: {}
      }
    },
    'layer_2': {
      type: 'Point',
      drawnType: 'Marker',
      pages: {
        [1]: {
          'object_1': {
            markers: new map4dx.Marker({ position: [1, 1] }),
          }
        },
      }
    }
  }
}

const vitualDrawn: IVitualDrawObject = {
  isDrawing: false,
  selectedObjects: { selectedMainObjects: new Map<MainObjectId, any>() },
  // selectedObjects: 
  dataLayers: {
    'layer_1': {
      type: 'Polygon',
      drawType: 'DataLayer',
      pages: {
        [0]: true,
      }
    }
  }
}

class DrawMap {
  drawnObjects!: IDrawnObject
  objects!: IVitualDrawObject
  mapview: Map4d | null = null
  boundedDrawTimmer?: ReturnType<typeof setTimeout>
  emmiter!: Emitter<{
    'drawn-data-layer': Record<string, number>,
  }>

  constructor() {
    // this.drawnObjects = {
    //   selectedObjects: { selectedMainObjects: new Map<MainObjectId, any>() },
    //   dataLayers: {},
    // }
    // this.objects = {
    //   selectedObjects: { selectedMainObjects: new Map<MainObjectId, any>() },
    //   dataLayers: {},
    // }

    this.mapview = null
    this.emmiter = mitt()
  }

  setContext(vitualDrawn: IVitualDrawObject, drawnObjects: IDrawnObject) {
    this.objects = vitualDrawn
    this.drawnObjects = drawnObjects
  }

  setMap(mapview: Map4d) {
    this.mapview = mapview
    mapview.data.addListener(map4dx.MapEvent.click, (e: any) => {
      if (e.feature._properties.userData?.isMainObject) {
        console.log('clicked on main object', e.feature._properties.userData)
        const { dataLayerId, id } = e.feature._properties.userData
        this.setSelectedObject(dataLayerId, id)
      }
    })
    //this.draw()
  }

  createDataLayer(dataLayerId: string, type: GeometryTypes) {
    this.objects.dataLayers[dataLayerId] = {
      type,
      drawType: type === 'Point' ? 'Marker' : 'DataLayer',
      pages: {},
    }
  }

  pushMainObjects(dataLayerId: string, page: number, objects: { geoJson?: any, type: GeometryTypes }) {
    if (this.objects.dataLayers[dataLayerId] !== undefined) {
      if (objects.type === 'Polygon' || objects.type === 'LineString')
        this.objects.dataLayers[dataLayerId].pages = { ...this.objects.dataLayers[dataLayerId].pages, [page]: JSON.stringify(objects.geoJson) }
      if (objects.type === 'Point') {
        this.objects.dataLayers[dataLayerId].pages = {
          ...this.objects.dataLayers[dataLayerId].pages,
          [page]: true,
        }
      }
      //this.draw()
    }
  }

  deleteMainObjects(dataLayerId: string) {
    delete this.objects.dataLayers[dataLayerId]
    // delete select main object of dataLayerId
    for (const key of this.objects.selectedObjects.selectedMainObjects.keys()) {
      const selectedMainObject = this.objects.selectedObjects.selectedMainObjects.get(key)!
      if (selectedMainObject.dataLayerId === dataLayerId) {
        this.objects.selectedObjects.selectedMainObjects.delete(key)
      }
    }
    //this.draw()
  }

  async setSelectedObject(dataLayerId: string, id: string) {
    this.objects.selectedObjects.selectedMainObjects.clear()
    const mainObject = await db.mainObjects.get(id)
    if (mainObject?.id) {

      if ((mainObject as any).timelines[0]!.geometry.type === 'MultiPolygon') {
        const geometries = (mainObject as any).timelines[0]!.geometry.coordinates.map((t: any) => ({
          strokeColor: '#ff0000',
          strokeOpacity: 1.0,
          strokeWidth: 10,
          path: t[0]
        }))
        this.objects.selectedObjects.selectedMainObjects.set(id, {
          dataLayerId,
          type: 'LineString',
          geometries,
        })
      }

      if ((mainObject as any).timelines[0]!.geometry.type === 'Polygon') {
        this.objects.selectedObjects.selectedMainObjects.set(id, {
          type: 'LineString',
          dataLayerId,
          geometries: [{
            strokeColor: '#ff0000',
            strokeOpacity: 1.0,
            strokeWidth: 10,
            path: (mainObject as any).timelines[0]!.geometry.coordinates[0]
          }],
        })
      }
    }
    //this.draw()
  }

  draw() {
    this.#drawThrottle()
  }

  async #drawThrottle() {
    // this.#draw()
    await Promise.all([ delay(300), this.#draw()])
    requestAnimationFrame(this.#drawThrottle.bind(this))
  }

  async #draw() {
    let hasChange = false
    console.log('observerable')

    // delete unselected object
    for (const key of this.drawnObjects.selectedObjects.selectedMainObjects.keys()) {
      if (!this.objects.selectedObjects.selectedMainObjects.has(key)) {
        const x = this.drawnObjects.selectedObjects.selectedMainObjects.get(key)!
        x.geometries.forEach((t) => t.setMap(null))
        this.drawnObjects.selectedObjects.selectedMainObjects.delete(key)
      }
    }

    const selectedDataLayerIds = Object.keys(this.objects.dataLayers)
    const drawnIds = Object.keys(this.drawnObjects.dataLayers)
    const unChecedSelectedIds = drawnIds.filter(id => !selectedDataLayerIds.includes(id))

    // xóa các datalayer khỏi map
    if (unChecedSelectedIds.length > 0) {
      hasChange = true
      console.log('xóa các datalayer khỏi map')
      for (const id of unChecedSelectedIds) {
        // nếu data layer được vẽ bằng data layer, thì cần xóa tất cả data layer đã vẽ, sau đó vẽ lại.
        if (this.drawnObjects.dataLayers[id].drawnType === 'DataLayer') {
          this.mapview?.data.clear()
          for (const drawId of drawnIds) {
            if (this.drawnObjects.dataLayers[drawId].drawnType === 'DataLayer') {
              delete this.drawnObjects.dataLayers[drawId]
            }
          }
          continue
        }
        if (this.drawnObjects.dataLayers[id].drawnType === 'Marker') {
          for (const page in this.drawnObjects.dataLayers[id].pages) {
            const mainObjects = this.drawnObjects.dataLayers[id].pages[page]
            for (const mainObjectId in mainObjects) {
              const markers = mainObjects[mainObjectId].markers
              if (!Array.isArray(markers)) {
                markers.setMap(null)
              }
              else {
                markers.forEach(t => t.setMap(null))
              }
            }
            delete this.drawnObjects.dataLayers[id].pages[page]
          }
          delete this.drawnObjects.dataLayers[id]
        }
        // delete this.drawnObjects.dataLayers[id]
      }
    }

    /** xác định việc vẽ thêm sẽ hơi khác vì mỗi layer sẽ vẽ nhiều page */
    // các page trong mainObjects
    const selectedPages = new Map<string, { dataLayerId: string, page: number, type: GeometryTypes }>()
    for (const dataLayerId in this.objects.dataLayers) {
      const { pages, type } = this.objects.dataLayers[dataLayerId]
      for (const page in pages) {
        const pageNum = page as unknown as number
        selectedPages.set(`${dataLayerId}:${page}`, { dataLayerId, page: pageNum, type })
      }
    }

    // các page đã vẽ
    const drawnPages = new Map()
    for (const dataLayerId in this.drawnObjects.dataLayers) {
      for (const page in this.drawnObjects.dataLayers[dataLayerId].pages) {
        drawnPages.set(`${dataLayerId}:${page}`, { dataLayerId, page })
      }
    }

    const newPageKeys = [...selectedPages.keys()].filter(key => !drawnPages.has(key))
    if (newPageKeys.length > 0) {
      hasChange = true
      for (const key of newPageKeys) {
        const { dataLayerId, page, type } = selectedPages.get(key)!
        if (this.drawnObjects.dataLayers[dataLayerId] === undefined) {
          this.drawnObjects.dataLayers[dataLayerId] = {
            type,
            drawnType: type === 'Point' ? 'Marker' : 'DataLayer',
            pages: { [page]: {} }
          }
        }
        console.log('vẽ thêm page: ', key)
        if (type === 'Point') {
          this.drawnObjects.dataLayers[dataLayerId].pages[page] = {}
          await db.mainObjects.where({ dataLayerId }).each(mainObject => {
            const t = mainObject.timelines[0]
            const marker = new map4dx.Marker({
              position: (t.geometry.coordinates as unknown) as [number, number]
            })
            marker.setMap(this.mapview)
            this.drawnObjects.dataLayers[dataLayerId].pages[page][mainObject.id] = { markers: marker }
          })
        }
        if (type === 'Polygon') {
          const geoJsonStr = this.objects.dataLayers[dataLayerId].pages[page] as GeoJsonStringType
          this.mapview?.data.addGeoJson(geoJsonStr)
          this.drawnObjects.dataLayers[dataLayerId].pages[page] = {}
        }
      }
    }

    /** End xác định việc vẽ thêm sẽ hơi khác vì mỗi layer sẽ vẽ nhiều page */

    /** Draw selected object */
    for (const key of this.objects.selectedObjects.selectedMainObjects.keys()) {
      if (!this.drawnObjects.selectedObjects.selectedMainObjects.has(key)) {
        const mainObject = this.objects.selectedObjects.selectedMainObjects.get(key)!
        const polylines = mainObject?.geometries.map((x: any) => {
          const polyline = new map4dx.Polyline(x)
          polyline.setMap(this.mapview)
          return polyline
        })
        this.drawnObjects.selectedObjects.selectedMainObjects.set(key, {
          dataLayerId: mainObject.dataLayerId,
          type: 'LineString',
          geometries: polylines,
        })
      }
    }

    hasChange && this.trackingDrawDataLayerPage()
  }

  trackingDrawDataLayerPage() {
    const result: Record<string, number> = {}
    for (const dataLayerId in this.drawnObjects.dataLayers) {
      const pages = Object.keys(this.drawnObjects.dataLayers[dataLayerId].pages) as unknown as number[]
      result[dataLayerId] = pages.length
    }
    this.emmiter.emit('drawn-data-layer', result)
  }

}

const drawMap = new DrawMap()

export default drawMap