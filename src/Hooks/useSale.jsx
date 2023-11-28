import { useContext } from "react";
import { authContext } from "../Components/AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useSale = () => {
    const {user} = useContext(authContext)
    const axiosSecure = useAxiosSecure()
    const {data:sales=[],refetch}=useQuery({
        queryKey:['sales',user?.email],
        enabled: !!user?.email,
        queryFn: async()=>{
           
          const res=await  axiosSecure.get(`/sales/${user?.email}`)
        //   console.log(res.data);
          return res.data
        }
    })
    return [sales,refetch]
};

export default useSale;