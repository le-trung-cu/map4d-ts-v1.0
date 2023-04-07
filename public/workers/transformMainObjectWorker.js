onmessage = function (e) {
  // console.log('onmessage transformMainObjectWorker', e)
  // const {mainObjects, layerId, page} = e.data
  
  postMessage('ZYX')
}

onerror = function(e) {
  postMessage('error')
}