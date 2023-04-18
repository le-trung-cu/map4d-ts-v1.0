import { db } from '@/database'
import * as turf from '@turf/turf'
import RBush from 'rbush'
import KDBush from 'kdbush'
import Quadtree from 'quadtree-lib'

import type { Polygon } from 'typeing-map4d'
import { GeometryTypes } from './types'


class IndexedMainObject {
  mapDataLayerIndexed!: Map<string, RBush<any> | KDBush<any>>

  constructor() {
    this.mapDataLayerIndexed = new Map()
  }

  async createIndexDataLayer(dataLayerId: string, type: GeometryTypes) {
    if (this.mapDataLayerIndexed.has(dataLayerId))
      return
    if (type === 'Polygon' || type === 'LineString') {
      await this.#createIndexDataLayerHasTypePolygon(dataLayerId)
      return
    }
    if (type === 'Point') {
      await this.#createIndexDataLayerHasTypePoint(dataLayerId)
    }
  }

  async #createIndexDataLayerHasTypePolygon(dataLayerId: string) {
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

  async #createIndexDataLayerHasTypePoint(dataLayerId: string) {
    // const points = await db.mainObjects
    //   .where({dataLayerId})
    //   .toArray(result => {
    //     return result.map(t => t.timelines[0].geometry.coordinates)
    //   })
    // const indexed = new KDBush(points)

    // this.mapDataLayerIndexed.set(dataLayerId, indexed)

    const quadtree = new Quadtree({
      x: 8.324644583492258 * Math.pow(10, 15),
      y: 103.74667429240236 * Math.pow(10, 15),
      width: Math.ceil((23.573789600179467 - 8.324644583492258) * Math.pow(10, 15)),
      height: Math.ceil((108.29012543632348 - 103.74667429240236) * Math.pow(10, 15)),
    })

    const points = await db.mainObjects
      .where({ dataLayerId })
      .toArray(result => {
        return result.map(t => ({
          x: t.timelines[0].geometry.coordinates[1] * Math.pow(10, 15),
          y: t.timelines[0].geometry.coordinates[0] * Math.pow(10, 15),
          toString: function() {
            return `[${t.timelines[0].geometry.coordinates.join(',')}]`
          }
        }))
      })

    quadtree.pushAll(points)
    console.log(quadtree);
    (window as any).trc_quadtree = quadtree
  }

  async search(dataLayerId: string, type: 'Point' | 'Polygon' | 'LineString', polygon: Polygon) {
    await this.createIndexDataLayer(dataLayerId, type)
    const tree = this.mapDataLayerIndexed.get(dataLayerId)
    const [minX, minY, maxX, maxY] = turf.bbox(polygon)
    if (tree instanceof RBush) {
      const result = tree?.search({ minX, minY, maxX, maxY })
      console.log('search DBush', result)
    }

    if (tree instanceof KDBush) {
      const result = tree.range(minX, minY, maxX, maxY)
      console.log('search KDBush ', result)
    }
  }
}

const indexedMainObject = new IndexedMainObject()

export default indexedMainObject