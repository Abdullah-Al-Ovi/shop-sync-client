import React from 'react';

const BannedShop = () => {
    return (
        <div className='h-[50vh] flex justify-center text-center text-red-600 items-center'>
            <div>
            <h1 className='text-3xl font-semibold' >You are banned for violating our terms & conditions.</h1>
            <h1 className='text-3xl font-semibold'>If you have any query contact admin panel.</h1>
            </div>
        </div>
    );
};

export default BannedShop;