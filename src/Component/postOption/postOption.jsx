import axios from 'axios';
import { initFlowbite } from 'flowbite';
import React, { useContext, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast/headless';
import { UserContext } from '../../Context/userContext';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function PostOption({postId}) {

  const queryClient = useQueryClient();
    let [preview, setPreview] = useState(null)   
    console.log(postId)
    //--------- To Handle Js Flowbite Code--------------
    useEffect(() => {
        initFlowbite();
    },[])

    let {user}= useContext(UserContext)
    let imageInputup =useRef()
    let {register , handleSubmit}=useForm();
    function handleImageChange() {
    const file = imageInputup.current.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }
  let PostOptionMutation=useMutation({
    mutationFn:handleUpdatedPost,
    onSuccess:(response)=>{
        console.log(response)
    if(response.data.message==="success"){
        toast.success('Post Updated')
        queryClient.invalidateQueries(['Posts'])
     }
    }
  })

    let PostOptionMutationForDelete=useMutation({
    mutationFn:handleDeletePost,
    onSuccess:(response)=>{
        console.log(response)
    if(response.data.message==="success"){
        toast.success('Post Deleted')
        queryClient.invalidateQueries(['Posts'])
     }
    }
  })
   async function handleUpdatedPost(post){
    let Post =new FormData()
    Post.append('body',post.body)
    Post.append('image',imageInputup.current.files[0])
    let response=await axios.put(`https://linked-posts.routemisr.com/posts/${postId}`,Post,
    {headers:{
       token:localStorage.getItem('userToken')
    }})
    return response

   }
   async function handleDeletePost(){
    let response=await axios.delete(`https://linked-posts.routemisr.com/posts/${postId}`,{
        headers:{
            token:localStorage.getItem('userToken')
        }
    })
      return response
    }
    return (
        <>


<div id="default-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-2xl max-h-full">
   
        <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
         
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Update Post
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
        
            <div class=" md:p-5 space-y-4">
                  <form onSubmit={handleSubmit((post)=>{PostOptionMutation.mutate(post)})} className='mb-5 '>
      
         
        
         <div className=' my-5 flex justify-between items-center'>
            <div className='w-15'>
            <img class="w-10 h-10 rounded-full inline-block" alt=""/> 
            </div>
         
                
             <div className='w-full'>
            <input { ...register('body')} type="text" id="postBody" class=" p-2 mx-auto w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg " placeholder="Post Body"  />
        </div>

        <div className='w-15 ms-2'>
            <label htmlFor='file_input1'><i class="fa-regular fa-image fa-2x cursor-pointer text-blue-500"></i></label>
            <input ref={imageInputup}   onChange={handleImageChange} class=" w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 hidden " id="file_input1" type="file"/>
        </div>
         
         </div>
          {/* ✅ عرض الـ Preview */}
                    {preview && (
                      <div className="mb-3">
                        <img src={preview} alt="preview" className="w-32 h-32 object-cover rounded-lg  mx-auto" />
                      </div>
                    )}
          <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button data-modal-hide="default-modal" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                <button data-modal-hide="default-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancle</button>
            </div>
        </form>
        
            </div>
        
          
        </div>
    </div>
</div>



    <button id="dropdownMenuIconHorizontalButton" data-dropdown-toggle={"dropdownDotsHorizontal"+postId} class="inline-flex text-xs md:text-sm items-center p-2  font-medium text-center text-gray-900  rounded-lg  focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button"> 
    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
    </svg>
    </button>


    <div id={"dropdownDotsHorizontal"+postId} class="z-10 hidden bg-white  divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
        <li onClick={()=>{PostOptionMutationForDelete.mutate()}}>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete Post</a>
        </li>
        
        <li>
            <a data-modal-target="default-modal" data-modal-toggle="default-modal" href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Update Post</a>
        </li>
        </ul>
       
    </div>

        </>
    )
}

export default PostOption
