import { FaEnvelope } from "react-icons/fa";
import useAllUsers from "../../../Hooks/useAllUsers";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const ManageUsers = () => {

    const [allUsers] = useAllUsers()
    const axiosSecure = useAxiosSecure()
    
    const handleSendMail = (e, userId) => {
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
             document.getElementById(`my_modal_${userId}`).close()
  
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
        <h3 className="text-3xl font-medium my-5">List of All users</h3>
        <div>
          <table className="w-full ">
            <thead className="bg-gray-300 text-black">
              <tr>
                <th className="border-2 p-2">Name</th>
               
                <th className="border-2 p-2">Email</th>
                <th className="border-2 p-2">Shop</th>
                <th className="border-2 p-2">user</th>
                <th className="border-2 p-2">Role</th>
                <th className="border-2 p-2">Send Notice</th>
              </tr>
            </thead>
            <tbody>
              {allUsers?.map((user, index) => (
                <tr key={user?._id} className={`border-b text-center ${index === user?.length - 1 ? '' : 'border-gray-300'}`}>
                  <td className="p-2">{user?.name}</td>
                  <td className="flex justify-center p-2">
                    <img className="w-[70px]" src={user?.userLogo} alt="" />
                  </td>
                  <td className="p-2">{user?.email}</td>
                  <td className="p-2">{user?.shopName}</td>
                  <td className="p-2">{user?.role}</td>
                  <td className="flex justify-center text-xl">
                   {
                    !user?.role &&  <button onClick={() => document.getElementById(`my_modal_${user?._id}`).showModal()}>
                    <FaEnvelope></FaEnvelope>
                  </button>
                   }
                  </td>
  
                  <dialog id={`my_modal_${user?._id}`} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                      <h3 className="font-medium text-lg">Send promotional email!</h3>
                      <form onSubmit={(e) => handleSendMail(e, user?._id)} className="flex flex-col text-start space-y-3">
                        <label className="font-medium" htmlFor="">To: </label>
                        <input readOnly className="border-2 w-[60%] p-1 rounded mx-2" value={user?.email} type="text" name="recipient" id="" />
                        <label className="font-medium" htmlFor="">Subject:</label>
                        <input className="border-2 mx-2 p-1 rounded w-[60%]" placeholder="" type="text" name="subject" />
                        <label className="font-medium" htmlFor="">Message:</label>
                        <textarea className="border-2 p-1" name="body" id="" cols="40" rows="5"></textarea>
                        <input className="btn" type="submit" value="Send mail" />
                      </form>
                      <div className="modal-action w-full">
                       
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

export default ManageUsers;