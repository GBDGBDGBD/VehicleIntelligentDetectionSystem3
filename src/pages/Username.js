import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserIcon from '../assets/user-icon.png'; // 确保路径正确
import './Username.css';

// 定义占位组件（实际项目中应该分别实现这些组件）
const UserManagement = () => (
    <div className="tab-content animate-fadein">
        <h2 className="tab-title">用户管理</h2>
        <div className="settings-grid">
            <SettingCard
                icon="icon-role"
                title="角色分配"
                description="管理系统用户角色"
                action={<button className="manage-btn">管理角色</button>}
            />
            <SettingCard
                icon="icon-account"
                title="账号管理"
                description="管理系统用户账号"
                action={<button className="manage-btn">管理账号</button>}
            />
            <SettingCard
                icon="icon-permission"
                title="权限控制"
                description="配置用户权限"
                action={<button className="manage-btn">配置权限</button>}
            />
            <SettingCard
                icon="icon-log"
                title="登录记录"
                description="查看用户登录历史"
                action={<button className="manage-btn">查看记录</button>}
            />
        </div>
    </div>
);

const DeviceManagement = () => (
    <div className="tab-content animate-fadein">
        <h2 className="tab-title">设备管理</h2>
        <div className="settings-grid">
            <SettingCard
                icon="icon-camera"
                title="摄像头管理"
                description="添加/删除摄像头设备"
                action={<button className="manage-btn">管理设备</button>}
            />
            <SettingCard
                icon="icon-monitor"
                title="状态监控"
                description="查看设备运行状态"
                action={<button className="manage-btn">查看状态</button>}
            />
            <SettingCard
                icon="icon-remote"
                title="远程维护"
                description="远程维护设备"
                action={<button className="manage-btn">远程连接</button>}
            />
        </div>
    </div>
);

const DataManagement = () => (
    <div className="tab-content animate-fadein">
        <h2 className="tab-title">数据管理</h2>
        <div className="settings-grid">
            <SettingCard
                icon="icon-database"
                title="数据库选择"
                description="选择系统数据库"
                action={
                    <select>
                        <option>MySQL</option>
                        <option>PostgreSQL</option>
                        <option>MongoDB</option>
                    </select>
                }
            />
            <SettingCard
                icon="icon-backup"
                title="备份策略"
                description="配置数据备份策略"
                action={<button className="manage-btn">配置策略</button>}
            />
            <SettingCard
                icon="icon-log"
                title="日志查看"
                description="查看系统日志"
                action={<button className="manage-btn">查看日志</button>}
            />
        </div>
    </div>
);

const AlertSettings = () => (
    <div className="tab-content animate-fadein">
        <h2 className="tab-title">告警通知</h2>
        <div className="settings-grid">
            <SettingCard
                icon="icon-rule"
                title="规则设定"
                description="配置告警规则"
                action={<button className="manage-btn">配置规则</button>}
            />
            <SettingCard
                icon="icon-notification"
                title="通知方式"
                description="配置告警通知方式"
                action={
                    <div className="notification-options">
                        <label><input type="checkbox" /> 邮件</label>
                        <label><input type="checkbox" /> 短信</label>
                        <label><input type="checkbox" /> 系统通知</label>
                    </div>
                }
            />
        </div>
    </div>
);

const SystemMaintenance = () => (
    <div className="tab-content animate-fadein">
        <h2 className="tab-title">系统维护</h2>
        <div className="settings-grid">
            <SettingCard
                icon="icon-update"
                title="软件更新"
                description="检查系统更新"
                action={<button className="manage-btn">检查更新</button>}
            />
            <SettingCard
                icon="icon-import"
                title="配置导入/导出"
                description="导入或导出系统配置"
                action={
                    <div className="import-export">
                        <button className="secondary-btn">导入</button>
                        <button className="secondary-btn">导出</button>
                    </div>
                }
            />
            <SettingCard
                icon="icon-api"
                title="API管理"
                description="管理系统API"
                action={<button className="manage-btn">API设置</button>}
            />
        </div>
    </div>
);

