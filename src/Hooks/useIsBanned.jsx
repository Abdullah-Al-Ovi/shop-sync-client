import { useContext } from "react";
import { authContext } from "../Components/AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useIsBanned = () => {
    const {user} = useContext(authContext)
    const axiosSecure = useAxiosSecure()
    const {data:isBanned,isPending: isBannedLoading}=useQuery({
        queryKey:['isBanned',user?.email],
        queryFn: async()=>{
         const res =await axiosSecure.get(`/users/banned/${user?.email}`)
         return res.data
        }
    })
    return [isBanned,isBannedLoading]
};

export default useIsBanned;