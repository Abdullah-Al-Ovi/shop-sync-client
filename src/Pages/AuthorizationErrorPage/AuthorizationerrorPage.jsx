import React from 'react';
import { FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AuthorizationerrorPage = () => {
    return (
        <div className='flex w-[50%] mx-auto text-center  space-y-5 flex-col h-[70vh] items-center justify-center'>
            <FaLock className=' text-4xl '></FaLock>
            <h1 className='font-medium text-2xl'>Access Denied </h1>
            <p className='text-lg'>You do not have permissions to access this page. Contact an administration to get permissions or go to the other pages.</p>
            <Link to='/'>
                <button className='btn btn-error text-white'>Go Home</button>
            </Link>
        </div>
    );
};

export default AuthorizationerrorPage;