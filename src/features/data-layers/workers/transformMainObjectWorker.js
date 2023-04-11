import Dexie from 'dexie'
import { db } from '../../../database'
import RBush from 'rbush'
import * as turf from '@turf/turf'

onmessage = async function (e) {
  const tree = new RBush(2)

  // console.log('onmessage transformMainObjectWorker', e)

  const { mainObjects, dataLayerId, page } = e.data

  await db.mainObjects
    .where({dataLayerId, page})
    .delete()

  for (const mainObject of mainObjects) {
    mainObject.bbox = turf.bbox(mainObject.geometry)
    mainObject.page = page
    mainObject.dataLayerId = dataLayerId
  }

  const treeItems = mainObjects.map(mainObject => ({
    minX: mainObject.bbox[0],
    minY: mainObject.bbox[1],
    maxX: mainObject.bbox[2],
    maxY: mainObject.bbox[3],
    value: {
      mainObjectId: mainObject.id,
    }
  }))

  const treeData = tree.load(treeItems)
  const x = mainObjects[0].bbox
  const collides = tree.collides({minX: x[0], minY: x[1], maxX: x[2], maxY: x[3]})
  console.log('collides ', collides);

  await db.rbush.add({dataLayerId, page, treeData})

  await db.mainObjects.bulkAdd(mainObjects)
  postMessage('ZYX')
}

onerror = function (e) {
  postMessage('error')
}
