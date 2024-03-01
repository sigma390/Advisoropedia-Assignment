import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { Route, RouterProvider, createRoutesFromElements } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './Layout.tsx'
// import { About } from './Components/About/About.tsx'
import  Signup  from './Components/Signup/Signup.tsx'
import Login from './Components/Login/Login.tsx'
// import { Contact } from './Components/Contact/Contact.tsx'
// import { User } from './Components/User/User.tsx'
// import { Github, githubLoader } from './Components/Github/Github.tsx'


//================> 1ST WAY <=====================
// const router = createBrowserRouter([{
//   path:'/',
//   element:<Layout/>, //parent element
//   children:[{
//     path:'',
//     element:<Home/>

//   },{
//     path:'about',
//     element:<About/>

//   },{
//     path:'/contact',
//     element:<Contact/>
//   }]

// }])

//=======================>2nd WAY<=====================

const router = createBrowserRouter(
  
  createRoutesFromElements(
    //Route path '/' Roote Compoent Render Karaycha
    <Route path ='/' element={<Layout/>}> 
        {/* //children routes */}
        <Route path='' element={<Signup/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        {/* //Dynamic Routing */}
        
       


    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>,
)