import Dexie, { Table } from 'dexie'

export interface IMainObject {
  id: string,
  name: string,
}

export class DbContext extends Dexie {
  mainObjects!: Table<IMainObject>
  geometryProperties!: Table
  rbush!: Table
  

  constructor() {
    super('DbContext')
    this.version(2).stores({
      mainObjects: 'id, [dataLayerId+page]',
      geometryProperties: 'id',
      rbush: '[dataLayerId+page]'
    })
  }
}

export const db = new DbContext()