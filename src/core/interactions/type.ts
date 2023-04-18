import type { Polygon, MapsEventListener, Polyline, Marker } from 'typeing-map4d'

export interface IOptions {
  modified: boolean,
  circle: boolean,
}

export interface IDrawContext {
  points: [number, number][],
  circles: Marker[],
  polygon?: Polygon,
  polylineTemp?: Polyline,
  isDraggingCircle: false,
  eventClick?: MapsEventListener,
  eventMouseMove?: MapsEventListener,
  eventDblClick?: MapsEventListener,
  eventDragStartPoint?: MapsEventListener,
  eventDragPoint?: MapsEventListener,
  eventDragEndPoint?: MapsEventListener,
  indexDragPoint?: number,
  flagBeginDraw: boolean, // một cờ để xác định hành vi event dbclick trên màng hình cảm ứng
  isDrawing: boolean,
} 