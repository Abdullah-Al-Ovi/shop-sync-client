import DemoVideo from "./DemoVideo/DemoVideo";

import {  } from 'react-icons/fa';

const WatchDemo = () => {
    
    const demoLink = "https://www.youtube.com/embed/TtdHWBoCU4I?si=g2AuXhGJ3VjoPaEw"
    return (
        <div className="w-[90%] lg:w-[70%] mx-auto p-4">
            <h1 className="text-xl lg:text-3xl text-center my-7 font-medium lg:font-bold ">Watch Our Demo Video below 👇</h1>
            <DemoVideo demoLink={demoLink}></DemoVideo>
        </div>
    );
};

export default WatchDemo;