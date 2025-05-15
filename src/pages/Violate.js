import React, { useState } from 'react';
import { Layout, Table, Button, Input, Select, Modal, Tag } from 'antd';
import {SearchOutlined, FileExcelOutlined, FilePdfOutlined, CameraOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Violate.css';
import Car1 from "../assets/车1.png"
import Car2 from "../assets/车2.png"
import Car3 from "../assets/车3.png"


import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";



const { Header, Content, Sider } = Layout;
const { Option } = Select;

// 导出 PDF 函数


// 模拟数据
const violationData = [
    { id: 1, plate: '粤A12345', type: '超速', time: '2025-03-10 12:30', status: '未处理', location: '长安校区', image: Car1 },
    { id: 2, plate: '粤B67890', type: '非法停车', time: '2025-03-11 14:00', status: '处理中', location: '友谊校区', image: Car2 },
    { id: 3, plate: '粤C11223', type: '禁行区域驶入', time: '2025-03-12 16:20', status: '已处理', location: '国际校区', image: Car3 },
];

const Violate = () => {

    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(violationData);
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [rules, setRules] = useState({
        stream1: [
            { vehicleType: 'car', reason: '违规停泊' },
            { vehicleType: 'van', reason: '违规驶入' }
        ],
        stream2: [
            { vehicleType: 'truck', reason: '违规停泊' },
            { vehicleType: 'car', reason: '违规驶入' }
        ]
    });
    const [newRule, setNewRule] = useState({
        stream1: { vehicleType: 'van', reason: '违规驶入' },
        stream2: { vehicleType: 'car', reason: '违规驶入' }
    });

    const setAlarmRules = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleAddRule = (stream) => {
        setRules({
            ...rules,
            [stream]: [...rules[stream], newRule[stream]]
        });
    };

    const handleDeleteRule = (stream, index) => {
        const updatedRules = [...rules[stream]];
        updatedRules.splice(index, 1);
        setRules({
            ...rules,
            [stream]: updatedRules
        });
    };

    const handleRuleChange = (stream, field, value) => {
        setNewRule({
            ...newRule,
            [stream]: {
                ...newRule[stream],
                [field]: value
            }
        });
    };


    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("违规车辆数据", 14, 10);

        // **确保 autoTable 正常使用**
        autoTable(doc, {
            head: [["车牌号", "违规类型", "检测时间", "处理状态"]],
            body: filteredData.map(({ plate, type, time, status }) => [plate, type, time, status]),
        });

        doc.save("违规车辆数据.pdf");
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredData.map(({ image, ...rest }) => rest));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "违规车辆数据");

        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        saveAs(data, "违规车辆数据.xlsx");
    };
    // 处理搜索
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchText(value);

        if (!value) {
            // 如果搜索框为空，恢复完整数据
            setFilteredData(violationData);
            return;
        }

        // 进行搜索过滤
        const filtered = violationData.filter(item =>
            item.plate.includes(value) || item.type.includes(value)
        );
        setFilteredData(filtered);
    };


    // 处理状态颜色
    const statusColor = {
        "未处理": "red",
        "处理中": "orange",
        "已处理": "green"
    };

    // 处理详情跳转
    const handleViewDetail = (id) => {
        navigate(`/violate/${id}`);
    };

    // 违规车辆表格列配置
    const columns = [
        {
            title: '缩略图',
            dataIndex: 'image',
            render: (img) => <img src={img} alt="车辆" style={{ width: 60 }} />,
        },
        {
            title: '车牌号',
            dataIndex: 'plate',
            sorter: (a, b) => a.plate.localeCompare(b.plate),
        },
        {
            title: '违规类型',
            dataIndex: 'type',
        },
        {
            title: '检测时间',
            dataIndex: 'time',
            sorter: (a, b) => new Date(a.time) - new Date(b.time),
        },
        {
            title: '处理状态',
            dataIndex: 'status',
            render: (status) => <Tag color={statusColor[status]}>{status}</Tag>,
        },
        {
            title: '操作',
            render: (_, record) => (
                <Button type="link" onClick={() => handleViewDetail(record.id)}>查看详情</Button>
            ),
        },
    ];
    // 渲染规则设置模态框
    const renderRulesModal = () => (
        <Modal
            title="视频警报规则设置"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={800}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    关闭
                </Button>
            ]}
        >
            <div className="alarm-rules-container">
                {/* 第一路视频 */}
                <div className="video-rule-section">
                    <h3 className="rule-title">第一路视频警报规则设置</h3>
                    <div className="rule-form">
                        <div className="rule-form-row">
                            <span className="rule-label">视频流地址</span>
                            <span className="rule-value">rtsp://mystream2</span>
                        </div>
                        <div className="rule-form-row">
                            <span className="rule-label">警报车型</span>
                            <Select
                                value={newRule.stream1.vehicleType}
                                onChange={(value) => handleRuleChange('stream1', 'vehicleType', value)}
                                className="rule-select"
                            >
                                <Option value="car">轿车</Option>
                                <Option value="van">面包车</Option>
                                <Option value="truck">卡车</Option>
                                <Option value="bus">公交车</Option>
                            </Select>
                        </div>
                        <div className="rule-form-row">
                            <span className="rule-label">警报原因</span>
                            <Select
                                value={newRule.stream1.reason}
                                onChange={(value) => handleRuleChange('stream1', 'reason', value)}
                                className="rule-select"
                            >
                                <Option value="违规驶入">违规驶入</Option>
                                <Option value="违规停泊">违规停泊</Option>
                                <Option value="超速行驶">超速行驶</Option>
                                <Option value="逆行">逆行</Option>
                            </Select>
                        </div>
                        <Button
                            type="primary"
                            onClick={() => handleAddRule('stream1')}
                            className="add-rule-btn"
                        >
                            确认添加
                        </Button>
                    </div>

                    <h4 className="existing-rules-title">已设置的规则</h4>
                    <Table
                        dataSource={rules.stream1}
                        columns={[
                            {
                                title: '报警车型',
                                dataIndex: 'vehicleType',
                                render: (text) => {
                                    const vehicleNames = {
                                        car: '轿车',
                                        van: '面包车',
                                        truck: '卡车',
                                        bus: '公交车'
                                    };
                                    return vehicleNames[text] || text;
                                }
                            },
                            {
                                title: '警报原因',
                                dataIndex: 'reason'
                            },
                            {
                                title: '操作',
                                render: (_, record, index) => (
                                    <Button
                                        type="link"
                                        danger
                                        onClick={() => handleDeleteRule('stream1', index)}
                                    >
                                        删除该条规则
                                    </Button>
                                )
                            }
                        ]}
                        pagination={false}
                        size="small"
                        rowKey={(record, index) => index}
                    />
                </div>

                {/* 第二路视频 */}
                <div className="video-rule-section">
                    <h3 className="rule-title">第二路视频警报规则设置</h3>
                    <div className="rule-form">
                        <div className="rule-form-row">
                            <span className="rule-label">视频流地址</span>
                            <span className="rule-value">rtsp://mystream3</span>
                        </div>
                        <div className="rule-form-row">
                            <span className="rule-label">警报车型</span>
                            <Select
                                value={newRule.stream2.vehicleType}
                                onChange={(value) => handleRuleChange('stream2', 'vehicleType', value)}
                                className="rule-select"
                            >
                                <Option value="car">轿车</Option>
                                <Option value="van">面包车</Option>
                                <Option value="truck">卡车</Option>
                                <Option value="bus">公交车</Option>
                            </Select>
                        </div>
                        <div className="rule-form-row">
                            <span className="rule-label">警报原因</span>
                            <Select
                                value={newRule.stream2.reason}
                                onChange={(value) => handleRuleChange('stream2', 'reason', value)}
                                className="rule-select"
                            >
                                <Option value="违规驶入">违规驶入</Option>
                                <Option value="违规停泊">违规停泊</Option>
                                <Option value="超速行驶">超速行驶</Option>
                                <Option value="逆行">逆行</Option>
                            </Select>
                        </div>
                        <Button
                            type="primary"
                            onClick={() => handleAddRule('stream2')}
                            className="add-rule-btn"
                        >
                            确认添加
                        </Button>
                    </div>

                    <h4 className="existing-rules-title">已设置的规则</h4>
                    <Table
                        dataSource={rules.stream2}
                        columns={[
                            {
                                title: '报警车型',
                                dataIndex: 'vehicleType',
                                render: (text) => {
                                    const vehicleNames = {
                                        car: '轿车',
                                        van: '面包车',
                                        truck: '卡车',
                                        bus: '公交车'
                                    };
                                    return vehicleNames[text] || text;
                                }
                            },
                            {
                                title: '警报原因',
                                dataIndex: 'reason'
                            },
                            {
                                title: '操作',
                                render: (_, record, index) => (
                                    <Button
                                        type="link"
                                        danger
                                        onClick={() => handleDeleteRule('stream2', index)}
                                    >
                                        删除该条规则
                                    </Button>
                                )
                            }
                        ]}
                        pagination={false}
                        size="small"
                        rowKey={(record, index) => index}
                    />
                </div>
            </div>
        </Modal>
    );

    return (
        <Layout>
            <Header className="header">
                <div className="search-bar">
                    <Input
                        placeholder="输入车牌号/违规类型"
                        value={searchText}
                        onChange={handleSearch}
                        style={{ width: 200, marginRight: 10 }}
                    />
                    <Button icon={<FilePdfOutlined />} className="blue-button" onClick={setAlarmRules}>
                        报警规则设置
                    </Button>
                    <Button icon={<FileExcelOutlined />} className="blue-button" onClick={exportToExcel}>
                        导出Excel
                    </Button>
                    <Button icon={<FilePdfOutlined />} className="blue-button" onClick={exportToPDF}>
                        导出PDF
                    </Button>
                </div>
            </Header>

            <Content className="content">
                <Table columns={columns} dataSource={filteredData} rowKey="id" />
            </Content>
            {renderRulesModal()}
        </Layout>
    );

};

export default Violate;
