import { useContext } from "react";
import { authContext } from "../Components/AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useSingleShop = () => {
    const {user} = useContext(authContext)
    const axiosSecure = useAxiosSecure()
    const {data:shop,refetch}=useQuery({
        queryKey:['shop',user?.email],
        enabled: !!user?.email,
        queryFn: async()=>{
           
          const res=await  axiosSecure.get(`/singleShop/${user?.email}`)
        //   console.log(res.data);
          return res.data
        }
    })
    return [shop,refetch]
};

export default useSingleShop;