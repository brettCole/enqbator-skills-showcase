import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route } from 'wouter'
import HomePage from './pages/HomePage'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Route path='/'>
      <HomePage />
    </Route>
  </React.StrictMode>,
)
