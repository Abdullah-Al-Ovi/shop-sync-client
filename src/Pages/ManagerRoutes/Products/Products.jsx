import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useShopProducts from "../../../Hooks/useShopProducts";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const Products = () => {
    const [products, refetch] = useShopProducts()
    const axiosSecure = useAxiosSecure()

    const handleDelete = id =>{

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, remove `
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/products/${id}`)
                .then(res=>{
    
                    console.log(res.data);
                    if(res.data?.deletedCount){
                       axiosSecure.patch(`/productCountDecrease/${products[0].shopId}`)
                       .then(res=>{
                        if(res.data?.modifiedCount){
                            axiosSecure.patch(`/increaseLimit/${products[0].shopId}`)
                            .then(res=>{
                                console.log(res.data);
                                refetch()
                            })
                        }
                       })
                    }
                })

            }
        });



            
    }
    return (
        <div className="">
            <div className="flex justify-between p-3 ">
                <h2 className="text-lg font-medium">Manage Product</h2>
                <h2 className="text-lg font-medium">Total Products: {products?.length}</h2>
            </div>
            <div>
                <table className="w-full ">
                    <thead className="bg-gray-300 text-black">
                        <tr>
                            <th className="border-2 p-2"></th>
                            <th className="border-2 p-2">NAME</th>
                            <th className="border-2 p-2">Quantity</th>
                            <th className="border-2 p-2">Sale Count</th>
                            <th className="border-2 p-2">Update</th>
                            <th className="border-2 p-2">delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product, index) => (
                            <tr key={product?._id} className={`border-b text-center ${index === product?.length - 1 ? '' : 'border-gray-300'}`}>
                                <td className="flex justify-center p-2">
                                    <img className="w-[70px]" src={product?.productImage} alt="" />
                                </td>
                                <td className=" p-2">{product?.productName}</td>
                                <td className=" p-2">{product?.productQuantity}</td>
                                <td className=" p-2">
                                    {product?.saleCount}
                                </td>
                                <td className=" p-2">

                                    <Link to={`/dashboard/updateProduct/${product._id}`}>
                                        <button className=" ">
                                            <FaEdit className="text-blue-400 text-xl"></FaEdit>
                                        </button>
                                    </Link>

                                </td>
                                <td className=" p-2">

                                    <button onClick={()=>handleDelete(product._id)} className="">
                                        <FaTrashAlt className="text-red-400 text-xl"></FaTrashAlt>
                                    </button>

                                </td>

                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Products;