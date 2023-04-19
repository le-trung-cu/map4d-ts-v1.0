import { Map4d, MapEvent, Marker, Polygon, Polyline, TileOverlay } from 'typeing-map4d'
import map4dx from '@/core/map4d'
import { db } from '@/database'
import mitt, { Emitter } from 'mitt'
import { delay } from '@/utils'
import { DrawTypes, GeometryTypes } from './types'
import Supercluster from 'supercluster'
import './style.css'


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
    drawType: DrawTypes,
    pages: {
      [page: string]: {
        markers?: Record<MainObjectId, Marker | Marker[]>,
        tileOverlay?: TileOverlay,
      }
    },
  }>,
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
    drawType: DrawTypes,
    pages: {
      [page: string]: GeoJsonStringType | boolean,
    },
  }>,
}

class DrawMap {
  refreshCluster!: boolean
  drawnObjects!: IDrawnObject
  objects!: IVitualDrawObject
  mapview: Map4d | null = null
  boundedDrawTimmer?: ReturnType<typeof setTimeout>
  boundedMarkerCluseterRefreshTimmer?: ReturnType<typeof setTimeout>
  mapSupercluster!: Map<DataLayerId, Supercluster>
  lockDraw!: boolean

  emmiter!: Emitter<{
    'drawn-data-layer': Record<string, number>,
  }>

  constructor() {
    this.mapview = null
    this.emmiter = mitt()
    this.refreshCluster = false
    this.mapSupercluster = new Map()
    this.lockDraw = false
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
    mapview.addListener(map4dx.MapEvent.click, (e: { marker: Marker }) => {
      const userData = e.marker.getUserData()
      if (userData?.cluster_id) {
        const supercluster = this.mapSupercluster.get(userData.dataLayerId)!
        const zoom = supercluster.getClusterExpansionZoom(userData.cluster_id)
        this.mapview?.moveCamera({ target: e.marker.getPosition(), zoom })
      }
    }, { marker: true })
    mapview.addListener(map4dx.MapEvent.boundsChanged, (e: any) => {
      if (this.boundedMarkerCluseterRefreshTimmer) {
        clearTimeout(this.boundedMarkerCluseterRefreshTimmer)
        this.boundedMarkerCluseterRefreshTimmer = undefined
      }
      this.boundedMarkerCluseterRefreshTimmer = setTimeout(() => {
        this.refreshCluster = true
        this.boundedMarkerCluseterRefreshTimmer = undefined
      }, 100)
    })
    //this.draw()
  }

