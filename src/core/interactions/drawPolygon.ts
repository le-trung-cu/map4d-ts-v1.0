import type { Map4d, Polygon, MapsEventListener, ILatLng, Polyline, Marker, Circle } from 'typeing-map4d'
import map4dx from '../map4d'
import { IDrawContext, IOptions } from './type'



export default class DrawPolygon {
  mapview!: Map4d
  options!: IOptions
  onStart?: () => void
  onCompleted?: (polygon: Polygon) => void // sự kiện khi hoàn thành quá trình vẽ 1 polygon, ví dụ khi dbclick.
  onDrawing?: (polygon: Polygon) => void // sự kiện khi đang vẽ 1 polygon trên màng hình, ví dụ khi mouse move.
  onModified?: (polygon: Polygon) => void // sự kiện khi chỉnh sửa 1 polygon, ví dụ khi drag các đỉnh của polygon.
  drawContext!: IDrawContext
  savedObjects!: any[]

  constructor(options: IOptions = {
    modified: false,
    circle: false,
  }) {
    this.options = { ...{ modified: false, circle: false }, ...options }
    this.drawContext = {
      points: [],
      circles: [],
      isDraggingCircle: false,
      flagBeginDraw: false,
      isDrawing: false,
    }
    this.savedObjects = []
  }

  setMap(mapview: Map4d) {
    this.mapview = mapview
  }

  subscribe() {
    if (this.mapview !== null) {
      this.subscribeForDrawPolygon()
      this.options.modified && this.subscribeForModifyPolygon()
    } else {
      throw new Error('mapview is null')
    }
  }

  subscribeForDrawPolygon() {
    const map = this.mapview
    this.drawContext.eventClick = map.addListener('click', (e: any) => {

      const lastPoint = this.drawContext.points[this.drawContext.points.length - 1] // [lng, lat]
      if (lastPoint && lastPoint[0] === e.location.lng && lastPoint[1] === e.location.lat) {
        return
      }
      if (this.drawContext.points.length === 0 && !this.drawContext.flagBeginDraw) {
        this.drawContext.circles.forEach(t => t.setDraggable(false))
        this.onStart?.()
      }
      this.drawPolylineByMouseMove(e)
      this.drawContext.points.push([e.location.lng, e.location.lat])

      if (this.options.modified || this.options.circle) {
        const circle = this.createPoint(e.location)
        this.drawContext.circles.push(circle)
        circle.setMap(map)
      }


      const numPoint = this.drawContext.points.length
      if (numPoint > 2) {
        const polygon = this.drawPolygon(this.drawContext.points)
        this.onDrawing?.(polygon)
      }

      this.drawContext.eventMouseMove ??= map.addListener('mouseMove', (e: any) => {
        this.drawPolylineByMouseMove(e)

        const points = this.drawContext.points
        if (points.length > 1) {
          const mousePoint = [e.location.lng, e.location.lat] as [number, number]
          const _points = [...points, mousePoint]
          const polygon = this.drawPolygon(_points)
          this.onDrawing?.(polygon)
        }
      })
    }, { polyline: true, polygon: true, marker: true, location: true })

    this.drawContext.eventDblClick ??= map.addListener('dblClick', (e: any) => {
      this.drawContext.eventMouseMove?.remove()
      this.drawContext.eventMouseMove = undefined
      // click + click = dblClick so we need to remove end element of array
      // this.drawContext.points.pop()
      // this.drawContext.circles.pop()?.setMap(null)

      // nếu vẽ trên màng hình cảm ứng
      if (e.xa instanceof Touch) {
        setTimeout(() => {
          this.drawContext.points.pop()
          this.drawContext.circles.pop()?.setMap(null)
          this.resetDataForDrawing()
          this.drawContext.flagBeginDraw = false
        }, 200)
      }

      if (this.drawContext.points.length < 3) {
        this.drawContext.polylineTemp?.setMap(null)
        this.drawContext.polygon?.setMap(null)
        while (this.drawContext.points.length > 0) {
          this.drawContext.points.pop()
          this.drawContext.circles.pop()?.setMap(null)
        }
        return
      }
      this.drawPolygon(this.drawContext.points)

      const saved = {
        polygon: this.drawContext.polygon!,
      };
      (saved.polygon as any).circles = this.drawContext.circles
      this.drawContext.circles.forEach((p: any) => p.polygon = saved.polygon)
      this.savedObjects.push(saved)
      this.drawContext.isDrawing = false
      this.onCompleted?.(saved.polygon)
      this.drawContext.circles.forEach(t => t.setDraggable(this.options.modified))
      this.resetDataForDrawing()

      if (e.xa instanceof Touch) {
        this.drawContext.flagBeginDraw = true
      }
    }, { polyline: true, polygon: true, marker: true, location: true })
  }

