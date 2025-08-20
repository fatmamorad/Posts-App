import React, { useContext, useState } from 'react'
import { UserContext } from '../../Context/userContext'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

function CreateComment(props) {
  let { user } = useContext(UserContext)
  let { handleSubmit,register } = useForm();
 const queryClient = useQueryClient();

  // mutation function
  async function handleCreatedPost(newComment) {
    let comment=
      {'content':newComment.content,
        'post':props.post_id}
        console.log(comment)
    let response = await axios.post(
      'https://linked-posts.routemisr.com/comments',
      comment,
      { headers: { token: localStorage.getItem('userToken') } }
    )
  
    return response
  }

  // mutation hook
  const createCommentMutation = useMutation({
    mutationFn: handleCreatedPost,
    onSuccess: (response) => {
        toast.success('Comment Created ✅')
       queryClient.invalidateQueries(['Posts']) 
    },
    onError: (error) => {
      
      toast.error(error.response?.data?.error || "Something went wrong ❌")
    }
  })



  return (
    <>
      <form
        onSubmit={handleSubmit((data)=>createCommentMutation.mutate(data))}
        className="mb-5 bg-gray-50 dark:bg-gray-950 rounded-2xl px-3 mt-5 p-1 container mx-auto"
      >
        <div className="my-5 flex justify-between items-center relative">
          <div className="w-full relative">
            <input
              type="text"
              {...register('content')}
              className="p-2 mx-auto w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
              placeholder="Comment Body.."
            />
          </div>

          <button
            type="submit"
            disabled={createCommentMutation.isPending}
            className="w-50 p-2 ms-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm"
          >
            {createCommentMutation.isPending ? "Adding..." : "Add Comment"}
          </button>
        </div>
      </form>
    </>
  )
}

export default CreateComment
