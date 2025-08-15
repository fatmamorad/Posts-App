import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import User from '../../assets/download (1).png'

function PostDetails() {
    let [post,setPost]=useState(null)
   let {id}= useParams()
   console.log(id)
   async function getPostDetails() {
      let response=await axios.get(`https://linked-posts.routemisr.com/posts/${id}`,{
        headers:{
            token:localStorage.getItem('userToken')
        }
      })
      if(response&&response.data.message=="success")
      {
        setPost(response.data.post)
      }
      console.log(1220," ",post)
      console.log(response)
   }
   useEffect(()=>{
      getPostDetails()
   },[])

    return (
        <>
          <div className='bg-gray-50 mt-5  p-5 container w-3/4 mx-auto'>

            {post && 
                 <>
                <div className='my-5'>
                 <div key={post._id} class="flex items-center gap-4">
                <img class="w-10 h-10 rounded-full" src={post.user.photo} alt=""/>
                <div class="font-medium dark:text-white">
                    <div>{post.user.name}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</div>
                </div>
            </div>
            <div class="">
               <p className='my-2 ps-2'>{post.body}</p>
               <img src={post.image} className='w-full rounded-2xl my-3'/>
            </div>

          {
            post.comments.map((comment)=>{
            return <>
            <div className='my-3'>
                  <div key={comment._id} className='flex justify-between '>
                <div  class="flex items-center gap-4">
                <img class="w-10 h-10 rounded-full" src={comment.commentCreator.photo.includes('undefined')?User:comment.commentCreator.photo} alt=""/>
                <div class="font-medium dark:text-white">
                    <div>{comment.commentCreator.name}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400 ms-1">{new Date(comment.createdAt).toLocaleDateString()}</div>
                </div>
            </div>
           
            </div>
             <p className='ms-15 '>{comment.content}</p>
             </div>
            </>
            })
          }
            </div>
                </>
 } 
           

    
        </div>
        </>
    )
}

export default PostDetails
