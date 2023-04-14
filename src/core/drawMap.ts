import type { Map4d, MapEvent, Marker, Polygon, Polyline } from 'typeing-map4d'
import map4dx from '@/core/map4d'
import { db } from '@/database'

type GeometryType = 'Polygon' | 'MultiPolygon' | 'Point' | 'LineString'
type DrawType = 'DataLayer' | 'Marker' | 'Polygon' | 'LineString'
type GeoJsonStringType = string
type DataLayerId = string
type MainObjectId = string

interface IDrawnObject {
  selectedObjects: {
    selectedMainObjects: Map<MainObjectId, {
      dataLayerId: string,
      type: GeometryType,
      geometries: Polyline[] | Marker[],
      [x: string]: any,
    } | null>,
  },
  dataLayers: Record<string, {
    type: GeometryType,
    drawnType: DrawType,
    pages: {
      [page: number]: Record<string, {
        markers: Marker | Marker[],
      }>
    },
  }>
}

interface IVitualDrawObject {
  selectedObjects: {
    selectedMainObjects: Map<MainObjectId, {
      dataLayerId: string,
      type: GeometryType,
      geometries: any[],
      [x: string]: any,
    } | null>,
  },
  dataLayers: Record<string, {
    type: GeometryType,
    drawType: DrawType,
    pages: {
      [page: number]: [] | GeoJsonStringType,
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
  selectedObjects: { selectedMainObjects: new Map<MainObjectId, any>() },
  // selectedObjects: 
  dataLayers: {
    'layer_1': {
      type: 'Polygon',
      drawType: 'DataLayer',
      pages: {
        [0]: [],
      }
    }
  }
}

class DrawMap {
  drawnObjects!: IDrawnObject
  objects!: IVitualDrawObject
  mapview: Map4d | null = null
  boundedDrawTimmer: ReturnType<typeof setTimeout> | null = null

  constructor() {
    // this.drawnObjects = {
    //   selectedObjects: { selectedMainObjects: new Map<MainObjectId, any>() },
    //   dataLayers: {},
    // }
    // this.objects = {
    //   selectedObjects: { selectedMainObjects: new Map<MainObjectId, any>() },
    //   dataLayers: {},
    // }
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
    this.draw()
  }

  createDataLayer(dataLayerId: string, type: GeometryType) {
    this.objects.dataLayers[dataLayerId] = {
      type,
      drawType: 'DataLayer',
      pages: {},
    }
  }

  pushMainObjects(dataLayerId: string, page: number, objects: any) {
    if (this.objects.dataLayers[dataLayerId] !== undefined) {
      this.objects.dataLayers[dataLayerId].pages = { ...this.objects.dataLayers[dataLayerId].pages, [page]: JSON.stringify(objects) }
      this.draw()
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

    this.draw()
  }

  async setSelectedObject(dataLayerId: string, id: string) {
    this.objects.selectedObjects.selectedMainObjects.clear()
    if (id) {
      this.objects.selectedObjects.selectedMainObjects.set(id, null)
    }
    const mainObject = await db.mainObjects.get(id)
    if (mainObject?.id && this.objects.selectedObjects.selectedMainObjects.has(mainObject?.id)) {

      if ((mainObject as any).timelines[0]!.geometry.type === 'MultiPolygon') {
        const geometries = (mainObject as any).timelines[0]!.geometry.coordinates.map((t: any) => ({
          strokeColor: '#ff0000',
          strokeOpacity: 1.0,
          strokeWidth: 10,
          path: t[0]
        }))
        this.objects.selectedObjects.selectedMainObjects.set(id, {
          dataLayerId,
          type: 'MultiPolygon',
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

    this.draw()
  }

  draw() {
    if (this.mapview === null)
      return

    if (this.boundedDrawTimmer !== null) {
      clearTimeout(this.boundedDrawTimmer)
      this.boundedDrawTimmer = null
    }
    this.boundedDrawTimmer = setTimeout(() => {
      this.boundedDrawTimmer = null
      this.#draw()
    }, 0)
  }

  #draw() {
    // xóa các selected object
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
      console.log('xóa các datalayer khỏi map')
      for (const id of unChecedSelectedIds) {
        // nếu data layer được vẽ bằng data layer, thì cần xóa tất cả data layer đã vẽ, sau đó vẽ lại.
        if (this.drawnObjects.dataLayers[id].drawnType === 'DataLayer') {
          for (const drawId of drawnIds) {
            if (this.drawnObjects.dataLayers[drawId].drawnType === 'DataLayer') {
              delete this.drawnObjects.dataLayers[drawId]
            }
          }
          continue
        }
        delete this.drawnObjects.dataLayers[id]
      }
      this.mapview?.data.clear()
    }

    /** xác định việc vẽ thêm sẽ hơi khác vì mỗi layer sẽ vẽ nhiều page */
    // các page trong mainObjects
    const selectedPages = new Map<string, any>()
    for (const dataLayerId in this.objects.dataLayers) {
      for (const page in this.objects.dataLayers[dataLayerId].pages) {
        selectedPages.set(`${dataLayerId}:${page}`, { dataLayerId, page })
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
      for (const key of newPageKeys) {
        const { dataLayerId, page } = selectedPages.get(key)
        if (this.drawnObjects.dataLayers[dataLayerId] === undefined) {
          this.drawnObjects.dataLayers[dataLayerId] = {
            type: 'Polygon',
            drawnType: 'DataLayer',
            pages: {}
          }
        }
        console.log('vẽ thêm page: ', key)
        const geoJsonStr = this.objects.dataLayers[dataLayerId].pages[page] as GeoJsonStringType
        this.mapview?.data.addGeoJson(geoJsonStr)
        this.drawnObjects.dataLayers[dataLayerId].pages[page] = {}
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
  }
}

const drawMap = new DrawMap()

export default drawMap