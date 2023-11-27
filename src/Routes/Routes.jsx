import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/CommonRoutes/Home/Home";
import SignUp from "../Pages/CommonRoutes/SignUp/SignUp";
import SignIn from "../Pages/CommonRoutes/SignIn/SignIn";
import WatchDemo from "../Pages/CommonRoutes/WatchDemo/WatchDemo";
import CreateStore from "../Pages/CommonRoutes/CreateStore/CreateStore";
import Dashboard from "../Dashboard/Dashboard";
import ManagerHome from "../Pages/ManagerRoutes/ManagerHome/ManagerHome";
import AddProduct from "../Pages/ManagerRoutes/AddProduct/AddProduct";

const Routes = createBrowserRouter([
    {
        path:'/',
        element:<Root></Root>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/sign-up',
                element:<SignUp></SignUp>
            },
            {
                path:'sign-in',
                element:<SignIn></SignIn>
            },
            {
                path:'watchDemo',
                element:<WatchDemo></WatchDemo>
            },
            {
                path:'/createStore',
                element:<CreateStore></CreateStore>
            }
        ]
        
    },
    {
        path:'/dashboard',
        element:<Dashboard></Dashboard>,
        children:[
            {
                path:'managerHome',
                element:<ManagerHome></ManagerHome>
            },
            {
                path:'addProduct',
                element:<AddProduct></AddProduct>
            }
        ]
    }
])

export default Routes;