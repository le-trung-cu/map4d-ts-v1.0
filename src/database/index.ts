import Dexie, { Table } from 'dexie'

export interface IMainObject {
  id: string,
  name: string,
  timelines: Array<{
    startDate: Date | null,
    endDate: Date | null,
    geometry: {
      coordinates: [],
      properties: object,
    },
  }>,
}

export class DbContext extends Dexie {
  mainObjects!: Table<IMainObject>
  geometryProperties!: Table
  rbush!: Table
  

  constructor() {
    super('DbContext')
    this.version(2).stores({
      mainObjects: 'id, dataLayerId',
      geometryProperties: '[dataLayerId+id]',
      rbush: '[dataLayerId+page]'
    })
  }
}

export const db = new DbContext()