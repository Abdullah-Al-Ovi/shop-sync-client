import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useAllShop = () => {
    const axiosSecure = useAxiosSecure()
    const { data: allShop = [], refetch } = useQuery({
        queryKey: ['allSHop' ],
       
        queryFn: async () => {
    
          const res = await axiosSecure.get(`/allShop`)
          return res.data
        }
      })
      return [allShop, refetch];
};

export default useAllShop;