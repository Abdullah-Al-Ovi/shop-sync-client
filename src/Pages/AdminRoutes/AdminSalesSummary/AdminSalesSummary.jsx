import {  FaProductHunt, FaSalesforce, FaWallet } from "react-icons/fa";
import useAllProducts from "../../../Hooks/useAllProducts";
import useAllSales from "../../../Hooks/useAllSales";


const AdminSalesSummary = () => {

    const [allProducts] = useAllProducts()
    const [allSales] = useAllSales()

    return (
        <div>
            
            <div className="container flex flex-col mx-auto bg-white">
                
                <div className="w-full draggable">
                    
                    <div className="container  flex flex-col items-center gap-16 mx-auto my-20">
                    <h2 className="text-3xl font-semibold">Sales Summary </h2>
                        <div className="grid w-full  grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                            <div className="flex border-2 shadow-md flex-col items-center gap-3 px-8 py-10 bg-white rounded-3xl shadow-main">
                                <span>
                                   <FaWallet className="font-medium text-xl text-gray-500"></FaWallet>
                                </span>
                                <p className="text-2xl font-extrabold text-dark-grey-900">Admin Income</p>
                              
                                <p className="text-lg font-bold text-purple-blue-500" >$0</p>
                            </div>
                            <div className="flex border-2 shadow-md flex-col items-center gap-3 px-8 py-10 bg-white rounded-3xl shadow-main">
                                <span>
                                    <FaProductHunt className="font-medium text-xl text-gray-500"></FaProductHunt>
                                </span>
                                <p className="text-2xl font-extrabold text-dark-grey-900">Total Products</p>
                             
                                <p className="text-lg font-bold text-purple-blue-500" >{allProducts?.length > 0 ? allProducts?.length : 0 }</p>
                            </div>
                            <div className="flex border-2 shadow-md flex-col items-center gap-3 px-8 py-10 bg-white rounded-3xl shadow-main">
                                <span>
                                   <FaSalesforce className="font-medium text-xl text-gray-500"></FaSalesforce>
                                </span>
                                <p className="text-2xl font-extrabold text-dark-grey-900">Total Sale</p>
                                <p className="text-lg font-bold text-purple-blue-500" href="tel:+516-486-5135">{allSales?.length > 0 ? allSales?.length : 0 }</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default AdminSalesSummary;