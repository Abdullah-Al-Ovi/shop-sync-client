import { useState } from "react";
import { Link } from "react-router-dom";


const ManagerHome = () => {
    const [totalProduct, setTotalProduct] = useState([])
    return (
        <div className="min-h-screen flex items-center justify-center">
            {
                totalProduct?.length > 0 && <div className="flex w-full justify-evenly  py-3 border-y-2 border-black my-3 items-center">
                    <h2 className="text-xl font-medium">Total products available: {totalProduct?.length}</h2>
                    <Link to='/dashboard/addProduct'><button className="btn btn-info text-white">ADD PRODUCT</button></Link>

                </div>
            }
            {
                totalProduct?.length === 0 && <div className="text-center ">
                    <h1 className="text-xl font-medium mb-3">You have not added any product to your store.</h1>
                    <Link to='/dashboard/addProduct'><button className="btn btn-info text-white">ADD PRODUCT</button></Link>
                </div>
            }

        </div>
    );
};

export default ManagerHome;