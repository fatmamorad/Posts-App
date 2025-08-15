import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import {useForm} from 'react-hook-form'
import login from '../../assets/Group 1.png'
import * as zod from 'zod'
import toast from 'react-hot-toast'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/userContext'
let schame=zod.object({
    email:zod.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Invalid Email...."),
    password:zod.string().nonempty("password Is Require...").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"Minimum length: Usually 8 characters or more.At least one uppercase letter.At least one lowercase letter.At least one digit.At least one special character"),

})
function Register() {
    let {getLogedUserData}= useContext(UserContext)
   let [loading ,setLoading]=useState(true)
   let Navigate=useNavigate();
   let {register,handleSubmit,formState:{errors}}=useForm({
    resolver:zodResolver(schame)
   })
   console.log(errors)
   async function handelLogin(userData){
     setLoading(false)
     console.log(userData)
     console.log(errors)
     let response= await axios.post('https://linked-posts.routemisr.com/users/signin',userData).catch((err)=>{console.log(err)})
    console.log(response)
     console.log(loading)
    if(response&&response.data.message== "success"){
         localStorage.setItem('userToken',response.data.token)
         toast.success("User Login Successfully")}
         getLogedUserData()
       Navigate('/')
       
      setLoading(true)
   }
   return (
        <> 
        <div className='flex flex-wrap flex-col justify-center items-center'>
    
            <div className='flex justify-centeritems-center h-screen  '> 
                <form onSubmit={handleSubmit(handelLogin)} className=" w-96 mx-auto flex justify-center items-center flex-col">
                <div className="relative z-0 w-full mb-5 group">
                    <input  type="text" {...register("email")} name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                     {errors.email&&<p className='text-red-500 mt-3 text-xs ms-2'> <i class="fa-solid text-red-600 fa-triangle-exclamation me-2"></i>{errors.email.message}</p>  }
                     
                </div>
                
               
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" {...register("password")} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    {errors.password&&<p className='text-red-500 mt-3 text-xs ms-2'> <i class="fa-solid text-red-600 fa-triangle-exclamation me-2"></i>{errors.password.message}</p>  }
                    </div>
               
                
                  <p className='mb-3'>Dont Have an Account ? <Link to='/Login' className='text-blue-600' >Register...</Link></p>
               
                
                {loading?<button type="submit" className="text-white btn hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>:
                <button type="submit" className="text-white btn hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-not-allowed"><i class="fa-solid fa-spinner fa-spin"></i></button>}
                </form>
                
           </div>
           
        </div>
        
         
        </>
    )
}

export default Register