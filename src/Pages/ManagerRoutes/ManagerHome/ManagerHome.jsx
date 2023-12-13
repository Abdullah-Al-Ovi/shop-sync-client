
import { Link, useNavigate } from "react-router-dom";
import useShopProducts from "../../../Hooks/useShopProducts";
import { useEffect } from "react";
import useSingleShop from "../../../Hooks/useSingleShop";
import Swal from "sweetalert2";

const ManagerHome = () => {
    // const [totalProduct, setTotalProduct] = useState([])
    const [products] = useShopProducts()
    const [shop] = useSingleShop()
    const navigate =  useNavigate()
    console.log(shop);
    useEffect(()=>{
        if(shop?.limit === 1){
            Swal.fire({
                title: "Increase your limit!",
                text: "Your product limit is about to end.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Increase "
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate('/dashboard/subscription')
                }
              });
        }
        else if(shop?.limit === 0){
            Swal.fire({
                title: "Increase your limit!",
                text: "Your product limit is end.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Increase "
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate('/dashboard/subscription')
                }
              });
        }
    },[shop?.limit,navigate])
    console.log(products.length);
    return (
        <div className="min-h-screen flex items-center justify-center">
            {
                products?.length > 0 && <div className="flex w-full justify-evenly  py-3 border-y-2 border-black my-3 items-center">
                    <h2 className="text-xl font-medium">Total products available: {products?.length}</h2>
                    <Link to='/dashboard/addProduct'><button className="btn btn-info text-white">ADD PRODUCT</button></Link>

                </div>
            }
            {
                products?.length === 0 && <div className="text-center ">
                    <h1 className="text-xl font-medium mb-3">You have not added any product to your store.</h1>
                    <Link to='/dashboard/addProduct'><button className="btn btn-info text-white">ADD PRODUCT</button></Link>
                </div>
            }

        </div>
    );
};

export default ManagerHome;