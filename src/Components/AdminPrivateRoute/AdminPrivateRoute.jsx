import { useContext } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';
import useIsAdmin from '../../Hooks/useIsAdmin';
import { Navigate } from 'react-router-dom';

const AdminPrivateRoute = ({children}) => {
    const {user,loading}=useContext(authContext)
    const[isAdmin,isAdminLoading]= useIsAdmin()
    if(loading || isAdminLoading){
        return <div className="h-[60vh] flex items-center justify-center"><span className="loading loading-dots loading-lg"></span></div>
    }
    if(user && !isAdmin){
        return <Navigate to='/authorizationError'></Navigate>
    }
    else if(user && isAdmin){
        return children
    }
    return <Navigate to='/'></Navigate>

};

export default AdminPrivateRoute;