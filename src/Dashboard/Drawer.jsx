import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../Components/AuthProvider/AuthProvider";
import useIsManager from "../Hooks/useIsManager";
import useIsAdmin from "../Hooks/useIsAdmin";


const Drawer = () => {
    const [isAdmin] = useIsAdmin()
    const [isManager] = useIsManager()
    const { logOut } = useContext(authContext)
    const navigate = useNavigate()
    console.log(isAdmin);
    const handleSignOut = () => {
        logOut()
            .then(() => {
                navigate('/')
            })
    }
    return (
        <div>
            <ul>

                {
                    isAdmin && <>
                        <li><NavLink to='/dashboard/adminHome' style={({ isActive }) => {
                            return { color: isActive ? 'white' : '' }
                        }}>Manage Shop</NavLink></li>
                        <li><NavLink to='/dashboard/addItems' style={({ isActive }) => {
                            return { color: isActive ? 'white' : '' }
                        }}>Sales summary</NavLink></li>
                        <li><NavLink to='/dashboard/manageItems' style={({ isActive }) => {
                            return { color: isActive ? 'white' : '' }
                        }}>MANAGE ITEMS</NavLink></li>
                        <li><NavLink to='/dashboard/manageBookings' style={({ isActive }) => {
                            return { color: isActive ? 'white' : '' }
                        }} >MANAGE BOOKINGS</NavLink></li>

                        <li><NavLink to='/dashboard/allUsers' style={({ isActive }) => {
                            return { color: isActive ? 'white' : '' }
                        }}>ALL USERS</NavLink></li>
                    </>
                }
                {
                    isManager && <>
                        <li><NavLink to=''>Product Management</NavLink></li>
                        <li><NavLink to=''>Sales Collection</NavLink></li>
                        <li><NavLink to=''>Offer & Coupon </NavLink></li>
                        <li><NavLink to='/dashboard/cart' style={({ isActive }) => {
                            return { color: isActive ? 'white' : '' }
                        }} >MY CART</NavLink></li>
                        <li><NavLink to=''>Payment & Subscription</NavLink></li>
                        <li><NavLink to=''>Sales summary</NavLink></li>
                    </>
                }
                        
                

                {/* common  */}
                <li><NavLink to='/'>Home</NavLink></li>
                <button onClick={handleSignOut}>
                    <li><a>Logout</a></li>
                </button>

            </ul>
        </div>
    );
};

export default Drawer;