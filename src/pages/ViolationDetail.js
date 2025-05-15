import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Descriptions, Tag } from 'antd';
import './Violate.css';
const violationData = [
    { id: 1, plate: '粤A12345', type: '超速', time: '2025-03-10 12:30', status: '未处理', location: '长安校区', image: 'https://via.placeholder.com/300' },
    { id: 2, plate: '粤B67890', type: '非法停车', time: '2025-03-11 14:00', status: '处理中', location: '友谊校区', image: 'https://via.placeholder.com/300' },
];

const ViolationDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const vehicle = violationData.find(item => item.id === Number(id));

    if (!vehicle) return <p>未找到该车辆</p>;

    return (
        <Card title={`🚗 违规车辆详情 - ${vehicle.plate}`}>
            <img src={vehicle.image} alt="车辆证据" style={{ width: '100%', marginBottom: 20 }} />
            <Descriptions bordered column={1}>
                <Descriptions.Item label="车牌号">{vehicle.plate}</Descriptions.Item>
                <Descriptions.Item label="违规类型">{vehicle.type}</Descriptions.Item>
                <Descriptions.Item label="检测时间">{vehicle.time}</Descriptions.Item>
                <Descriptions.Item label="位置">{vehicle.location}</Descriptions.Item>
                <Descriptions.Item label="处理状态">
                    <Tag color={vehicle.status === "未处理" ? "red" : "green"}>{vehicle.status}</Tag>
                </Descriptions.Item>
            </Descriptions>
            <Button type="primary" style={{ marginTop: 20 }} onClick={() => navigate('/violate')}>返回</Button>
        </Card>
    );
};

export default ViolationDetail;
