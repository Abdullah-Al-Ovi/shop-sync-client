import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../SharedComponents/Navbar/Navbar";
import { useEffect } from "react";
import Footer from "../SharedComponents/Footer/Footer";


const Root = () => {
    const location = useLocation()
  const avoidNavFoot = location?.pathname === '/sign-in' || location?.pathname === '/sign-up' || location?.pathname === '/authorizationError'

  useEffect(()=>{
    window.scrollTo(0,0)
},[location.pathname])

    return (
        <div>
            {avoidNavFoot || <Navbar></Navbar>}
            <Outlet></Outlet>
            {avoidNavFoot || <Footer></Footer>}
        </div>
    );
};

export default Root;