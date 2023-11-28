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
import Products from "../Pages/ManagerRoutes/Products/Products";
import Sales from "../Pages/ManagerRoutes/Sales/Sales";
import UpdateProduct from "../Pages/ManagerRoutes/Products/UpdateProduct";
import CheckOut from "../Pages/ManagerRoutes/CheckOut/CheckOut";
import SalesSummary from "../Pages/ManagerRoutes/SalesSummary/SalesSummary";
import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";
import AdminHome from "../Pages/AdminRoutes/AdminHome/AdminHome";
import AdminPrivateRoute from "../Components/AdminPrivateRoute/AdminPrivateRoute";
import AuthorizationerrorPage from "../Pages/AuthorizationErrorPage/AuthorizationerrorPage";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import ManagerPrivateRoute from "../Components/ManagerPrivateRoute/ManagerPrivateRoute";
import AdManPrivateRoute from "../Components/AdManPrivateRoute/AdManPrivateRoute";

const Routes = createBrowserRouter([
    {
        path:'/',
        element:<Root></Root>,
        errorElement:<ErrorPage></ErrorPage>,
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
                element:<PrivateRoute><CreateStore></CreateStore></PrivateRoute>
            },
            {
                path:'/authorizationError',
                element:<AuthorizationerrorPage></AuthorizationerrorPage>
            }
            
        ]
        
    },
    {
        path:'dashboard',
        element:<AdManPrivateRoute><Dashboard></Dashboard></AdManPrivateRoute>,
        children:[
            {
                path:'managerHome',
                element:<ManagerPrivateRoute><ManagerHome></ManagerHome></ManagerPrivateRoute>
            },
            {
                path:'addProduct',
                element:<ManagerPrivateRoute><AddProduct></AddProduct></ManagerPrivateRoute>
            },
            {
                path:'products',
                element:<ManagerPrivateRoute><Products></Products></ManagerPrivateRoute>
            },
            {
                path:'sales',
                element:<ManagerPrivateRoute><Sales></Sales></ManagerPrivateRoute>
            },
            {
                path:'updateProduct/:id',
                element:<ManagerPrivateRoute><UpdateProduct></UpdateProduct></ManagerPrivateRoute>,
                loader:({params})=>fetch(`http://localhost:5001/products/update/${params.id}`)
            },
            {
                path:'checkOut',
                element:<ManagerPrivateRoute><CheckOut></CheckOut></ManagerPrivateRoute>
            },
            {
                path:'salesSummary',
                element:<ManagerPrivateRoute><SalesSummary></SalesSummary></ManagerPrivateRoute>
            },
            // Admin Routes
            {
                path:'adminHome',
                element:<AdminPrivateRoute><AdminHome></AdminHome></AdminPrivateRoute>
            }
        ]
    }
])

export default Routes;