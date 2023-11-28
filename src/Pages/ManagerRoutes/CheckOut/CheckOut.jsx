import { useContext, useState } from "react";
import useCart from "../../../Hooks/useCart";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { authContext } from "../../../Components/AuthProvider/AuthProvider";



const CheckOut = () => {
    const{user}= useContext(authContext)
    const [cart, refetch] = useCart()
    // console.log(cart);
    const [isDate, setIsDate] = useState(false)
    const [date,setDate] = useState('')
    const [time,setTime] = useState('')
    const axiosSecure = useAxiosSecure()
  

    const handleGetPaid = () => {
        setIsDate(true)
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const seconds = currentDate.getSeconds().toString().padStart(2, '0');
        const date = `${year}-${month}-${day} `;
        setDate(date)
        const time = `${hours}:${minutes}:${seconds}`
        setTime(time)
        const salesInfo ={
           
            manager:user?.email,
            cartIds : cart?.map(item=>item._id),
            productIds: cart?.map(item=>item.productId),
            shopIds: cart?.map(item=>item.shopId),
            productName: cart?.map(item=>item.productName),
            productQuantity: cart?.map(item=>item.productQuantity),
            sellingPrice:cart?.map(item=>item.sellingPrice),
            date : date,
            time:time
        }
        console.log(salesInfo);
        axiosSecure.post('/sales',salesInfo)
        .then(res=>{
            // console.log(res.data);
      
            if(res.data.deleteResult.deletedCount){
              cart?.map(item=>{
                axiosSecure.patch(`/updateSaleCount/${item?.productId}`)
                .then(res=>{
                    console.log(res.data);
                    refetch()
                    setIsDate(false)
                })
              })  
            }
        })

    }

    return (
        <div >
            <h2 className="text-lg font-semibold my-5">Check out from here </h2>
            <div>
                <table className="w-full ">
                    <thead className="bg-[#D1A054] text-white">
                        <tr>
                            <th className="border-2 p-2">ID</th>
                            <th className="border-2 p-2">Name</th>
                            <th className="border-2 p-2">Quantity</th>
                            <th className="border-2 p-2">Selling Price (Per unit)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart?.map((product, index) => (
                                <tr key={product?._id} className={`border-b text-center ${index === product?.length - 1 ? '' : 'border-gray-300'}`}>
                                    <td className=" p-2">{product?._id}</td>
                                    <td className=" p-2">{product?.productName}</td>
                                    <td className=" p-2">{product?.productQuantity}</td>
                                    <td className=" p-2">{product?.sellingPrice}</td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {
                isDate && <div>
                    <p>Date:{date} </p>
                    <p>Time: {time} </p>
                </div>
            }
            <div className="text-center my-5">
                {
                    cart?.length > 0 && <button  onClick={handleGetPaid} className="btn ">GET PAID</button>
                }
            </div>
        </div>
    );
};

export default CheckOut;