import { GeometryTypes } from '@/core/types'
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
      mainObjects: 'id, dataLayerId',
      geometryProperties: '[dataLayerId+id]',
      rbush: '[dataLayerId+page]'
    })
  }
}

export const db = new DbContext()