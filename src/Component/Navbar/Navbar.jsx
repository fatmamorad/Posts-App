import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { useContext, useState } from 'react'
import { UserContext } from '../../Context/userContext'
import darkLogo from '../../assets/darkLogo.png'
function Navbar() {
   let {user,setUser,setDarkMode,darkMode}= useContext(UserContext)
    console.log(darkMode)
  
   let Navigate=useNavigate()
   function Logout(){
    localStorage.removeItem('userToken')
    setUser(null)
    Navigate('/Register')
   }
   
    return (
        <div className='containe shadow-lg'>
        

       <nav className="bg-white border-gray-200 dark:bg-black">
  <div className="max-w-screen-xl flex flex-wrap items-center  justify-between mx-auto p-4">
   
    <Link to='/' className="flex items-center space-x-3 rtl:space-x-reverse">
     
      <img src={darkMode==='dark'?darkLogo:logo} className="h-12" alt="Flowbite Logo" />
    </Link>
   
   <div  className='flex justify-center items-center md:order-2'>
   

    <button data-collapse-toggle="navbar-default" type="button" className=" inline-flex items-center p-2 w-10 h-10  justify-end text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
      </svg>
    </button>
      <button 
  onClick={() => setDarkMode(darkMode==='dark'?'light': 'dark')} 
  className="bg-blue-400  w-12 h-7.5   md:order-2 rounded-3xl relative flex items-center justify-center  ml-3"
> 
  <i className={`fa ${darkMode==='dark' ? "fa-moon" : "fa-sun"} ${darkMode==='dark' ? "end-1" : "start-1"} transition  duration-300 text-white absolute`}></i>
</button>
    </div>
    
    <div className="hidden w-full  md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col justify-center items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-black dark:text-white">
      
        {!user?<>
        <li>
          <NavLink to="/Register" className=" text-xs md:text-sm block py-2 px-3  rounded-sm   dark:text-white md:dark:text-blue-500" aria-current="page">Login</NavLink>
        </li>
        <li>
          <NavLink to="/Login" className="block py-2 text-xs md:text-sm px-3 text-gray-900 rounded-sm dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Register</NavLink>
        </li>
        </>:
       <>
       <li > 
       
        <img class="w-10 h-10 rounded-full inline-block" src={user.photo.includes('undefined')?User:user.photo} alt=""/></li>
         <li>
          <Link to="/Profile" className="block py-2 px-3 text-gray-900 rounded-sm text-xs md:text-sm dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Profile</Link>
        </li>
       <li>
    
        <p >Hello <span className='text-cyan-600 text-xs md:text-sm'>{user.name}</span></p>
        </li>
        <li>
          <i onClick={Logout} class="fa-solid fa-arrow-right-from-bracket cursor-pointer"></i>
        </li>
       </>

        }
        
      </ul>
    </div>
  

  </div>
  
</nav>

        </div>
    )
}

export default Navbar