  #deleteDrawnObjectDataLayer(dataLayerId: string) {
    if (this.drawnObjects.dataLayers[dataLayerId].drawType === 'DataLayer') {
      const drawnIds = Object.keys(this.drawnObjects.dataLayers)
      this.mapview?.data.clear()
      for (const drawId of drawnIds) {
        if (this.drawnObjects.dataLayers[drawId].drawType === 'DataLayer') {
          delete this.drawnObjects.dataLayers[drawId]
        }
      }
    } else if (this.drawnObjects.dataLayers[dataLayerId].drawType === 'Marker') {
      for (const page in this.drawnObjects.dataLayers[dataLayerId].pages) {
        const mainObjects = this.drawnObjects.dataLayers[dataLayerId].pages[page]
        for (const mainObjectId in mainObjects.markers) {
          const markers = mainObjects.markers[mainObjectId]
          if (!Array.isArray(markers)) {
            markers.setMap(null)
          } else {
            markers.forEach(t => t.setMap(null))
          }
        }
      }
    } else if (this.drawnObjects.dataLayers[dataLayerId].drawType === 'MarkerCluster') {
      if (this.drawnObjects.dataLayers[dataLayerId]?.pages[1])
        for (const key in this.drawnObjects.dataLayers[dataLayerId].pages[1].markers) {
          const markers = this.drawnObjects.dataLayers[dataLayerId].pages[1].markers![key]
          if (!Array.isArray(markers)) {
            markers.setMap(null)
          }
          else {
            markers.forEach(t => t.setMap(null))
          }
        }
    }
    delete this.drawnObjects.dataLayers[dataLayerId]
  }

  changeDrawType(dataLayerId: string, drawType: DrawTypes) {
    this.objects.dataLayers[dataLayerId].drawType = drawType
  }

  createDataLayer(dataLayerId: string, type: GeometryTypes, drawType: DrawTypes) {
    this.objects.dataLayers[dataLayerId] = {
      type,
      drawType,
      pages: {},
    }
  }

  pushMainObjects(dataLayerId: string, page: number, objects: { geoJson?: any, type: GeometryTypes, drawType: DrawTypes }) {
    if (this.objects.dataLayers[dataLayerId] !== undefined) {
      if (objects.type === 'Polygon' || objects.type === 'LineString')
        this.objects.dataLayers[dataLayerId].pages = { ...this.objects.dataLayers[dataLayerId].pages, [page]: JSON.stringify(objects.geoJson) }
      if (objects.drawType === 'Marker') {
        this.objects.dataLayers[dataLayerId].pages = {
          ...this.objects.dataLayers[dataLayerId].pages,
          [page]: true,
        }
      }
      if (objects.drawType === 'MarkerCluster') {
        this.objects.dataLayers[dataLayerId].pages = {
          ...this.objects.dataLayers[dataLayerId].pages,
          [page]: true,
        }
      }
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

  toggleDrawType() {
    this.objects.dataLayers['2'].drawType = this.objects.dataLayers['2'].drawType === 'Marker' ? 'MarkerCluster' : 'Marker'
  }

  draw() {
    this.#drawThrottle()
  }

  async #drawThrottle() {
    await Promise.all([delay(300), this.#draw()])
    requestAnimationFrame(this.#drawThrottle.bind(this))
  }

  async #draw() {
    let hasChange = false
    if (!this.mapview)
      return

    // xóa marker cluster
    if (this.refreshCluster) {
      for (const id in this.drawnObjects.dataLayers) {
        if (this.drawnObjects.dataLayers[id].drawType === 'MarkerCluster') {
          this.#deleteDrawnObjectDataLayer(id)
        }
      }
      this.refreshCluster = false
    }

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
        this.#deleteDrawnObjectDataLayer(id)
      }
    }

    // xóa các datalayer khỏi map, với các datalayer được thay đổi kiểu vẽ
    // ví dụ thay đổi kiểu vẽ từ Marker thành MarkerCluster
    for (const dataLayerId in this.drawnObjects.dataLayers) {
      if (this.drawnObjects.dataLayers[dataLayerId].drawType !== this.objects.dataLayers[dataLayerId].drawType) {
        this.#deleteDrawnObjectDataLayer(dataLayerId)
      }
    }

    /** xác định việc vẽ thêm sẽ hơi khác vì mỗi layer sẽ vẽ nhiều page */
    // các page trong mainObjects
    const selectedPages = new Map<string, { dataLayerId: string, page: string, type: GeometryTypes, drawType: DrawTypes }>()
    for (const dataLayerId in this.objects.dataLayers) {
      const { pages, type, drawType } = this.objects.dataLayers[dataLayerId]
      for (const page in pages) {
        selectedPages.set(`${dataLayerId}:${page}`, { dataLayerId, page, type, drawType })
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
        const { dataLayerId, page, type, drawType } = selectedPages.get(key)!
        if (this.drawnObjects.dataLayers[dataLayerId] === undefined) {
          this.drawnObjects.dataLayers[dataLayerId] = {
            type,
            drawType,
            pages: { [page]: { markers: {}, tileOverlay: undefined } }
          }
        }
        console.log('vẽ thêm page: ', key)
        if (drawType === 'Marker') {
          this.drawnObjects.dataLayers[dataLayerId].pages[page] = { markers: {} }
          await db.mainObjects.where({ dataLayerId, page: parseInt(page + '') }).each(mainObject => {
            const t = mainObject.timelines[0]
            const marker = new map4dx.Marker({
              position: (t.geometry.coordinates as unknown) as [number, number]
            })
            marker.setMap(this.mapview)
            this.drawnObjects.dataLayers[dataLayerId].pages[page].markers![mainObject.id] = marker
          })
        }
        if (drawType === 'MarkerCluster') {
          this.drawnObjects.dataLayers[dataLayerId].pages[page] = { markers: {} }
          if (page === '1') {
            if (!this.mapSupercluster.has(dataLayerId)) {
              const index = new Supercluster({
                radius: 80,
                maxZoom: 16,
                minZoom: 0,

                map: (props) => ({ sum: props.myValue }),
                reduce: (accumulated, props) => { accumulated.sum += props.sum },
              })
              this.mapSupercluster.set(dataLayerId, index)
              const points: any = await db
                .mainObjects
                .where({ dataLayerId })
                .toArray(result => {
                  return result.map(t => ({
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                      'type': 'Point',
                      'coordinates': t.timelines[0].geometry.coordinates,
                    }
                  }))
                })
              index.load(points)
              this.mapSupercluster.set(dataLayerId, index)
            }

            if (this.refreshCluster) {
              return
            }
            const index = this.mapSupercluster.get(dataLayerId)!
            const bounds = this.mapview.getBounds()
            const { lng: eastLng, lat: northLat } = bounds.getNortheast()
            const { lng: westLng, lat: southLat } = bounds.getSouthwest()
            const zoom = this.mapview?.getCamera().getZoom()
            const ps = index.getClusters([westLng, southLat, eastLng, northLat], zoom)
            ps.forEach((t, index) => {
              const marker = !t.properties.cluster
                ? new map4dx.Marker({
                  position: (t.geometry.coordinates as unknown) as [number, number],
                })
                : new map4dx.Marker({
                  position: (t.geometry.coordinates as unknown) as [number, number],
                  iconView: `<div class="draw-map__marker-cluster">${t.properties.point_count}</div>`
                })
              if (t.properties.cluster) {
                marker.setUserData({
                  cluster_id: t.properties.cluster_id,
                  dataLayerId,
                })
              }

              if (this.drawnObjects.dataLayers[dataLayerId] !== undefined) {
                marker.setMap(this.mapview)
                this.drawnObjects.dataLayers[dataLayerId].pages[1].markers![index] = marker
              }
              else {
                return
              }
            })
          }
        }
        if (drawType === 'DataLayer') {
          const geoJsonStr = this.objects.dataLayers[dataLayerId].pages[page] as GeoJsonStringType
          this.mapview?.data.addGeoJson(geoJsonStr)
          this.drawnObjects.dataLayers[dataLayerId].pages[page] = {}
        }
        if (drawType === 'TitleOverlay') {
          const overlay = new map4dx.TileOverlay({
            getUrl: function (x: number, y: number, zoom: number, is3dMode: boolean) {
              return `/api/data-layers/${dataLayerId}/tile/${zoom}/${x}/${y}.png`
            },
            visible: true,
            zIndex: 1,
          })
          overlay.setMap(this.mapview)
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

    // hasChange && this.trackingDrawDataLayerPage()
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