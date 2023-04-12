import { Map4d } from 'typeing-map4d'

class DrawMap {
  drawnObjects!: { dataLayers: Record<string, any> }
  objects!: { dataLayers: Record<string, any> }
  mapview: Map4d | null = null
  boundedDrawTimmer: ReturnType<typeof setTimeout> | null = null

  constructor() {
    this.drawnObjects = { dataLayers: {} }
    this.objects = { dataLayers: {} }
  }

  setMap(mapview: Map4d) {
    this.mapview = mapview
    this.draw()
  }

  createDataLayer(dataLayerId: string) {
    this.objects.dataLayers[dataLayerId] = {}
  }

  pushMainObjects(dataLayerId: string, page: number, objects: any) {
    this.objects.dataLayers[dataLayerId] = { ...this.objects.dataLayers[dataLayerId], [page]: objects }
    this.draw()
  }

  deleteMainObjects(dataLayerId: string) {
    delete this.objects.dataLayers[dataLayerId]
    this.draw()
  }

  draw() {
    if (this.boundedDrawTimmer !== null) {
      clearTimeout(this.boundedDrawTimmer)
      this.boundedDrawTimmer = null
    }
    this.boundedDrawTimmer = setTimeout(() => {
      this.boundedDrawTimmer = null
      this.#draw()
    }, 300)
  }

  #draw() {
    const selectedIds = Object.keys(this.objects.dataLayers)
    const drawnIds = Object.keys(this.drawnObjects.dataLayers)
    const unChecedSelectedIds = drawnIds.filter(id => !selectedIds.includes(id))

    if (unChecedSelectedIds.length > 0) {
      console.log('xóa các datalayer khỏi map, ', unChecedSelectedIds)
      for (const id of unChecedSelectedIds) {
        delete this.drawnObjects.dataLayers[id]
      }
    }

    /** xác định việc vẽ thêm sẽ hơi khác vì mỗi layer sẽ vẽ nhiều page */
    // các page trong mainObjects
    const selectedPages = new Map<string, any>()
    for (const dataLayerId in this.objects) {
      for (const page in this.objects.dataLayers[dataLayerId]) {
        selectedPages.set(`${dataLayerId}:${page}`, { dataLayerId, page })
      }
    }

    // các page đã vẽ
    const drawnPages = new Map()
    for (const dataLayerId in this.drawnObjects) {
      for (const page in this.drawnObjects.dataLayers[dataLayerId]) {
        drawnPages.set(`${dataLayerId}:${page}`, { dataLayerId, page })
      }
    }

    const newPageKeys = [...selectedPages.keys()].filter(key => !drawnPages.has(key))
    if (newPageKeys.length > 0) {
      for (const key of newPageKeys) {
        const { dataLayerId, page } = selectedPages.get(key)
        if (this.drawnObjects.dataLayers[dataLayerId] === undefined) {
          this.drawnObjects.dataLayers[dataLayerId] = {}
        }
        console.log('vẽ thêm page: ', key)
        this.drawnObjects.dataLayers[dataLayerId][page] = this.objects.dataLayers[dataLayerId][page]
      }
    }
  }
}

const drawMap = new DrawMap()

export default drawMap