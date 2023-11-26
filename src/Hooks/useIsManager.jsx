import { useContext } from "react";
import { authContext } from "../Components/AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useIsManager = () => {

    const { user } = useContext(authContext)
    const axiosSecure = useAxiosSecure()
    const { data: isManager, isPending : isManagerLoading } = useQuery({
        queryKey: ['isManager', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/manager/${user?.email}`)
            return res.data
        }
    })
    return [isManager, isManagerLoading]

};

export default useIsManager;