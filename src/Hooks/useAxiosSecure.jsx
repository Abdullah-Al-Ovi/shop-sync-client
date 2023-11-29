import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { authContext } from "../Components/AuthProvider/AuthProvider";

const axiosSecure = axios.create({
    baseURL:'https://shopsync-server.vercel.app'
})

const useAxiosSecure = () => {
  const navigate = useNavigate()
  const {logOut}  = useContext(authContext)

    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`
        return config;
      }, function (error) {
        // Do something with request error
        return Promise.reject(error);
      });

      useEffect(()=>{
        axiosSecure.interceptors.response.use(res=>{
            return res; 
         },error=>{
             if(error.response.status === 401 || error.response.status === 403){
                 logOut()
                .then(()=>{
             navigate('/sign-in')
         })
             }
         })
    },[logOut,navigate])

    return axiosSecure
};

export default useAxiosSecure;