  // đăng ký các sự kiện cho chỉnh sửa polygon
  subscribeForModifyPolygon() {
    const map = this.mapview

    // xác định point đang được drag
    this.drawContext.eventDragStartPoint ??= map.addListener('dragStart', (e: any) => {
      const { marker } = e
      if (marker.polygon) {
        const polygon = marker.polygon
        this.drawContext.indexDragPoint = polygon.circles.findIndex((circle: any) => circle === marker)
      }
    }, { marker: true })

    // vẽ lại polygon trong quá trình drag point
    this.drawContext.eventDragPoint ??= map.addListener('drag', (e: any) => {
      const { marker, location } = e
      if (marker && marker.polygon) {
        const polygon = marker.polygon
        const paths = polygon.getPaths()
        const index = this.drawContext.indexDragPoint!
        paths[0][index] = location
        if (index === 0) {
          paths[0][paths[0].length - 1] = location
        }
        polygon.setPaths(paths)
        this.onModified?.(polygon)
      }
    }, { marker: true })

    // kết thúc quá trình drag point
    this.drawContext.eventDragEndPoint ??= map.addListener('dragEnd', (e: any) => {
      this.drawContext.indexDragPoint = undefined
    }, { marker: true })
  }

  // xóa tất cả các sự kiện đã đăng ký
  unsubscribe() {
    this.drawContext.eventClick?.remove()
    this.drawContext.eventMouseMove?.remove()
    this.drawContext.eventDblClick?.remove()
    this.drawContext.eventDragStartPoint?.remove()
    this.drawContext.eventDragPoint?.remove()
    this.drawContext.eventDragEndPoint?.remove()

    this.drawContext.eventClick = undefined
    this.drawContext.eventMouseMove = undefined
    this.drawContext.eventDblClick = undefined
    this.drawContext.eventDragStartPoint = undefined
    this.drawContext.eventDragPoint = undefined
    this.drawContext.eventDragEndPoint = undefined
  }

  resetDataForDrawing() {
    this.drawContext.polylineTemp?.setMap(null)
    this.drawContext.points = []
    this.drawContext.circles = []
    this.drawContext.polygon = undefined
    this.drawContext.polylineTemp = undefined
  }

  // xóa các đối tượng đã vẽ
  clear() {
    this.drawContext.polylineTemp?.setMap(null)
    this.drawContext.polygon?.setMap(null)
    this.drawContext.polylineTemp?.setMap(null)
    this.drawContext.circles.forEach(t => t.setMap(null))

    this.drawContext.polygon = undefined
    this.drawContext.polylineTemp = undefined
    this.drawContext.circles = []
    this.drawContext.points = []

    this.savedObjects?.forEach(({ polygon }) => {
      polygon.circles?.forEach((t: Marker) => t.setMap(null))
      polygon.setMap(null)
      polygon.circles = null
    })
    this.savedObjects = []
  }

  // tạo điểm
  createPoint(position: ILatLng) {
    const markerDraw = new map4dx.Marker({
      position,
      icon: new map4dx.Icon(8, 8, '/EllipseBlue.svg'),
      anchor: [0.5, 0.5],
      draggable: false,
      zIndex: this.getZIndexOfPolygon() + 1,
    })
    markerDraw.setMap(this.mapview)
    return markerDraw
  }

  // tạo ra đường polyline khi di chuyển chuột, khi paths của polygon chỉ chứa 1 point
  drawPolylineByMouseMove(mouseMoveEvent: any) {
    // draw polyline
    if (this.drawContext.points.length === 1) {
      this.drawContext.polylineTemp?.setMap(null)
      const polylineTempCoppy = new map4dx.Polyline({
        path: [...this.drawContext.points, mouseMoveEvent.location],
        visible: true,
        strokeColor: '#00559A',
        strokeWidth: 2.0,
        strokeOpacity: 0.5,
        closed: false,
        zIndex: this.getZIndexOfPolygon(),
      })
      //thêm polyline vào map
      polylineTempCoppy.setMap(this.mapview)
      this.drawContext.polylineTemp = polylineTempCoppy
    }

    if (this.drawContext.polylineTemp && this.drawContext.points.length > 1) {
      this.drawContext.polylineTemp?.setMap(null)
      this.drawContext.polylineTemp = undefined
    }
  }

  getZIndexOfPolygon() {
    return this.savedObjects.length + 1
  }

  //vẽ polygon
  drawPolygon(points: IDrawContext['points']) {

    this.drawContext.polygon?.setMap(null)

    const polygon = new map4dx.Polygon({
      paths: [[...points, points[0]]],
      fillOpacity: 0.5,
      fillColor: '#F9F4E4',
      strokeWidth: 2.0,
      strokeColor: '#00559A',
      zIndex: this.getZIndexOfPolygon(),
    })
    polygon.setMap(this.mapview)
    this.drawContext.polygon = polygon

    return polygon
  }
}