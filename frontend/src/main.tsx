import React from 'react'
import ReactDOM from 'react-dom/client'
import RouteList from './routes'
import { ToastContainer } from 'react-toastify'
import { persistedStore, store } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

// Main style
import "./styles/style.css"
// Toastify
import 'react-toastify/dist/ReactToastify.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <RouteList />
      </PersistGate>
    </Provider>

    <ToastContainer position="top-center" theme="colored" />
  </React.StrictMode>,
)
