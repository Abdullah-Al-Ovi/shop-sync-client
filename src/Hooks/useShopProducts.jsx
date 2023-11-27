import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { authContext } from "../Components/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const useShopProducts = () => {
   const axiosSecure = useAxiosSecure()
   const  {user} = useContext(authContext)
    
    const {data:products=[],refetch} = useQuery({
        queryKey:['products',user?.email],
        enabled: !!user?.email,
        queryFn: async ()=>{
         const res= await axiosSecure.get(`/products/${user?.email}`)
        //  console.log(res);
         return res.data
        }
    })
    console.log(products.length);
    // console.log(cart);
     return[products,refetch] 
};

export default useShopProducts;