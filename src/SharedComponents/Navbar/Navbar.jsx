import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/shopsyncLogo.jpg'
import { useContext } from 'react';
import { authContext } from '../../Components/AuthProvider/AuthProvider';
import useIsAdmin from '../../Hooks/useIsAdmin';
import useIsManager from '../../Hooks/useIsManager';

const Navbar = () => {
    const { user, logOut } = useContext(authContext)
    const navigate = useNavigate()
    const [isAdmin] = useIsAdmin()
    const [isManager] = useIsManager()
    // console.log(user);
    const routes = <>
        <li><NavLink to='/'>Home</NavLink></li>
        {
            isManager || <li><NavLink to='/createStore'>Create Store</NavLink></li>
        }
        <li>
            <a target='_blank' rel='noreferrer' href="https://www.youtube.com/embed/TtdHWBoCU4I?si=g2AuXhGJ3VjoPaEw">Watch Demo</a>
        </li>

        {
            user?.email && isManager && <> <li><NavLink to='/dashboard/managerHome'>Dashboard</NavLink></li></>
        }
        {
            user?.email && isAdmin && <> <li><NavLink to='/dashboard/manageShop'>Dashboard</NavLink></li></>
        }
        {
            !user?.email && <><li><NavLink to='/sign-up'>Sign up</NavLink></li></>
        }


    </>

    const handleSignOut = () => {
        logOut()
            .then(() => {
                navigate('/')
            })
    }

    return (
        <div className="navbar border-[1px] shadow-xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {routes}
                    </ul>
                </div>
                <Link to='/'>
                    <img className='w-[77px]' src={logo} alt="" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {routes}
                </ul>
            </div>
            <div className="navbar-end">
                {user ?
                    <div className="dropdown  dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="User Profile" src={user.photoURL} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-300 rounded-box w-36">
                            <li>
                                <p className="justify-between">
                                    {user?.displayName}

                                </p>
                            </li>

                            <button onClick={handleSignOut}>
                                <li><a>Logout</a></li>
                            </button>
                        </ul>
                    </div>
                    :
                    <NavLink to='/sign-in'><button className='btn'>Sign in</button></NavLink>
                }
            </div>
        </div>
    );

};

export default Navbar;