import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/CommonRoutes/Home/Home";
import SignUp from "../Pages/CommonRoutes/SignUp/SignUp";
import SignIn from "../Pages/CommonRoutes/SignIn/SignIn";
import WatchDemo from "../Pages/CommonRoutes/WatchDemo/WatchDemo";
import CreateStore from "../Pages/CommonRoutes/CreateStore/CreateStore";

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
        
    }
])

export default Routes;