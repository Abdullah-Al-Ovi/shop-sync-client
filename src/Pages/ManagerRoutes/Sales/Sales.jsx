import { FaCartPlus } from "react-icons/fa";
import useShopProducts from "../../../Hooks/useShopProducts";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../../Components/AuthProvider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Sales = () => {
    const [products, refetch] = useShopProducts()
    const [searchProduct, setSearchProduct] = useState([])
    const [search, setSearch] = useState(false)
    const { user } = useContext(authContext)
    const axiosSecure = useAxiosSecure()



    const handleSearch = (e) => {
        e.preventDefault()
        setSearch(true)
        console.log(e.target.searchId.value);
        const find = products?.filter(product => product._id === e.target.searchId.value)
        if (find) {
            setSearchProduct(find)
        }
    }

    const handleAddForCart = (id) => {
        const find = products?.find(product => product._id === id)
        const cartInfo = {
            manager: user?.email,
            shopId: products[0].shopId,
            productId: id,
            productName: find?.productName,
            productImage: find?.productImage,
            productQuantity: find?.productQuantity,
            sellingPrice : find?.sellingPrice
        }
        //    console.log(productInfo);
        axiosSecure.post('/carts', cartInfo)
            .then(res => {
                console.log(res.data);
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Product Added to Cart successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            })

    }
    
    return (
        <div id="element-to-print" className="">
            <div className="text-center p-3 space-y-4">
                <h2 className="text-2xl font-semibold">Sales Collection</h2>
                <form onSubmit={handleSearch}>
                    <input required type="text" placeholder="Search by _ID" name="searchId" className="p-1 border-[1px] rounded border-black mr-2" />
                    <input type="submit" className="p-[3px] border-2 bg-red-400 rounded text-white font-medium" value="Search" />
                </form>
            </div>
            <div>
                <table className="w-full ">
                    <thead className="bg-gray-300 text-black">
                        <tr>
                            <th className="border-2 p-2">ID</th>
                            <th className="border-2 p-2"></th>
                            <th className="border-2 p-2">Name</th>
                            <th className="border-2 p-2">Quantity</th>
                            <th className="border-2 p-2">Discount</th>
                            <th className="border-2 p-2">Selling Price (Per unit)</th>
                            <th className="border-2 p-2">ADD</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            search ? searchProduct?.map((product, index) => (
                                <tr key={product?._id} className={`border-b text-center ${index === product?.length - 1 ? '' : 'border-gray-300'}`}>
                                    <td className=" p-2">{product?._id}</td>
                                    <td className="flex justify-center p-2">
                                        <img className="w-[50px]" src={product?.productImage} alt="" />
                                    </td>
                                    <td className=" p-2">{product?.productName}</td>
                                    <td className=" p-2">{product?.productQuantity}</td>
                                    <td className=" p-2">
                                        {product?.discount}
                                    </td>
                                    <td className=" p-2"> {product?.sellingPrice}</td>
                                    <td className=" p-2">

                                        <button className="">
                                            <FaCartPlus className=""></FaCartPlus>
                                        </button>

                                    </td>

                                </tr>

                            ))
                                :
                                products?.map((product, index) => (
                                    <tr key={product?._id} className={`border-b text-center ${index === product?.length - 1 ? '' : 'border-gray-300'}`}>
                                        <td className=" p-2">{product?._id}</td>
                                        <td className="flex justify-center p-2">
                                            <img className="w-[70px]" src={product?.productImage} alt="" />
                                        </td>
                                        <td className=" p-2">{product?.productName}</td>
                                        <td className=" p-2">{product?.productQuantity}</td>
                                        <td className=" p-2">
                                            {product?.discount}
                                        </td>
                                        <td className=" p-2">{product?.sellingPrice}</td>
                                        <td className=" p-2">

                                            <button onClick={() => handleAddForCart(product?._id)} className="">
                                                <FaCartPlus className=""></FaCartPlus>
                                            </button>

                                        </td>

                                    </tr>

                                ))

                        }
                    </tbody>
                </table>
            </div>
            <div className="text-end mr-4 my-5">
                <Link to='/dashboard/checkOut'>
                    <button  className="btn ">Proceed to check out</button>
                </Link>
            </div>
        </div>
    );
};

export default Sales;
// ,,,,

// ,,,