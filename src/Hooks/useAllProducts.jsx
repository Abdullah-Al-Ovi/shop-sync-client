
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useAllProducts = () => {
   
    const axiosSecure = useAxiosSecure()
     const {data:allProducts=[],refetch} = useQuery({
         queryKey:['allProducts'],
         queryFn: async ()=>{
          const res= await axiosSecure.get(`/allProducts`)
          console.log(res);
          return res.data
         }
     })
      return[allProducts,refetch] 
};

export default useAllProducts;