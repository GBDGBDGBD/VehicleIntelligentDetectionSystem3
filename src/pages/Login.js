import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // 引入样式文件

const Login = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setIsAnimating(true);

        setTimeout(() => {
            if (username === 'admin' && password === '123456') {
                localStorage.setItem('isLoggedIn', 'true');
                setIsLoggedIn(true);
                navigate('/');
            } else {
                alert('账号或密码错误');
                setIsAnimating(false);
            }
        }, 1000);
    };

    return (
        <div className="login-container">
            <div className="login-background">
                <div className="tech-line line1"></div>
                <div className="tech-line line2"></div>
                <div className="tech-line line3"></div>
                <div className="tech-grid"></div>
                <div className="tech-dots"></div>
                {/* 新增数据点层 */}
            </div>

            <form className={`login-form ${isAnimating ? 'animating' : ''}`} onSubmit={handleLogin}>
                <h2>车辆智能检测系统</h2>
                <p>欢迎登录管理后台</p>

                <div className="input-group">
                    <input
                        type="text"
                        placeholder="用户名"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <span className="input-icon">👤</span>
                </div>

                <div className="input-group">
                    <input
                        type="password"
                        placeholder="密码"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span className="input-icon">🔒</span>
                </div>

                <button type="submit" className="login-button">
                    {isAnimating ? (
                        <span className="spinner"></span>
                    ) : (
                        '登 录'
                    )}
                </button>

                <div className="login-footer">
                    <a href="#forgot">忘记密码?</a>
                    <span>|</span>
                    <a href="#register">注册账号</a>
                </div>
            </form>
        </div>
    );
};

export default Login;