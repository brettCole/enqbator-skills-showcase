import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route } from 'wouter'
import HomePage from './pages/HomePage'
import ObjectPage from './pages/ObjectPage'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Route path='/'>
      <HomePage />
    </Route>
    <Route path='/object/:objectID'>
      {params => <ObjectPage objectID={params.id} />}
    </Route>
  </React.StrictMode>,
)
