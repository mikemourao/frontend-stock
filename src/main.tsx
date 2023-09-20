import React from 'react'
import ReactDOM from 'react-dom/client'
import './theme/global.css'
import { RouterProvider } from 'react-router-dom'
import AppRoutes from '../src/routes';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={AppRoutes} />
  </React.StrictMode>,
)
