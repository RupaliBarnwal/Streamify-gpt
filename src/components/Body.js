import React from 'react'
import Signin from './Signin'
import Browse from './Browse'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const Body = () => {
    const appRouter= createBrowserRouter([
        
        {
            path:"/browse",
            element:<Browse/>
        },
        {
            path:"/",
            element:<Signin/>
        }
    ])
  return (
    <div>
      <RouterProvider router={appRouter}>
         
      </RouterProvider>
    </div>
  )
}

export default Body
