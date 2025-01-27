import React, { useContext } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';
import { Navigate } from 'react-router-dom';
import useIsManager from '../../Hooks/useIsManager';
import useIsBanned from '../../Hooks/useIsBanned';

const ManagerPrivateRoute = ({ children }) => {
    const { user, loading } = useContext(authContext);
    const [isBanned, isBannedLoading] = useIsBanned();
    const [isManager, isManagerLoading] = useIsManager();

    // Debugging output
    console.log("isManager:", isManager, "isBanned:", isBanned);

    if (loading || isManagerLoading || isBannedLoading) {
        return <div className="h-[60vh] flex items-center justify-center"><span className="loading loading-dots loading-lg"></span></div>;
    }

    if (user && !isManager) {
        return <Navigate to='/authorizationError' />;
    } else if (user && isManager && !isBanned) {
        return children;
    } else if (user && isBanned) {
        return <Navigate to='/bannedShop' />;
    }
    
    return <Navigate to='/' />;
};

export default ManagerPrivateRoute;
