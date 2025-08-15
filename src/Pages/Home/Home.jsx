import axios from 'axios'
import React, { useEffect, useState } from 'react'
import imgg from '../../assets/Group 1.png'
import { Link } from 'react-router-dom'

function Home() {
    let [Posts,setPosts]=useState([])
    useEffect(()=>{
     getAllPosts()
    },[])
     async function getAllPosts(){
        let response =await axios.get(
            'https://linked-posts.routemisr.com/posts?limit=50',
            {
               headers:{
                token:localStorage.getItem('userToken')
               }
            }
        )
        console.log(response)
        if(response.data.message=="success"){
            setPosts(response.data.posts)
        }
    }
    return (
        <>
        <div className='bg-gray-50 mt-5  p-5 container w-3/4 mx-auto'>

            {Posts && Posts.map((post) => {
                return <>
                <div  key={post._id}className='my-5'>
                 <div  class="flex items-center gap-4">
                <img class="w-10 h-10 rounded-full" src={post.user.photo} alt=""/>
                <div class="font-medium dark:text-white">
                    <div>{post.user.name}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</div>
                </div>
            </div>
            <div class="">
               <p className='my-2 ps-2'>{post.body}</p>
               <img src={post.image} className='w-full rounded-2xl my-3 object-contain  '/>
            </div>
          <div className="flex justify-between text-xs sm:text-sm md:text-base">

                <p className='ms-2'><span className='me-2 text-blue-600'>{post.comments.length}</span>Comments </p>
                <Link to={'/PostDetails/'+post._id} className='text-blue-600 me-2 cursor-pointer underline-offset-1 '  >See More Details..</Link>
            </div>
            </div>
                </>
 } )}
           

    
        </div>
        </>
    )
}

export default Home
