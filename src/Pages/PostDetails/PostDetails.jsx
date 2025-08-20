import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import User from '../../assets/download (1).png'
import { UserContext } from '../../Context/userContext'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Loader from '../../Component/Loader/Loader'

function PostDetails() {
  let { handleSubmit, register } = useForm();
  let [editingCommentId, setEditingCommentId] = useState(null);
  let { user } = useContext(UserContext);
  let { id } = useParams();
  const queryClient = useQueryClient();

  // ----------------- Get Post Details -----------------
  async function getPostDetails() {
    return await axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
      headers: { token: localStorage.getItem('userToken') },
    });
  }

  const { data, isLoading } = useQuery({
    queryKey: ["PostDetails", id],
    queryFn: getPostDetails,
  });

  // ----------------- Delete Comment -----------------
  async function deleteComment(Comment_Id) {
    return await axios.delete(
      `https://linked-posts.routemisr.com/comments/${Comment_Id}`,
      { headers: { token: localStorage.getItem('userToken') } }
    );
  }

  let DeleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      toast.success("Comment Deleted");
      queryClient.invalidateQueries(["PostDetails", id]); // refresh post data
    },
    onError: (err) => {
      toast.error("Error deleting comment");
      console.log(err);
    },
  });

  // ----------------- Edit Comment -----------------
  async function editComment(data) {
    let response = await axios.put(
      `https://linked-posts.routemisr.com/comments/${editingCommentId}`,
      data,
      { headers: { token: localStorage.getItem('userToken') } }
    );
    return response;
  }

  let EditMutation = useMutation({
    mutationFn: editComment,
    onSuccess: () => {
      toast.success("Comment Edited");
      setEditingCommentId(null);
      queryClient.invalidateQueries(["PostDetails", id]); // refresh post data
    },
    onError: (err) => {
      toast.error("Error editing comment");
      console.log(err);
    },
  });

  // ----------------- Submit Handler -----------------
  function handleEditSubmit(formData) {
    EditMutation.mutate(formData);
  }



  return (
    <>
    <div className='h-screen'>
  {!isLoading?
    <div className="mt-5 p-5 container w-3/4 mx-auto">
      {data?.data?.post && (
        <>
          {/* Post Header */}
          <div className="my-5 bg-gray-100 rounded-2xl p-5">
            <div key={data.data.post._id} className="flex items-center gap-4">
              <img className="w-10 h-10 rounded-full" src={data.data.post.user.photo} alt="" />
              <div className="font-medium">
                <div>{data.data.post.user.name}</div>
                <div className="text-sm text-gray-500">
                  {new Date(data.data.post.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="px-13">
              <p className="my-2 ps-2">{data.data.post.body}</p>
              <img src={data.data.post.image} className="w-full rounded-2xl my-3" />
            </div>
          </div>

          {/* Comments */}
          {data?.data?.post.comments.map((comment) => (
            <div key={comment._id} className="my-3 bg-gray-100 rounded-2xl p-5">
              <div className="flex justify-between">
                <div className="flex items-center gap-4">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={
                      comment.commentCreator.photo.includes("undefined")
                        ? User
                        : comment.commentCreator.photo
                    }
                    alt=""
                  />
                  <div className="font-medium">
                    <div>{comment.commentCreator.name}</div>
                    <div className="text-sm text-gray-500 ms-1">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Edit + Delete buttons */}
                {comment.commentCreator._id === user._id && (
                  <div className="font-medium">
                    <i
                      onClick={() => setEditingCommentId(comment._id)}
                      className="fa fa-edit me-3 cursor-pointer"
                    ></i>
                    <i
                      onClick={() => DeleteMutation.mutate(comment._id)}
                      className="hover:text-red-400 cursor-pointer fa-solid fa-trash"
                    ></i>
                  </div>
                )}
              </div>

              {/* Comment body or edit form */}
              {editingCommentId === comment._id ? (
                <form onSubmit={handleSubmit(handleEditSubmit)} className="mt-3">
                  <input
                    {...register("content")}
                    defaultValue={comment.content}
                    type="text"
                    className="p-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
                  />
                  <button
                    type="submit"
                    className="mt-2 px-3 py-1 text-white bg-blue-700 hover:bg-blue-800 rounded-lg"
                  >
                    Save
                  </button>
                </form>
              ) : (
                <p className="ms-15 mt-2">{comment.content}</p>
              )}
            </div>
          ))}
        </>
      )}
    </div>:
    <Loader/>
  }
  </div>
  </>
  );
}

export default PostDetails;
