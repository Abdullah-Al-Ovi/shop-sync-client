import { useContext, useEffect, useState } from "react";
import { authContext } from "../Components/AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useCart = () => {
  const { user } = useContext(authContext)
  const axiosSecure = useAxiosSecure()
  // const[userInfo ,setUserInfo] = useState({})
  // console.log(userInfo);
  // useEffect(()=>{
  //     axiosSecure.get(`/users/${user?.email}`)
  //     .then(res=>{
  //         setUserInfo(res?.data)
  //     })
  // },[axiosSecure,user?.email])
  const { data: cart = [], refetch } = useQuery({
    queryKey: ['cart', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {

      const res = await axiosSecure.get(`/carts/${user?.email}`)
      return res.data
    }
  })
  return [cart, refetch]
};

export default useCart;