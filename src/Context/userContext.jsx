import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let UserContext =createContext();
export function UserContextProvider(props){
   
    let [user,setUser]=useState(null)
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
     useEffect(()=>{
       if(localStorage.getItem('userToken')){
           getLogedUserData()
       }
    },[])
    return <UserContext.Provider value={{getLogedUserData,user,setUser}}>
                  {props.children}
          </UserContext.Provider>
}