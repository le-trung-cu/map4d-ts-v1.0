import type { Map4d, Polygon } from 'typeing-map4d'
import DrawPolygon from './drawPolygon'
import { IOptions } from './type'

export class DrawPolygonSingle {
  mapview!: Map4d
  options!: IOptions
  savedPolygon?:  Polygon
  drawPolygon!: DrawPolygon
  onStart?: () => void
  onCompleted?: (polygon: { type: 'Polygon', coordinates: any }) => void // sự kiện khi hoàn thành quá trình vẽ 1 polygon, ví dụ khi dbclick.
  onDrawing?: (polygon: Polygon) => void // sự kiện khi đang vẽ 1 polygon trên màng hình, ví dụ khi mouse move.
  onModified?: (polygon: Polygon) => void // sự kiện khi chỉnh sửa 1 polygon, ví dụ khi drag các đỉnh của polygon.


  constructor(options: IOptions) {
    this.options = { ...{ circle: false, modified: false }, ...options }
    this.drawPolygon = new DrawPolygon(this.options)
    this.drawPolygon.onStart = () => {
      this.clear()
      this.onStart?.()
    }
    this.drawPolygon.onCompleted = (polygon) => {
      this.savedPolygon = polygon
      this.onCompleted?.({
        type: 'Polygon',
        coordinates: [polygon.getPaths()[0].map(t => [t.lng, t.lat])],
      })
    }
  }

  setMap(mapview: Map4d) {
    this.drawPolygon.setMap(mapview)
  }

  subscribe() {
    this.drawPolygon.subscribe()
  }

  unsubscribe() {
    this.drawPolygon.unsubscribe()
  }

  clear() {
    this.savedPolygon?.setMap(null);
    (this.savedPolygon as any)?.circles.forEach((circle: any) => circle.setMap(null))
    this.savedPolygon = undefined
    this.drawPolygon.clear()
  }
}