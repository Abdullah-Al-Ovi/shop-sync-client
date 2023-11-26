import { useContext } from "react";
import { authContext } from "../Components/AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useIsAdmin = () => {
    const {user} = useContext(authContext)
    const axiosSecure = useAxiosSecure()
    const {data:isAdmin,isPending: isAdminLoading}=useQuery({
        queryKey:['isAdmin',user?.email],
        queryFn: async()=>{
         const res =await axiosSecure.get(`/users/admin/${user?.email}`)
         return res.data
        }
    })
    return [isAdmin,isAdminLoading]
};

export default useIsAdmin;