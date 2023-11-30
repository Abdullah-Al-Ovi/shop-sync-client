import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { authContext } from "../../../Components/AuthProvider/AuthProvider";
import { useLoaderData, useNavigate } from "react-router-dom";

const image_hosting = '2982c3150ccb99782ca3eb02dde1df4d'

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting}`;
const UpdateProduct = () => {
    const {user} = useContext(authContext)
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const [manager,setmanager] = useState({})
    const navigate = useNavigate()
    const loadedData = useLoaderData()
    console.log(loadedData);
    useEffect(()=>{
        axiosSecure.get(`/users/${user?.email}`)
        .then(res=>{
            setmanager(res.data);
        })
    },[axiosSecure,user?.email])
    // console.log(manager);

    const { register, handleSubmit } = useForm();

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

            console.log(res.data.success);
            const productInfo = {
                productName : data?.productName,
                productImage: res.data?.data?.display_url,
                productQuantity : parseFloat(data?.productQuantity),
                productLocation : data?.productLocation,
                productionCost : parseFloat(data?.productionCost),
                profitMargin: parseFloat(data?.profitMargin),
                discount : parseFloat(data?.discount),
                description: data?.description,
                sellingPrice : sellingPrice
            }
            // console.log(productInfo);
            
            axiosSecure.patch(`/products/update/${loadedData?._id}`,productInfo)
            .then(res=>{
                // console.log(res.data);
               if(res?.data?.modifiedCount){
                navigate('/dashboard/products')
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Product Updated successfully",
                    showConfirmButton: false,
                    timer: 1500
                });

               

               }


            })
        }
       
    };

    return (
        <div>

            <div className="mt-10 text-center font-bold text-3xl">
                <h1>Update Product</h1>
            </div>

            <section className="flex justify-center items-center w-full md:w-full shadow-xl rounded-xl p-3 mx-auto bg-slate-100 mt-10">
                <div>
                    <div className="mt-10">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="flex flex-col md:flex-col lg:flex-row gap-6">
                                <div className="form-control">
                                    <label>Product Name</label>
                                    <input 
                                    defaultValue={loadedData?.productName}
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
                                    defaultValue={loadedData?.productQuantity}
                                        type="text"
                                        {...register("productQuantity")}
                                        placeholder="Product Quantity"
                                        className="input mt-2  w-full md:w-[390px] lg:w-[390px]"
                                    />{" "}
                                </div>

                                <div className="form-control">
                                    <label>Product Location</label>
                                    <input
                                    defaultValue={loadedData?.productLocation}
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
                                    defaultValue={loadedData?.productionCost}
                                        type="text"
                                        {...register("productionCost")}
                                        placeholder="Total production cost"
                                        className="input mt-2  w-full md:w-[390px] lg:w-[390px]"
                                    />{" "}
                                </div>

                                <div className="form-control">
                                    <label>Profit Margin(%)</label>
                                    <input
                                    defaultValue={loadedData?.profitMargin}
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
                                    defaultValue={loadedData?.discount}
                                        type="text"
                                        {...register("discount")}
                                        placeholder="Discount"
                                        className="input mt-2  w-full md:w-[390px] lg:w-[390px]"
                                    />{" "}
                                </div>

                                <div className="form-control">
                                    <label>Description</label>
                                    <textarea defaultValue={loadedData?.description} {...register("description")} placeholder="Description" className="textarea textarea-bordered textarea-lg w-full max-w-xs mt-2" ></textarea>
                                </div>
                            </div>


                            <input className="my-7 w-full p-2 text-white font-bold rounded-md bg-cyan-500" type="submit" value="UPDATE PRODUCT" />
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UpdateProduct;