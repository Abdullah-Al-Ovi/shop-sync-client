import { Outlet } from "react-router-dom";
import Drawer from "./Drawer";


const Dashboard = () => {
    return (
        <div className="flex">
            <div className="w-[20%] min-h-screen bg-[#D1A054]">
                <Drawer></Drawer>
            </div>
            <div className="flex-1 m-7">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;