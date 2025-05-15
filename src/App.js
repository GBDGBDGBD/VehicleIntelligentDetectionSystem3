import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Monitor from "./pages/Monitor";
import Violate from "./pages/Violate";
import Username from "./pages/Username";
import History from "./pages/History";
import ViolationDetail from "./pages/ViolationDetail";
import Login from "./pages/Login";

const RequireAuth = ({ children }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

    // 监听 localStorage 的变化（比如登录或登出）
    useEffect(() => {
        const handleStorageChange = () => {
            setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // 也可以在组件内部手动触发刷新，比如登录组件登录成功后调用 setIsLoggedIn(true)

    return (
        <Router basename="/VehicleIntelligentDetectionSystem">
            {isLoggedIn && <Header />}
            <Routes>
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/" element={
                    <RequireAuth><Dashboard /></RequireAuth>
                } />
                <Route path="/monitor" element={
                    <RequireAuth><Monitor /></RequireAuth>
                } />
                <Route path="/history" element={
                    <RequireAuth><History /></RequireAuth>
                } />
                <Route path="/violate" element={
                    <RequireAuth><Violate /></RequireAuth>
                } />
                <Route path="/violate/:id" element={
                    <RequireAuth><ViolationDetail /></RequireAuth>
                } />
                <Route path="/username" element={
                    <RequireAuth><Username /></RequireAuth>
                } />
            </Routes>
        </Router>
    );
};

export default App;
