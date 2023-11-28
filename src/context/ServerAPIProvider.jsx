import { createContext, useCallback, useState } from 'react';

export const ServerAPIContext = createContext();

export const ServerAPIProvider = ({ children }) => {
    const initialServerAPI = localStorage.getItem('NaverKinBotAdminPanel_ServerAPI') || process.env.REACT_APP_SERVER_API;

    const [serverAPI, setServerAPI] = useState(initialServerAPI);

    const updateServerAPI = useCallback((newAPI) => {
        setServerAPI(newAPI);
        localStorage.setItem('NaverKinBotAdminPanel_ServerAPI', newAPI);
    }, []);

    return (
        <ServerAPIContext.Provider value={[serverAPI, updateServerAPI]}>
            {children}
        </ServerAPIContext.Provider>
    );
};