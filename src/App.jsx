import React, { Children, useContext, useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Component/Layout/Layout'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import Home from './Pages/Home/Home.jsx'
import { Toaster } from 'react-hot-toast'
import PostDetails from './Pages/PostDetails/PostDetails.jsx'
import { initFlowbite } from 'flowbite'
import {UserContext, UserContextProvider } from './Context/userContext.jsx'
import Profile from './Pages/Profile/Profile.jsx'
import { ProtectRouting } from './ProtectRounting/ProtectRouting.jsx'
import EditProfile from './Pages/EditProfile/EditProfile.jsx'
import {useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

function App() {
useEffect(() => {
    initFlowbite();
},[])
 let routes= createBrowserRouter([
    {path:'',element:<Layout/>,children:[
      {index:true,element:<ProtectRouting><Home/></ProtectRouting>},
      {path:'Register',element:<Register/>},
      {path:'Login',element:<Login/>},
      {path:'Profile',element:<ProtectRouting><Profile/></ProtectRouting>},
      {path:'editProfile',element:<ProtectRouting><EditProfile/></ProtectRouting>},
      {path:'PostDetails/:id',element:<ProtectRouting><PostDetails/></ProtectRouting>}
    ]
    }

  ])

  return (

    <>
      <QueryClientProvider client={queryClient}>
     <UserContextProvider>
        <RouterProvider router={routes}/>
        <Toaster/>

        </UserContextProvider>
         <ReactQueryDevtools />
        </QueryClientProvider>
    

    </>
  )
}

export default App
