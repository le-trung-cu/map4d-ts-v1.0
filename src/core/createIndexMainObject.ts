import { db } from '@/database'
import * as turf from '@turf/turf'
import RBush from 'rbush'
import type { Polygon } from 'typeing-map4d'

class IndexedMainObject {
  mapDataLayerIndexed!: Map<string, RBush<any>>

  constructor() {
    this.mapDataLayerIndexed = new Map()
  }

  async createIndexDataLayer(dataLayerId: string) {
    if (this.mapDataLayerIndexed.has(dataLayerId))
      return

    const tree = new RBush(4)
    const bboxDataLayer = await db.mainObjects
      .where({ dataLayerId })
      .toArray(result => {
        return result.map(t => {
          const [minX, minY, maxX, maxY] = turf.bbox(t.timelines[0].geometry)
          return { minX, minY, maxX, maxY, id: t.id }
        })
      })

    const indexed = tree.load(bboxDataLayer)

    this.mapDataLayerIndexed.set(dataLayerId, indexed)
  }

  async search(dataLayerId: string, polygon: Polygon) {
    await this.createIndexDataLayer(dataLayerId)
    const tree = this.mapDataLayerIndexed.get(dataLayerId)
    const [minX, minY, maxX, maxY] = turf.bbox(polygon)
    const result = tree?.search({ minX, minY, maxX, maxY })
    console.log(result)
  }
}

const indexedMainObject = new IndexedMainObject()

export default indexedMainObject