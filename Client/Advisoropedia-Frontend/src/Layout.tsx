

import React from 'react'
import { Header } from './Components/Header/Header'

import { Outlet } from 'react-router'

export const Layout= () => {
  return (
    <>
        <Header/>
        <Outlet/> 
    </>
  )
}