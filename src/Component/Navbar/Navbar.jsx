import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { useContext } from 'react'
import { UserContext } from '../../Context/userContext'
function Navbar() {
   let {user,setUser=r}= useContext(UserContext)
   let Navigate=useNavigate()
   function Logout(){
    localStorage.removeItem('userToken')
    setUser(null)
    Navigate('/')
   }
   
    return (
        <div className='containe shadow-lg'>
        

       <nav className="bg-white border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link to='/' className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src={logo} className="h-12" alt="Flowbite Logo" />
    </Link>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
      </svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col justify-center items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        {!user?<>
        <li>
          <NavLink to="/Register" className="block py-2 px-3  rounded-sm   dark:text-white md:dark:text-blue-500" aria-current="page">Login</NavLink>
        </li>
        <li>
          <NavLink to="/Login" className="block py-2 px-3 text-gray-900 rounded-sm dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Register</NavLink>
        </li>
        </>:
       <>
       <li > 
       
        <img class="w-10 h-10 rounded-full inline-block" src={user.photo.includes('undefined')?User:user.photo} alt=""/></li>
         <li>
          <Link to="/Profile" className="block py-2 px-3 text-gray-900 rounded-sm dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Profile</Link>
        </li>
       <li>
    
        <p >Hello <span className='text-cyan-600'>{user.name}</span></p>
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
