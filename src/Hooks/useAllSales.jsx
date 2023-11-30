import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useAllSales = () => {
    const axiosSecure = useAxiosSecure()
    const {data:allSales=[],refetch} = useQuery({
        queryKey:['allSales'],
        queryFn: async ()=>{
         const res= await axiosSecure.get(`/allSales`)
        //  console.log(res);
         return res.data
        }
    })
     return[allSales,refetch]  
};

export default useAllSales;