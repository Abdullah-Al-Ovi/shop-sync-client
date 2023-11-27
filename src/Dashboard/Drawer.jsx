import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../Components/AuthProvider/AuthProvider";
import useIsManager from "../Hooks/useIsManager";
import useIsAdmin from "../Hooks/useIsAdmin";
import logo from '../assets/shopsyncLogo-removebg-preview.png'
import { FaSignOutAlt } from "react-icons/fa";


const Drawer = () => {
    const [isAdmin] = useIsAdmin()
    const [isManager] = useIsManager()
    const { logOut } = useContext(authContext)
    const navigate = useNavigate()
    // console.log(isAdmin);
    const handleSignOut = () => {
        logOut()
            .then(() => {
                navigate('/')
            })
    }
    return (
        <div className="p-4">
            <div  className="my-10 " >
                <img className="w-[100px] mx-auto"  src={logo} alt="" />
            </div>
            <ul className="space-y-3 font-medium">
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
                        <li><NavLink style={({ isActive }) => {
                            return { color: isActive ? 'white' : '' }
                        }} to='/dashboard/managerHome'>Shop</NavLink></li>
                        <li><NavLink style={({ isActive }) => {
                            return { color: isActive ? 'white' : '' }
                        }} to='/dashboard/addProduct'>Add Product</NavLink></li>
                        <li><NavLink style={({ isActive }) => {
                            return { color: isActive ? 'white' : '' }
                        }} to='/dashboard/products'>Products</NavLink></li>
                        <li><NavLink style={({ isActive }) => {
                            return { color: isActive ? 'white' : '' }
                        }} to='/dashboard/sales'>Sales</NavLink></li>
                        <li><NavLink to='/dashboard/cart' style={({ isActive }) => {
                            return { color: isActive ? 'white' : '' }
                        }} >Check Out</NavLink></li>
                        <li><NavLink style={({ isActive }) => {
                            return { color: isActive ? 'white' : '' }
                        }} to='/dashboard/subscription'>Payment & Subscription</NavLink></li>
                        <li><NavLink style={({ isActive }) => {
                            return { color: isActive ? 'white' : '' }
                        }} to='/dashboard/salesSummary'>Sales summary</NavLink></li>
                    </>
                }

                <div className="divider font-bold"></div>

                {/* common  */}
                <li><NavLink to='/'>Home</NavLink></li>
                <button className="flex items-center gap-1" onClick={handleSignOut}>
                    <FaSignOutAlt></FaSignOutAlt>
                    <li><a>Logout</a></li>
                </button>

            </ul>
        </div>
    );
};

export default Drawer;