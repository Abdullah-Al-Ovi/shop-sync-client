
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { authContext } from "../../../Components/AuthProvider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const CreateStore = () => {

  const {user} = useContext(authContext)
  const axiosSecure = useAxiosSecure()

  const { register, handleSubmit,reset } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    const shopInfo = {
        shopName : data.shopName,
        shopInfo: data?.shopInfo,
        shopLocation: data?.shopLocation,
        shopLogo: data?.shopLogo,
        ownerEmail : user?.email,
        ownerName : user?.displayName,
        productsCount : 0

    }
    console.log(shopInfo);
    axiosSecure.post('/createShop',shopInfo)
    .then(res=>{
        console.log(res.data);
        if(res?.data?.insertedId){
            const updatedUserInfo = {
                shopName:shopInfo.shopName,
                shopLogo:shopInfo.shopLogo,
                shopId: res?.data?.insertedId,
            }
            axiosSecure.patch(`/users/${user?.email}`,updatedUserInfo)
            .then(res=>{
                console.log(res.data);
                Swal.fire({
                  position: "top",
                  icon: "success",
                  title: "Shop Created successful",
                  showConfirmButton: false,
                  timer: 1500
              });
            })
        }
        else{
          Swal.fire({
            position: "top",
            icon: "error",
            title: "You have Already Created a Shop",
            showConfirmButton: false,
            timer: 1500
        });
        }
    })

  };

  return (
    <div>
      <Helmet>
        <title>ShopSync | Create Store</title>
      </Helmet>

      <div className="my-7 text-center font-bold text-3xl">
        <h1>Create Your Shop</h1>
      </div>

      <section className="flex justify-center items-center w-full md:w-full shadow-xl rounded-xl p-3 mx-auto bg-slate-100 mt-10">
        <div>
          <div className="mt-10">
            <form onSubmit={handleSubmit(onSubmit)}>


              <div className="flex flex-col md:flex-col lg:flex-row gap-6">
                <div className="form-control">
                  <label>Shop Name</label>
                  <input
                    type="text"
                    {...register("shopName")}
                    placeholder="Enter your shop name"
                    className="input mt-2  w-full md:w-[390px] lg:w-[390px]"
                  />{" "}
                </div>

                <div className="form-control">
                  <label>Shop Logo</label>
                  <input
                    type="text"
                    {...register("shopLogo")}
                    placeholder="Enter your shop logo"
                    
                    className="input mt-2  w-full md:w-[390px] lg:w-[390px]"
                  />{" "}
                </div>
              </div>


              <div className="flex flex-col md:flex-col lg:flex-row gap-6 mt-6">
                <div className="form-control">
                  <label>Shop Info</label>
                  {/* <input
                    type="text"
                    {...register("shopInfo")}
                    placeholder="Shop info"
                   
                    className="input mt-2  w-full md:w-[390px] lg:w-[390px]"
                  /> */}
                    <textarea  {...register("shopInfo")} placeholder="Shop Info" className="textarea textarea-bordered textarea-lg w-full max-w-xs mt-2" ></textarea>
                </div>

                <div className="form-control">
                  <label>Shop Location</label>
                  <input
                    type="text"
                    {...register("shopLocation")}
                    placeholder="shopLocation"
                    
                    className="input mt-2  w-full md:w-[390px] lg:w-[390px]"
                  />{" "}
                </div>
              </div>

              <div className="flex flex-col md:flex-col lg:flex-row gap-6 mt-6">

              <div className="form-control">
                  <label>Your Name</label>
                  <input
                    type="text"
                    {...register("ownerName")}
                    placeholder="Your name"
                    defaultValue={user?.displayName}
                    readOnly
                    className="input mt-2  w-full md:w-[390px] lg:w-[390px]"
                  />
                </div>

                <div className="form-control">
                  <label>Your Email</label>
                  <input
                    type="email"
                    {...register("ownerEmail")}
                    placeholder="Your email"
                    defaultValue={user?.email}
                    readOnly
                    className="input mt-2  w-full md:w-[390px] lg:w-[390px]"
                  />{" "}
                </div>

              </div>

              
              <input className="my-7 w-full p-2 text-white font-bold rounded-md bg-cyan-500" type="submit" value="Create Store" />

            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateStore;