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
    mainObject.page = page
    mainObject.dataLayerId = dataLayerId
  }

  await db.mainObjects.bulkAdd(mainObjects)
  postMessage('ZYX')
}

onerror = function (e) {
  postMessage('error')
}
