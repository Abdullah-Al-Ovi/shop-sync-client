import { FaCartPlus } from "react-icons/fa";
import useShopProducts from "../../../Hooks/useShopProducts";
import { useState } from "react";


const Sales = () => {
    const [products, refetch] = useShopProducts()
    const [searchProduct,setSearchProduct] = useState([])
    const [search,setSearch] = useState(false)

    const handleSearch = (e)=>{
        e.preventDefault()
        setSearch(true)
            console.log(e.target.searchId.value);
        const find = products?.filter(product=>product._id === e.target.searchId.value)    
        if(find){
            setSearchProduct(find)
        }

    }
    return (
        <div className="">
            <div className="text-center p-3 space-y-4">
                <h2 className="text-2xl font-semibold">Sales Collection</h2>
                <form onSubmit={handleSearch}>
                    <input type="text" placeholder="Search by _ID" name="searchId" className="p-1 border-[1px] rounded border-black mr-2"/>
                   <input type="submit"  value="Search"  />
                </form>
            </div>
            <div>
                <table className="w-full ">
                    <thead className="bg-[#D1A054] text-white">
                        <tr>
                            <th className="border-2 p-2">ID</th>
                            <th className="border-2 p-2"></th>
                            <th className="border-2 p-2">Name</th>
                            <th className="border-2 p-2">Quantity</th>
                            <th className="border-2 p-2">Discount</th>
                            <th className="border-2 p-2">Selling Price</th>
                            <th className="border-2 p-2">ADD</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            search ? searchProduct?.map((product, index) => (
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
                            
                                        <button className="">
                                            <FaCartPlus className=""></FaCartPlus>
                                        </button>
                            
                                    </td>
                            
                                </tr>
                            
                            ))

                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Sales;
// ,,,,

// ,,,