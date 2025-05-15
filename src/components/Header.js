import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import UserIcon from '../assets/user-icon.png';
import '../index.css'
import './Header.css'

const Header = () => {
    return (
        <header className="header">
            <nav className="nav">
                <div className="nav-top">
                    <img src={Logo} alt="Logo" className="logo" />
                    <h1 className="system-title">车辆智能检测系统</h1>
                </div>
                <ul className="nav-list">
                    <li className="nav-item"><Link to="/">仪表盘</Link></li>
                    <li className="nav-item"><Link to="/monitor">实时监控</Link></li>
                    <li className="nav-item"><Link to="/history">历史数据</Link></li>
                    <li className="nav-item"><Link to="/violate">违规车辆管理</Link></li>
                    <li className="nav-item user-icon-container">
                        <Link to="/username" className="user-link">
                            <div className="user-avatar-wrapper">
                                <img src={UserIcon} alt="用户头像" className="user-icon" />
                            </div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;