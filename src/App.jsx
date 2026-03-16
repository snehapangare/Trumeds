import { useState } from 'react'

import './App.css'
import { Pagerouters } from './Routing/Pagerouters'
import { Provider } from 'react-redux'
import { store } from './Redux/Store'
import { BrowserRouter } from 'react-router-dom'

function App() {
  

  return (
    
      
     <Provider store={store}>
      <BrowserRouter basename='/'>

      <Pagerouters/>
      </BrowserRouter>
       
     </Provider>
    
  )
}

export default App
