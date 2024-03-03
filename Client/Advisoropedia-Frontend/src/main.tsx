import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { Route, RouterProvider, createRoutesFromElements } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './Layout.tsx'

import  Signup  from './Components/Signup/Signup.tsx'
import Login from './Components/Login/Login.tsx'

import { Auth0Provider } from '@auth0/auth0-react'
import Posts from './Components/Posts/Posts.tsx'

//=======================>2nd WAY<=====================

const router = createBrowserRouter(
  
  createRoutesFromElements(
    //Route path '/' Roote Compoent Render Karaycha
    <Route path ='/' element={<Layout/>}> 
        {/* //children routes */}
        <Route path='' element={<Signup/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/posts' element={<Posts/>}/>
        {/* //Dynamic Routing */}
        
       


    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(

  <Auth0Provider
    domain="dev-vlhszc1hokefz48k.us.auth0.com"
    clientId="dCedBqWn6U7GcBC6TEQ7RZGjqnr11GRI"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    
   <RouterProvider router={router}/>
 
  </Auth0Provider>




  
)