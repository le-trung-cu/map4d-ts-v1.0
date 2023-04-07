import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store'
if (import.meta.env.DEV) {
  import('./mocks/browser').then(({worker}) => worker.start({
    onUnhandledRequest: 'bypass',
  }))
}


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  ,
)
