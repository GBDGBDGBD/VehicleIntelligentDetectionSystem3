import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, List, Avatar, Badge, Typography } from 'antd';
import { Line, Pie } from '@ant-design/charts';
import {
    CarOutlined,
    WarningOutlined,
    VideoCameraOutlined,
    RiseOutlined,
    ClockCircleOutlined,
    SyncOutlined
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import './Dashboard.css'; // 自定义样式

const { Title, Text } = Typography;

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [activeCamera, setActiveCamera] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    // 模拟数据
    const coreData = [
        { title: '今日检测总车辆数', value: '3,250', icon: <CarOutlined />, color: '#1890ff' },
        { title: '今日异常车辆数', value: '15', icon: <WarningOutlined />, color: '#ff4d4f' },
        { title: '当前在线摄像头数', value: '12 / 15', icon: <VideoCameraOutlined />, color: '#52c41a' },
        { title: '车辆流量趋势', value: '+5%', icon: <RiseOutlined />, color: '#faad14' },
        { title: '系统响应速度', value: '120ms', icon: <ClockCircleOutlined />, color: '#722ed1' },
        { title: '平均检测耗时', value: '20ms', icon: <CarOutlined />, color: '#4b4453' },
    ];

    // 车流量折线图数据
    const lineData = [
        { time: '00:00', value: 120, type: '小汽车' },
        { time: '01:00', value: 80, type: '小汽车' },
        { time: '02:00', value: 60, type: '小汽车' },
        { time: '03:00', value: 90, type: '小汽车' },
        { time: '04:00', value: 150, type: '小汽车' },
        { time: '00:00', value: 30, type: '货车' },
        { time: '01:00', value: 20, type: '货车' },
        { time: '02:00', value: 15, type: '货车' },
        { time: '03:00', value: 25, type: '货车' },
        { time: '04:00', value: 40, type: '货车' },
    ];

    // 车辆类型占比饼图数据
    const pieData = [
        { type: '小汽车', value: 75 },
        { type: '货车', value: 15 },
        { type: '公交车', value: 5 },
        { type: '特殊车辆', value: 5 },
    ];

    // 违规车辆列表数据
    const [violateData, setViolateData] = useState([
        { id: 1, plate: '粤A12345', type: '小汽车', time: '2023-10-01 12:30', reason: '危险车辆进入', status: '未处理' },
        { id: 2, plate: '粤B67890', type: '货车', time: '2023-10-01 13:00', reason: '超速行驶', status: '已查看' },
        { id: 3, plate: '粤C11223', type: '公交车', time: '2023-10-01 13:30', reason: '违规停车', status: '已处理' },
    ]);

    // 折线图配置
    const lineConfig = {
        data: lineData,
        xField: 'time',
        yField: 'value',
        seriesField: 'type',
        xAxis: { title: { text: '时间' } },
        yAxis: { title: { text: '车辆数' } },
        legend: { position: 'top' },
        smooth: true,
        animation: {
            appear: {
                animation: 'path-in',
                duration: 2000,
            },
        },
    };

    // 饼图配置
    const pieConfig = {
        data: pieData,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: { offset: '-30%', content: '{percentage}' },
        interactions: [{ type: 'element-active' }],
        animation: {
            appear: {
                animation: 'scale-in',
                duration: 1500,
            },
        },
    };

    // 模拟数据刷新
    const refreshData = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            // 模拟数据更新
            const updatedData = [...violateData];
            if (Math.random() > 0.5 && updatedData.length < 6) {
                const newId = Math.floor(Math.random() * 1000);
                updatedData.unshift({
                    id: newId,
                    plate: `粤${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(10000 + Math.random() * 90000)}`,
                    type: ['小汽车', '货车', '公交车'][Math.floor(Math.random() * 3)],
                    time: new Date().toLocaleString(),
                    reason: ['超速行驶', '违规停车', '危险车辆进入'][Math.floor(Math.random() * 3)],
                    status: '未处理'
                });
            }
            setViolateData(updatedData);
        }, 1000);
    };

    // 模拟摄像头激活效果
    const activateCamera = (index) => {
        setActiveCamera(index);
        setTimeout(() => setActiveCamera(null), 2000);
    };

    // 更新时间
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // 模拟初始加载
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="dashboard">
            {/* 顶部标题和时间 */}


            {/* 核心数据卡片 */}
            <Row gutter={[16, 16]} className="core-data">
                {coreData.map((item, index) => (
                    <Col key={index} span={4}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        >
                            <Card
                                style={{
                                    backgroundColor: item.color,
                                    color: '#fff',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                }}
                                hoverable
                            >
                                <motion.div
                                    className="card-content"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                                        style={{ display: 'inline-block' }}
                                    >
                                        {item.icon}
                                    </motion.div>
                                    <h3>{item.title}</h3>
                                    <motion.p
                                        key={item.value}
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring' }}
                                    >
                                        {item.value}
                                    </motion.p>
                                </motion.div>
                            </Card>
                        </motion.div>
                    </Col>
                ))}
            </Row>

            {/* 车流量统计图表 */}
            <Row gutter={[8, 8]} className="charts">
                <Col span={14}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card
                            title="车流量趋势分析"
                            style={{ height: 480, borderRadius: '12px' }}
                            extra={
                                <Button
                                    icon={<SyncOutlined spin={isLoading} />}
                                    onClick={refreshData}
                                    size="small"
                                >
                                    刷新数据
                                </Button>
                            }
                        >
                            {isLoading ? (
                                <div className="loading-placeholder" style={{ height: 330 }} />
                            ) : (
                                <Line {...lineConfig} height={330} />
                            )}
                        </Card>
                    </motion.div>
                </Col>
                <Col span={10}>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Card
                            title="车辆类型占比"
                            style={{ height: 480, borderRadius: '12px' }}
                        >
                            {isLoading ? (
                                <div className="loading-placeholder" style={{ height: 330 }} />
                            ) : (
                                <Pie {...pieConfig} height={330} />
                            )}
                        </Card>
                    </motion.div>
                </Col>
            </Row>

            {/* 实时监控窗口 */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <Card
                    title="实时监控"
                    className="monitor"
                    style={{ borderRadius: '12px' }}
                    extra={
                        <Text type="secondary">最后更新: {currentTime.toLocaleTimeString()}</Text>
                    }
                >
                    <Row gutter={[16, 16]}>
                        {[1, 2, 3, 4].map((item) => (
                            <Col key={item} span={6}>
                                <motion.div
                                    className={`camera-preview ${activeCamera === item ? 'active' : ''}`}
                                    whileHover={{ scale: 1.03 }}
                                    onClick={() => activateCamera(item)}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 * item }}
                                >
                                    <motion.div
                                        animate={{
                                            scale: activeCamera === item ? [1, 1.1, 1] : 1,
                                            boxShadow: activeCamera === item
                                                ? '0 0 15px rgba(24, 144, 255, 0.7)'
                                                : 'none'
                                        }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <VideoCameraOutlined style={{ fontSize: 36 }} />
                                        <p>摄像头 {item}</p>
                                        <div className="camera-status">
                                            <Badge status="success" text="在线" />
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>
                </Card>
            </motion.div>

            {/* 违规车辆提醒 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <Card
                    title="违规车辆提醒"
                    className="violate-list"
                    style={{ borderRadius: '12px' }}
                    extra={
                        <Button
                            type="link"
                            onClick={refreshData}
                            icon={<SyncOutlined spin={isLoading} />}
                        >
                            刷新
                        </Button>
                    }
                >
                    <AnimatePresence>
                        {violateData.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                layout
                            >
                                <List.Item
                                    style={{
                                        borderLeft: `4px solid ${
                                            item.status === '未处理'
                                                ? '#ff4d4f'
                                                : item.status === '已查看'
                                                    ? '#faad14'
                                                    : '#52c41a'
                                        }`,
                                        margin: '8px 0',
                                        borderRadius: '4px',
                                        background: 'rgba(0,0,0,0.02)'
                                    }}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                src={`https://i.pravatar.cc/150?u=${item.id}`}
                                                size="large"
                                            />
                                        }
                                        title={
                                            <motion.div
                                                whileHover={{ x: 5 }}
                                            >
                                                {item.plate}
                                            </motion.div>
                                        }
                                        description={`${item.type} | ${item.time} | ${item.reason}`}
                                    />
                                    <Badge
                                        status={
                                            item.status === '未处理'
                                                ? 'error'
                                                : item.status === '已查看'
                                                    ? 'warning'
                                                    : 'success'
                                        }
                                        text={item.status}
                                    />
                                </List.Item>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </Card>
            </motion.div>

            {/* 快捷操作按钮 */}
            <motion.div
                className="quick-actions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
            >
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button type="primary" icon={<CarOutlined />} size="large">
                        手动上传图片检测
                    </Button>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button type="primary" icon={<VideoCameraOutlined />} size="large">
                        上传视频检测
                    </Button>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button type="primary" icon={<ClockCircleOutlined />} size="large">
                        查询历史记录
                    </Button>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button type="primary" icon={<RiseOutlined />} size="large">
                        系统设置
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Dashboard;