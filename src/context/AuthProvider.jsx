import { createContext, useEffect, useState } from "react";
import { SERVER } from "../App";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("NaverKinBotAdminPanel"));

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(SERVER + "/is_authenticated", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                },
            });

            if (!response.ok) {
                setToken(null);
            }
            localStorage.setItem("NaverKinBotAdminPanel", token);
        };
        fetchUser();
    }, [token]);

    return (
        <AuthContext.Provider value={[token, setToken]}>
            {children}
        </AuthContext.Provider>
    );
};