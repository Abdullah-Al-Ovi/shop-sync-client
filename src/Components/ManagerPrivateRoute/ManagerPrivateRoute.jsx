import React, { useContext } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';
import { Navigate } from 'react-router-dom';
import useIsManager from '../../Hooks/useIsManager';

const ManagerPrivateRoute = ({children}) => {
    const {user,loading}=useContext(authContext)
    const[isManager,isManagerLoading]= useIsManager()
    if(loading || isManagerLoading){
        return <div className="h-[60vh] flex items-center justify-center"><span className="loading loading-dots loading-lg"></span></div>
    }
    if(user && !isManager){
        return <Navigate to='/authorizationError'></Navigate>
    }
    else if(user && isManager){
        return children
    }
    return <Navigate to='/'></Navigate>

};

export default ManagerPrivateRoute;