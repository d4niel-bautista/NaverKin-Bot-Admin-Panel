import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { ServerAPIContext } from '../context/ServerAPIProvider'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
    const [token, setToken] = useContext(AuthContext);
    const [serverAPI, updateServerAPI] = useContext(ServerAPIContext);

    return (
        token && token.length > 50 ? <Outlet context={[token, setToken, serverAPI, updateServerAPI]} /> : <Navigate to={"/login"} />
    );
};

export default PrivateRoutes;