import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../../Components/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



const image_hosting = '2982c3150ccb99782ca3eb02dde1df4d'

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting}`;

const AddProduct = () => {
    const {user} = useContext(authContext)
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const navigate  = useNavigate()
    const [manager,setmanager] = useState({})
    useEffect(()=>{
        axiosSecure.get(`/users/${user?.email}`)
        .then(res=>{
            setmanager(res.data);
        })
    },[axiosSecure,user?.email])

    const { register, handleSubmit,reset } = useForm();

    const onSubmit = async (data) => {
        // console.log(data);

        // image upload to image bb then get url // 
        const imageFile = { image: data.productImage[0] };

        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if(res.data.success){
            const buyingPrice = parseFloat(data?.productionCost)/parseFloat(data?.productQuantity)
            const tax = (buyingPrice * 7.5)/100
            const profit = (buyingPrice*parseFloat(data?.profitMargin))/100
            const sellingPrice = buyingPrice + tax + profit
            const discount = (buyingPrice * parseFloat(data?.discount))/100
            const singleProfit = sellingPrice - buyingPrice
            console.log(res.data.success);
            const productInfo = {
                productName : data?.productName,
                productImage: res.data?.data?.display_url,
                productQuantity : parseFloat(data?.productQuantity),
                productLocation : data?.productLocation,
                productionCost : parseFloat(data?.productionCost),
                profitMargin: parseFloat(data?.profitMargin),
                discount : discount.toFixed(3),
                description: data?.description,
                manager : user?.email,
                shopId: manager?.shopId,
                shopName: manager?.shopName,
                saleCount : 0,
                sellingPrice : sellingPrice,
                singleProfit : singleProfit
            }
            console.log(productInfo);
            axiosSecure.post('/addProduct',productInfo)
            .then(res=>{
                console.log(res.data);
                if(res.data?.insertedId){
                    axiosSecure.patch(`/changeLimit/${productInfo?.shopId}`)
                    .then(res=>{
                        // console.log(res.data);
                        axiosSecure.patch(`/productCountIncrease/${productInfo?.shopId}`)
                        .then((res)=>{
                            reset()
                            navigate('/dashboard/products') 
                           console.log(res.data);
                           Swal.fire({
                            position: "top",
                            icon: "success",
                            title: "Product Added successfully",
                            showConfirmButton: false,
                            timer: 1500
                        });

                        })
                    })
                }
                else{
                    Swal.fire({
                        position: "top",
                        icon: "error",
                        title: "You Have Exceeded Product Adding Limit",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/subscription')
                }
            })
        }

       
    };

    return (
        <div>

            <div className="mt-10 text-center font-bold text-3xl">
                <h1>Add Product</h1>
            </div>

            <section className="flex justify-center items-center w-full md:w-full shadow-xl rounded-xl p-3 mx-auto bg-slate-100 mt-10">
                <div>
                    <div className="mt-10">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="flex flex-col md:flex-col lg:flex-row gap-6">
                                <div className="form-control">
                                    <label>Product Name</label>
                                    <input
                                        type="text"
                                        {...register("productName")}
                                        placeholder="Enter your product name"
                                        className="input mt-2  w-full md:w-[390px] lg:w-[390px]"
                                    />{" "}
                                </div>

                                <div className="flex flex-col md:flex-col lg:flex-row gap-6">
                                    <div>
                                        <label>Product Image</label>
                                        <input
                                            type="file"
                                            {...register("productImage", { required: true })}
                                            className="file-input file-input-ghost w-full max-w-xs"
                                        />
                                    </div>
                                </div>

                            </div>


                            <div className="flex flex-col md:flex-col lg:flex-row gap-6 mt-6">
                                <div className="form-control">
                                    <label> Product Quantity</label>
                                    <input
                                        type="text"
                                        {...register("productQuantity")}
                                        placeholder="Product Quantity"
                                        className="input mt-2  w-full md:w-[390px] lg:w-[390px]"
                                    />{" "}
                                </div>

                                <div className="form-control">
                                    <label>Product Location</label>
                                    <input
                                        type="text"
                                        {...register("productLocation")}
                                        placeholder="Product Location"
                                        className="input mt-2  w-full md:w-[390px] lg:w-[390px]"
                                    />{" "}
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-col lg:flex-row gap-6 mt-6">
                                <div className="form-control">
                                    <label>Production Cost</label>
                                    <input
                                        type="text"
                                        {...register("productionCost")}
                                        placeholder="Total production cost"
                                        className="input mt-2  w-full md:w-[390px] lg:w-[390px]"
                                    />{" "}
                                </div>

                                <div className="form-control">
                                    <label>Profit Margin(%)</label>
                                    <input
                                        type="text"
                                        {...register("profitMargin")}
                                        placeholder="Profit margin"
                                        className="input mt-2  w-full md:w-[390px] lg:w-[390px]"
                                    />{" "}
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-col lg:flex-row gap-6 mt-6">
                                <div className="form-control">
                                    <label>Discount(%)</label>
                                    <input
                                        type="text"
                                        {...register("discount")}
                                        placeholder="Discount"
                                        className="input mt-2  w-full md:w-[390px] lg:w-[390px]"
                                    />{" "}
                                </div>

                                <div className="form-control">
                                    <label>Description</label>
                                    <textarea  {...register("description")} placeholder="Description" className="textarea textarea-bordered textarea-lg w-full max-w-xs mt-2" ></textarea>
                                </div>
                            </div>


                            <input className="my-7 w-full p-2 text-white font-bold rounded-md bg-cyan-500" type="submit" value="ADD PRODUCT" />
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AddProduct;