import Dexie, { Table } from 'dexie'

export interface IMainObject {
  id: string,
  name: string,
}

export class DbContext extends Dexie {
  mainObjects!: Table<IMainObject>
  rbush!: Table
  

  constructor() {
    super('DbContext')
    this.version(2).stores({
      mainObjects: '[dataLayerId+id], [dataLayerId+page]',
      rbush: '[dataLayerId+page]'
    })
  }
}

export const db = new DbContext()