import { DrawTypes, GeometryTypes } from '@/core/types'
import Dexie, { Table } from 'dexie'

export interface IMainObject {
  id: string,
  name: string,
  timelines: Array<{
    startDate: Date | null,
    endDate: Date | null,
    geometry: {
      coordinates: Array<any>,
      properties: object,
    },
  }>,
}

export interface IDataLayer {
  id: string,
  parentId: string | null,
  name: string,
  type: GeometryTypes,
  drawType: DrawTypes,
}

export class DbContext extends Dexie {
  dataLayers!: Table<IDataLayer>
  mainObjects!: Table<IMainObject>
  geometryProperties!: Table
  rbush!: Table


  constructor() {
    super('DbContext')
    this.version(2).stores({
      dataLayers: 'id',
      mainObjects: 'id, dataLayerId, [dataLayerId+page]',
      geometryProperties: '[dataLayerId+id]',
      rbush: '[dataLayerId+page]'
    })
  }
}

const _db = new DbContext()
await _db.mainObjects.clear()

export const db = _db
