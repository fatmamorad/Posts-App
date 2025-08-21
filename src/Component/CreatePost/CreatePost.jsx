import React, { useContext, useRef } from 'react'
import { UserContext } from '../../Context/userContext'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

function CreatePost() {
  let { user } = useContext(UserContext)
  let imageInput = useRef()
  let { register, handleSubmit, reset } = useForm()
  
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (post) => {
      let Post = new FormData()
      Post.append('body', post.body)
      if (imageInput.current.files[0]) {
        Post.append('image', imageInput.current.files[0])
      }

      let response = await axios.post(
        'https://linked-posts.routemisr.com/posts',
        Post,
        {
          headers: {
            token: localStorage.getItem('userToken'),
          },
        }
      )
      return response.data
    },
    onSuccess: (data) => {
      console.log(data)
      if (data.message === 'success') {
        toast.success('Post Added')
         queryClient.invalidateQueries(['Posts'])
         reset() 
         imageInput.current.value = "" 
           }
    },

  })

  return (
    <>
      <form onSubmit={handleSubmit((data) => mutation.mutate(data))}  className="mb-5 bg-gray-50 mt-5 p-5 container w-3/4 mx-auto dark:bg-black rounded-2xl"
      >
        <p className="dark:text-white text-xs md:text-sm">Post Something</p>

        <div className="my-5 flex  flex-wrap  justify-between items-center">
          <div className="w-15 ">
            <img
              className="w-10 h-10 mb-2 m:mb-0 rounded-full inline-block"
              src={
                user?.photo?.includes('undefined')
                  ? '/default-user.png' 
                  : user?.photo
              }
              alt=""
            />
          </div>
        <div className='flex md:w-11/12   w-full justify-center items-center'>
          <div className="mb-2 w-full m:mb-0 ">
            <input
              {...register('body')}
              type="text"
              id="postBody"
              className="p-2 mx-auto w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
              placeholder="Post Body"
            />
          </div>

          <div className="w-15 ms-2">
            <label htmlFor="file_input">
              <i className="fa-regular  fa-image fa-2x cursor-pointer text-blue-500"></i>
            </label>
            <input
              ref={imageInput}
              className="hidden w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
              id="file_input"
              type="file"
            />
          </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full text-white text-xs md:text-sm bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          {mutation.isPending ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </>
  )
}

export default CreatePost
