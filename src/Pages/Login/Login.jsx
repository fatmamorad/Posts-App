import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import {useForm} from 'react-hook-form'
import login from '../../assets/Group 1.png'
import * as zod from 'zod'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { is } from 'zod/v4/locales'
let schema=zod.object({
    name:zod.string().nonempty("Name Is Required").min(3,"Minminm Chararcter is 3 ...."),
    email:zod.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Invalid Email...."),
    password:zod.string().nonempty("password Is Require...").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"Minimum length: Usually 8 characters or more.At least one uppercase letter.At least one lowercase letter.At least one digit.At least one special character"),
    rePassword:zod.string().nonempty("password Is Require..."),
    gender:zod.string().regex(/^(female|male)$/,"Gender is Required"),
    dateOfBirth:zod.coerce.date().refine((val)=>{
       let newdata=new Date().getFullYear()
       let userDate=val.getFullYear()
       return (newdata-userDate)>=20
    },"too Young")
}).refine((data)=>{
     return data.password==data.rePassword
},{
    path:["rePassword"],
    message:"Password ans confirm password not match"
})
function Login() {
   let Navigate=useNavigate();
   let {register,handleSubmit,formState:{errors}}=useForm({
    resolver:zodResolver(schema)
   })
  let {mutate,isPending}=useMutation({
    mutationFn:handleregister,
    onSuccess:(response)=>{
        
          if(response&&response.data.message== "success"){
         toast.success("User Login Successfully")
         Navigate('/Register')
        }
    },
    onError:(err)=>{
        console.log(err.response.data.error)
  toast.error(err?.response?.data?.error || "Something went wrong")
}
    
  })
   async function handleregister(userData){
     let response= await axios.post('https://linked-posts.routemisr.com/users/signup',userData)
     console.log(response)
     return response;
   }
 
   return (
        <> 
        <div className='flex flex-wrap justify-center items-center dark:text-white '>
            <div className='hidden   lg:flex justify-center items-center mt-4'>
            <img src={login} alt="login" className=' w-[70%] object-contain'/>
          </div>
            <div className='flex justify-centeritems-center h-screen  '> 
                <form onSubmit={handleSubmit((data)=>mutate(data))} className="md:w-96 sm:w-1/2 mx-auto flex justify-center items-center flex-col">
                <div className="relative z-0 w-full mb-2 group">
                    <input  type="text" {...register("email")} name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                     {errors.email&&<p className='text-red-500 mt-3 text-xs ms-2 dark:text-red-300'> <i class="fa-solid text-red-600 dark:text-red-300 fa-triangle-exclamation me-2"></i>{errors.email.message}</p>  }
                     
                </div>
                
               
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" {...register("password")} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    {errors.password&&<p className='text-red-500 mt-3 text-xs ms-2 dark:text-red-300'> <i class="fa-solid dark:text-red-300 text-red-600 fa-triangle-exclamation me-2"></i>{errors.password.message}</p>  }
                    </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" {...register("rePassword")}  name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                     {errors.rePassword&&<p className='text-red-500 mt-3 text-xs ms-2 dark:text-red-300'> <i class="fa-solid dark:text-red-300 text-red-600 fa-triangle-exclamation me-2"></i>{errors.rePassword.message}</p>  }
                    </div>
               
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" {...register("name")}  name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                    {errors.name&&<p className='text-red-500 mt-3 text-xs ms-2 dark:text-red-300'> <i class="fa-solid dark:text-red-300 text-red-600 fa-triangle-exclamation me-2"></i>{errors.name.message}</p>  }
                        </div>
              
                 <div className="relative z-0 w-full mb-5 group mt-4">
                    <input  type="date" {...register("dateOfBirth")} name="dateOfBirth" id="dateOfBirth" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                     {errors.dateOfBirth&&<p className='text-red-500 mt-3 text-xs ms-2 dark:text-red-300'> <i class="fa-solid dark:text-red-300 text-red-600 fa-triangle-exclamation me-2"></i>{errors.dateOfBirth.message}</p>  }
                   
               </div>
                
                <div className="relative z-0 w-full mb-5 group mt-2">
                <select  {...register("gender")} id="gender" className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Choose your gender..</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                   
                </select>
                {errors.gender&&<p className='text-red-500 mt-3 text-xs ms-2 dark:text-red-300'> <i class="fa-solid text-red-600 dark:text-red-300 fa-triangle-exclamation me-2"></i>{errors.gender.message}</p>  }
                     </div>
                {!isPending?<button type="submit" className="text-white btn hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>:
                <button type="submit" className="text-white btn hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-not-allowed"><i class="fa-solid fa-spinner fa-spin"></i></button>}
                </form>
           </div>
        </div>
        
         
        </>
    )
}

export default Login
