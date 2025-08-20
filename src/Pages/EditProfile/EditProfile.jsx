import axios from 'axios';
import React, { useContext, useReducer, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { UserContext } from '../../Context/userContext';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

function EditProfile() {
  let ImageInput=useRef();
  let [ulpoadedImge,setUploadedImage]=useState()
  let {handleSubmit}=useForm()
  let {getLogedUserData}=useContext(UserContext)
  let uploadImageMutation=useMutation({
     mutationFn:uploadImage,
     onSuccess:(response)=>{
        setUploadedImage('')
        if(response.data.message==='success'){
            toast.success("Image Uplooded..")
            getLogedUserData()
            return response
        }
     },
     onError:(err)=>{
        toast.error(err.response?.data?.message||"Upload Faild")
     }
  })

 async function uploadImage(){
    let formData=new FormData()
    console.log(ImageInput)
    formData.append("photo",ImageInput.current.files[0])
    let response=await axios.put('https://linked-posts.routemisr.com/users/upload-photo',formData,{
        headers:{
            token:localStorage.getItem('userToken')
        }
    })
    return response

  }
  const onSubmit=(data)=>{
    console.log(data)
  
    console.log(uploadImage)
   uploadImageMutation.mutate(data)
  }
    return (
        <>
       <div>
        
            <div className='flex  flex-wrap w-3/4 mx-auto justify-center  rounded-3xl h-[500px] mt-10 items-center gap-10'>
            <form onSubmit={handleSubmit(onSubmit)} className=' w-full justify-center items-center flex flex-col'>
                            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input ref={ImageInput} onChange={(e)=>{
                                    if(e.target.files&&e.target.files[0]){
                                         setUploadedImage(e.target.files[0])
                                    }
                                }} id="dropzone-file" type="file" class="hidden" />
                            </label>
              
                <button type='submit' className='p-3  cursor-pointer px-8 mt-5 btn rounded-3xl'>Upload Image</button>
                </form>
                   {
                    ulpoadedImge?
                <div>
                    <img src={URL.createObjectURL(ulpoadedImge)}/> 
                </div>:''
               }
              </div>
              
        </div>
        </>
    )
}

export default EditProfile
