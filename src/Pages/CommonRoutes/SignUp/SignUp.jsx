import { useForm } from "react-hook-form"
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import { authContext } from "../../../Components/AuthProvider/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet";


const SignUp = () => {
    const { createUser, updateUser} = useContext(authContext)
    const [err, setErr] = useState('')
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        const userInfo = {
            name: data.name,
            email : data.email,
            photo : data.link 
        }
        console.log(userInfo);
        
        createUser(data.email,data.password)
        .then(()=>{
           
           updateUser(data.name,data.link)
            .then(()=>{
                
               
                reset()
                axiosPublic.post('/users',userInfo)
                .then(res=>{
                    console.log(res.data);
                    if(res.data.insertedId){
                        Swal.fire({
                            position: "top",
                            icon: "success",
                            title: "Sign up Successfully!",
                            showConfirmButton: false,
                            timer: 1500
                          });
                          navigate('/createStore')
                    }
                })

            })
            .catch(()=>{
                
            })
            
            
           
        })
        .catch(error=>{
            setErr(error.message)
        })
        


    }
    return (
        <section className="bg-white my-7 dark:bg-gray-900">
            <Helmet>
                <title>ShopSync | Sign up</title>
            </Helmet>
            <div className="container flex  justify-center min-h-screen px-6 mx-auto ">
                <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>


                    <div className="flex items-center justify-center">

                        <h2 className="font-semibold text-xl">Sign up to create account </h2>
                    </div>

                    <div className="relative flex items-center mt-8">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>

                        <div className="flex flex-col w-full">
                        <input type="text" {...register("name",{required:true})} className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Username" />
                        {errors.name && <p className="text-xs text-red-500">Name is required</p>}
                        </div>

                    </div>

                    <div className="relative flex items-center mt-6">
                        <span className="absolute ml-5">
                            <i className="fa-regular fa-image"></i>
                        </span>

                        <input type="text" {...register("link")}  className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Photo URL" />
                    </div>

                    <div className="relative flex items-center mt-6">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </span>

                       <div className="flex flex-col w-full">
                       <input type="email" {...register("email",{required:true})}  className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address"  />
                        {errors.email && <p className="text-xs text-red-500">Email is required</p>}
                       </div>

                    </div>

                    <div className="relative flex items-center mt-4">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </span>

                        <div className="flex flex-col w-full">
                        <input type="password" {...register("password", { required: true,minLength:6,pattern:/^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/ })} className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" />
                        {errors.password?.type ==='required' && <p className="text-xs text-red-500">Password is required</p>}
                        {errors.password?.type ==='minLength' && <p className="text-xs text-red-500">Password must be at least 6 characters long</p>}
                        {errors.password?.type ==='pattern' && <p className="text-xs text-red-500">Password must contain at least one capital letter and one special character(@$!%*?&)</p>}
                        
                        </div>

                    </div>


                    <div className="mt-3">
                        {
                            err && <p className="text-red-500 font-semibold mb-3">{err}</p>
                        }
                        <button type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                            Sign Up
                        </button>


                        <div className="mt-6 text-center">
                            <span className="ml-2 text-lg">
                                Already have an account?<Link className='text-blue-400 font-semibold ml-2 hover:underline' to='/sign-in'>Sign in</Link>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default SignUp;