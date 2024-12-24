

import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';


import Loading from './Loading';
import { AuthContext } from './AuthProvider';


const PrivateRoutes = ({children}) => {
    const {user, loading} =useContext(AuthContext);
    const location = useLocation()
    if(loading){
        return <Loading></Loading>
    }
    if(user && user?.email){
        return children
    }
    return (
        <div>
            <Navigate state={location.pathname} to={'/login'}></Navigate>
        </div>
    );
};

export default PrivateRoutes;