const Username = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('system');
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = () => {
        setIsLoggingOut(true);
        setTimeout(() => {
            localStorage.removeItem('isLoggedIn');
            navigate('/login');
        }, 800);
    };

    return (
        <div className="user-settings-container">
            {/* 左侧导航栏 */}
            <div className="settings-sidebar">
                <div className="user-profile-card">
                    <div className="avatar-wrapper">
                        <img src={UserIcon} alt="用户头像" className="user-avatar" />
                        <div className="avatar-hover-effect"></div>
                    </div>
                    <h3 className="username">管理员</h3>
                    <p className="user-role">系统管理员</p>
                </div>

                <nav_user className="settings-nav_user">
                    <button
                        className={`nav_user-item ${activeTab === 'system' ? 'active' : ''}`}
                        onClick={() => setActiveTab('system')}
                    >
                        <i className="icon icon-settings"></i>
                        <span>系统设置</span>
                        <div className="nav_user-item-indicator"></div>
                    </button>

                    <button
                        className={`nav_user-item ${activeTab === 'user' ? 'active' : ''}`}
                        onClick={() => setActiveTab('user')}
                    >
                        <i className="icon icon-users"></i>
                        <span>用户管理</span>
                        <div className="nav_user-item-indicator"></div>
                    </button>

                    <button
                        className={`nav_user-item ${activeTab === 'device' ? 'active' : ''}`}
                        onClick={() => setActiveTab('device')}
                    >
                        <i className="icon icon-device"></i>
                        <span>设备管理</span>
                        <div className="nav_user-item-indicator"></div>
                    </button>

                    <button
                        className={`nav_user-item ${activeTab === 'data' ? 'active' : ''}`}
                        onClick={() => setActiveTab('data')}
                    >
                        <i className="icon icon-data"></i>
                        <span>数据管理</span>
                        <div className="nav_user-item-indicator"></div>
                    </button>

                    <button
                        className={`nav_user-item ${activeTab === 'alert' ? 'active' : ''}`}
                        onClick={() => setActiveTab('alert')}
                    >
                        <i className="icon icon-alert"></i>
                        <span>告警通知</span>
                        <div className="nav_user-item-indicator"></div>
                    </button>

                    <button
                        className={`nav_user-item ${activeTab === 'maintenance' ? 'active' : ''}`}
                        onClick={() => setActiveTab('maintenance')}
                    >
                        <i className="icon icon-maintenance"></i>
                        <span>系统维护</span>
                        <div className="nav_user-item-indicator"></div>
                    </button>
                </nav_user>

                <button
                    className={`logout-btn ${isLoggingOut ? 'logging-out' : ''}`}
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                >
                    {isLoggingOut ? (
                        <span className="logout-spinner"></span>
                    ) : (
                        <>
                            <i className="icon icon-logout"></i>
                            <span>退出登录</span>
                        </>
                    )}
                </button>
            </div>

            {/* 右侧内容区 */}
            <div className="settings-content">
                {activeTab === 'system' && <SystemSettings />}
                {activeTab === 'user' && <UserManagement />}
                {activeTab === 'device' && <DeviceManagement />}
                {activeTab === 'data' && <DataManagement />}
                {activeTab === 'alert' && <AlertSettings />}
                {activeTab === 'maintenance' && <SystemMaintenance />}
            </div>
        </div>
    );
};

// SystemSettings 组件保持不变
const SystemSettings = () => (
    <div className="tab-content animate-fadein">
        <h2 className="tab-title">系统设置</h2>
        <div className="settings-grid">
            <SettingCard
                icon="icon-name"
                title="名称"
                description="设置系统显示名称"
                action={<input type="text" defaultValue="车辆智能检测系统" />}
            />
            <SettingCard
                icon="icon-language"
                title="语言"
                description="设置系统显示语言"
                action={
                    <select>
                        <option>简体中文</option>
                        <option>English</option>
                    </select>
                }
            />
            <SettingCard
                icon="icon-timezone"
                title="时区"
                description="设置系统时区"
                action={
                    <select>
                        <option>GMT+8 中国标准时间</option>
                        <option>GMT+0 格林威治时间</option>
                    </select>
                }
            />
            <SettingCard
                icon="icon-frequency"
                title="检测频率"
                description="设置车辆检测频率"
                action={
                    <select>
                        <option>实时检测</option>
                        <option>每5分钟</option>
                        <option>每30分钟</option>
                    </select>
                }
            />
            <SettingCard
                icon="icon-theme"
                title="主题模式"
                description="设置系统界面主题"
                action={
                    <div className="theme-switcher">
                        <button className="theme-light">浅色</button>
                        <button className="theme-dark">深色</button>
                    </div>
                }
            />
            <SettingCard
                icon="icon-log"
                title="日志记录"
                description="配置系统日志记录级别"
                action={
                    <select>
                        <option>详细</option>
                        <option>普通</option>
                        <option>最小</option>
                    </select>
                }
            />
        </div>
    </div>
);

const SettingCard = ({ icon, title, description, action }) => (
    <div className="setting-card">
        <div className="setting-card-header">
            <i className={`icon ${icon}`}></i>
            <h3>{title}</h3>
        </div>
        <p className="setting-card-desc">{description}</p>
        <div className="setting-card-action">
            {action}
        </div>
    </div>
);

export default Username;