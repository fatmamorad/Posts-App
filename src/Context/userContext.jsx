import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let UserContext =createContext();
export function UserContextProvider(props){
 
    let [user,setUser]=useState()
    let [pageNumber,setPageNumber]=useState(1)
    async function getLogedUserData() {
        let response=await axios.get('https://linked-posts.routemisr.com/users/profile-data',{
            headers:{
                token:localStorage.getItem('userToken')
            }
        })
        console.log(520)
        if(response.data.message=='success'){
         setUser(response.data.user)
         
        }
    }
    
  const [darkMode, setDarkMode] = useState(
  localStorage.getItem("theme") || "light"
)

  console.log(darkMode)
  useEffect(() => {
    if (darkMode=='dark') {
      document.documentElement.classList.add("dark")
   
      localStorage.setItem("theme", 'dark')
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme",'light')
      
    }
  },)
  
     useEffect(()=>{
       if(localStorage.getItem('userToken')){
           getLogedUserData()
       }
    },[])
    return <UserContext.Provider value={{getLogedUserData,user,setUser,pageNumber,setPageNumber,setDarkMode,darkMode}}>
                  {props.children}
          </UserContext.Provider>
}