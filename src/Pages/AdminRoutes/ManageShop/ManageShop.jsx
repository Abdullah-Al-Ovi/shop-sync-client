import { FaEnvelope } from "react-icons/fa";
import useAllShop from "../../../Hooks/useAllShop";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const ManageShop = () => {
    const [allShop] = useAllShop();
    const axiosSecure = useAxiosSecure();
  
    const handleSendMail = (e, shopId) => {
      e.preventDefault();
      const form = e.target;
      const to = form.recipient.value;
      const subject = form.subject.value;
      const text = form.body.value;
      const emailInfo = {
        to,
        subject,
        text,
      };
  
      axiosSecure.post('/send-email', emailInfo)
        .then((res) => {
          console.log(res.data);
          if(res.data){
           document.getElementById(`my_modal_${shopId}`).close()

            Swal.fire({
                position: "top",
                icon: "success",
                title: "Email sent successfully",
                showConfirmButton: false,
                timer: 1500
            });
          }
          else{
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Something went wrong.Try again",
                showConfirmButton: false,
                timer: 1500
            });
          }
        });
    };
  
    return (
      <div>
        <h3 className="text-3xl font-medium my-5">List of All Shops</h3>
        <div>
          <table className="w-full ">
            <thead className="bg-gray-300 text-black">
              <tr>
                <th className="border-2 p-2">Name</th>
                <th className="border-2 p-2"></th>
                <th className="border-2 p-2">Highest Limit</th>
                <th className="border-2 p-2">Current Limit</th>
                <th className="border-2 p-2">Description</th>
                <th className="border-2 p-2">Send Notice</th>
              </tr>
            </thead>
            <tbody>
              {allShop?.map((shop, index) => (
                <tr key={shop?._id} className={`border-b text-center ${index === shop?.length - 1 ? '' : 'border-gray-300'}`}>
                  <td className="p-2">{shop?.shopName}</td>
                  <td className="flex justify-center p-2">
                    <img className="w-[70px]" src={shop?.shopLogo} alt="" />
                  </td>
                  <td className="p-2">{shop?.highestLimit}</td>
                  <td className="p-2">{shop?.limit}</td>
                  <td className="p-2">{shop?.description}</td>
                  <td className="flex justify-center text-xl ">
                    <button onClick={() => document.getElementById(`my_modal_${shop?._id}`).showModal()}>
                      <FaEnvelope></FaEnvelope>
                    </button>
                  </td>
  
                  <dialog id={`my_modal_${shop?._id}`} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                      <h3 className="font-medium text-lg">Send mail to shop!</h3>
                      <form onSubmit={(e) => handleSendMail(e, shop?._id)} className="flex flex-col text-start space-y-3">
                        <label className="font-medium" htmlFor="">To: </label>
                        <input readOnly className="border-2 w-[60%] p-1 rounded mx-2" value={shop?.ownerEmail} type="text" name="recipient" id="" />
                        <label className="font-medium" htmlFor="">Subject:</label>
                        <input className="border-2 mx-2 p-1 rounded w-[60%]" placeholder="" type="text" name="subject" />
                        <label className="font-medium" htmlFor="">Message:</label>
                        <textarea className="border-2 p-1" name="body" id="" cols="40" rows="5"></textarea>
                        <input className="btn" type="submit" value="Send mail" />
                      </form>
                      <div className="modal-action w-full">
                        <form className="w-full" method="dialog">
                          {/* <button className="btn">Close</button> */}
                          
                        </form>
                      </div>
                    </div>
                  </dialog>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default ManageShop;