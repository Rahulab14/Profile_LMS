import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            if (token) {
                localStorage.setItem('token', token);
                try {
                    const response = await api.get('/profile/me');
                    setUser(response.data);
                } catch (error) {
                    console.error("Token invalid or expired", error);
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
                }
            } else {
                localStorage.removeItem('token');
                setUser(null);
            }
            setLoading(false);
        };
        verifyUser();
    }, [token]);

    const login = async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        const { token: newToken, user: userData } = response.data;
        setToken(newToken);
        setUser(userData);
        return response.data;
    };

    const register = async (name, email, password) => {
        const response = await api.post('/auth/register', { name, email, password });
        // After successful registration, login the user directly
        return login(email, password);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
