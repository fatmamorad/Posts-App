import React, {useContext } from 'react'
import { UserContext } from '../../Context/userContext'
import { Link } from 'react-router-dom'

function Profile() {
    let {user}=useContext(UserContext)
    console.log(user)
    return (
        <>
        {user?
        <>
            <div className='flex bg-gray-100  w-3/4 mx-auto justify-center  rounded-3xl h-[500px] mt-10 items-center gap-10'>
                <div className=''>
                    <img src={user.photo} className='w-50 h-50 rounded-full object-cover'/>
                    <Link to='/EditProfile'><i class="ms-4 fa-solid fa-pen-to-square fa-xl mt-5 cursor-pointer"></i></Link>
                </div>
                <div>
                    <p className='text-xl'>Name</p>
                    <p className='ms-2 text-gray-400'>{user.name}</p>
                    <p className='text-xl mt-2'>Email</p>
                    <p className='ms-2 text-gray-400'>{user.email}</p>
                     <p className='text-xl mt-2'>Gender</p>
                      <p className='ms-2 text-gray-400'>{user.gender}</p>
                      <p className='text-xl mt-2'>Data Of Birth</p>

                    <p className=' text-gray-400 ms-2'>{new Date(user.dateOfBirth).toLocaleDateString()}</p>
                </div>
            </div>
            </>:''}
            
        </>
    )
}

export default Profile
