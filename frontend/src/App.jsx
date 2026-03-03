import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return null; // or a custom loader
    if (!user) return <Navigate to="/login" replace />;
    return children;
};

// Add Navbar and Chatbot to authenticated layout
const AuthenticatedLayout = ({ children }) => {
    return (
        <div className="min-h-screen relative flex flex-col">
            <main className="flex-grow">
                {children}
            </main>

        </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <AuthenticatedLayout>
                                    <Profile />
                                </AuthenticatedLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
