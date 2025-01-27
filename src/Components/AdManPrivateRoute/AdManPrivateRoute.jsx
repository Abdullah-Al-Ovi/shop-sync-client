import { useContext } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';
import useIsAdmin from '../../Hooks/useIsAdmin';
import { Navigate } from 'react-router-dom';
import useIsManager from '../../Hooks/useIsManager';

const AdManPrivateRoute = ({children}) => {
    const {user,loading}=useContext(authContext)
    const[isAdmin,isAdminLoading]= useIsAdmin()
    const[isManager,isManagerLoading]= useIsManager()
    console.log("isAdmin:",isAdmin,"isManager:",isManager)
    if(loading || isAdminLoading || isManagerLoading){
        return <div className="h-[60vh] flex items-center justify-center"><span className="loading loading-dots loading-lg"></span></div>
    }
    if(user && !isAdmin && !isManager){
        return <Navigate to='/authorizationError'></Navigate>
    }
    else if(user && (isAdmin || isManager)){
        return children
    }
    return <Navigate to='/'></Navigate>

};

export default AdManPrivateRoute;