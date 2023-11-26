import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile,GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

import axios from "axios";
import { auth } from "../../Firebase/firebase";

export const authContext = createContext(null)
const AuthProvider = ({children}) => {
    const googlePro = new GoogleAuthProvider()
    const [user,setUser]= useState('')
    const [loading,setLoading]=useState(true)

    const createUser=(email,password)=>{       
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const updateUser=(name,link)=>{
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: link
          })
      }

      const googleSignIn =()=>{    
          return signInWithPopup(auth, googlePro)  
      }

      const signInUser=(email,password)=>{       
        return signInWithEmailAndPassword(auth,email,password)
      }

      const logOut =()=>{
        return signOut(auth)
      }

      useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
            
            // if(currentUser){
            //   const user = {
            //       email :  currentUser.email
            //   }
              
            //   axios.post('http://localhost:5001/jwt',user)
            //   .then(res=>{
            //     localStorage.setItem('access-token',res.data.token)
            //   })
            // }
            // else{
            //   localStorage.removeItem('access-token')
            // }
            setLoading(false)
        })
        return ()=> unSubscribe()
      },[])

    const authInfo = {user,createUser,updateUser,googleSignIn,signInUser,logOut,loading}

    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    )
};

export default AuthProvider;