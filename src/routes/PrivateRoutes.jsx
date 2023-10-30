import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
    const [token, setToken] = useContext(AuthContext);
    return (
        token && token.length > 50 ? <Outlet context={[token, setToken]} /> : <Navigate to={"/login"} />
    );
};

export default PrivateRoutes;