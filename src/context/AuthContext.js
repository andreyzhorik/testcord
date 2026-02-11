import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('notcord_user');
        if (saved) return JSON.parse(saved);
        
        return {
            id: Math.random().toString(36).substr(2, 9),
            name: `User${Math.floor(Math.random() * 9000) + 1000}`,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
            color: '#5865f2'
        };
    });

    useEffect(() => {
        localStorage.setItem('notcord_user', JSON.stringify(user));
    }, [user]);

    const updateUser = (data) => setUser(prev => ({ ...prev, ...data }));

    return (
        <AuthContext.Provider value={{ user, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
