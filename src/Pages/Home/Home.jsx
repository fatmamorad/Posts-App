import axios from 'axios'
import './Home.css'
import React, { useContext, useEffect, useState } from 'react'
import imgg from '../../assets/Group 1.png'
import { Link } from 'react-router-dom'
import CreatePost from '../../Component/CreatePost/CreatePost'
import PostOption from '../../Component/postOption/postOption'
import { UserContext } from '../../Context/userContext'
import Pagination from '../../Component/Pagination/Pagination'
import CreateComment from '../../Component/CreateComment/CreateComment'
import { useQuery } from '@tanstack/react-query'
import Loader from '../../Component/Loader/Loader'

function Home() {
     
    let {user,pageNumber,setPageNumber}=useContext(UserContext)
    
const {  data, isLoading } = useQuery({
  queryKey: ['Posts', pageNumber], 
  queryFn: async () => {
    let response = await axios.get(
      `https://linked-posts.routemisr.com/posts?limit=20&sort=-createdAt&page=${pageNumber}`,
      {
        headers: {
          token: localStorage.getItem('userToken')
        }
      }
    )
    if (response.data.message === "success") {
      return {
        posts: response.data.posts,
        pagination: response.data.paginationInfo
      }
    }
  },
})

    return (
        <>
    <div className='h-screen'>
     {!isLoading?
     <>
    <CreatePost/>
        <div className=' mt-5  p-5 container w-3/4 mx-auto'>
         
            {data?.posts && data.posts.map((post) => {
                return <>
                <div  key={post._id}className='my-5 rounded-xl bg-blue-50 p-5 dark:bg-black '>
                 <div  class="flex items-center gap-4 justify-between">
                        <div  class="flex items-center gap-4">
                <img class="w-10 h-10 rounded-full" src={post.user.photo} alt=""/>
                <div class="font-medium dark:text-white">
            
                    <div>{post.user.name}</div>
                    <div class="text-sm text-gray-500 dark:text-white">{new Date(post.createdAt).toLocaleDateString()}</div>
                </div>
                </div>
                 {user._id==post.user._id&&<PostOption postId={post.id} postImage={post.image}/>}
            </div>
            <div className="">
               <p className='my-2 ps-2 dark:text-white'>{post.body}</p>
               <img src={post.image} className='w-full  rounded-2xl my-3 object-contain  '/>
            </div>
         
          <div className="flex justify-between text-xs sm:text-sm md:text-base">

                <p className='ms-2 text-blue-600 '><span className='me-2 text-blue-600 '>{post.comments.length}</span>Comments </p>
                <Link to={'/PostDetails/'+post._id} className='text-blue-600 me-2 cursor-pointer underline-offset-1 '  >See More Details..</Link>
            </div>
            </div>
               <CreateComment  post_id={post._id}/>
                </>
 } )}
           

    
        </div>
        {data?.pagination&& <Pagination paged={data?.pagination}/>}
     </>
     :<Loader></Loader>}
     </div>
        </>

    )
    
}

export default Home
