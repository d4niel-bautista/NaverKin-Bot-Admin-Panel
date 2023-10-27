import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
    const [token] = useContext(AuthContext);
    return (
        token ? <Outlet /> : <Navigate to={"/login"} />
    );
};

export default PrivateRoutes;