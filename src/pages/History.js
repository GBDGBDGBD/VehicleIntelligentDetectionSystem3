import React, { useState } from 'react';
import { Layout, Card, Button, Row, Col, List, DatePicker, Select } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { Pie } from '@ant-design/charts'; // 引入饼图组件
import moment from 'moment'; // 引入 moment 库
import './History.css'; // 自定义样式
import { Line } from '@ant-design/charts';
const { Header, Content } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;

const History = () => {
    const [selectedDate, setSelectedDate] = useState(moment('2025-03-06')); // 使用 moment 对象
    const [selectedRange, setSelectedRange] = useState([
        moment('2024-02-14'),
        moment('2024-02-28'),
    ]); // 使用 moment 对象

    // 模拟数据
    const vehicleStats = [
        { type: 'bus', count: 15 },
        { type: 'van', count: 352 },
        { type: 'truck', count: 85 },
        { type: 'car', count: 3250 },
    ];

    const vehicleData = [
        { date: '2024-02-14', bus: 45, van: 20, truck: 15, car: 100 },
        { date: '2024-02-15', bus: 32, van: 15, truck: 18, car: 120 },
        { date: '2024-02-16', bus: 49, van: 40, truck: 40, car: 150 },
        { date: '2024-02-17', bus: 22, van: 35, truck: 32, car: 180 },
        { date: '2024-02-18', bus: 99, van: 20, truck: 25, car: 200 },
        { date: '2024-02-19', bus: 122, van: 45, truck: 18, car: 222 },
        { date: '2024-02-20', bus: 57, van: 30, truck: 20, car: 250 },
        { date: '2024-02-21', bus: 88, van: 55, truck: 22, car: 111 },
        { date: '2024-02-22', bus: 77, van: 20, truck: 25, car: 160 },
        { date: '2024-02-23', bus: 60, van: 55, truck: 28, car: 120 },
        { date: '2024-02-24', bus: 43, van: 80, truck: 30, car: 50 },
        { date: '2024-02-25', bus: 38, van: 22, truck: 32, car: 180 },
        { date: '2024-02-26', bus: 40, van: 33, truck: 35, car: 40 },
        { date: '2024-02-27', bus: 42, van: 45, truck: 38, car: 42 },
        { date: '2024-02-28', bus: 45, van: 54, truck: 40, car: 45 },
    ];

    const anomalies = [
        '1月2日上午12点30分15秒 一辆重卡进入长安校区……',
        '1月3日下午3点45分20秒 一辆货车超速……',
        '1月4日晚上8点15分10秒 一辆小汽车违规停车……',
        '1月2日上午12点30分15秒 一辆重卡进入长安校区……',
        '1月3日下午3点45分20秒 一辆货车超速……',
        '1月4日晚上8点15分10秒 一辆小汽车违规停车……',
    ];


    const lineChartData = vehicleData.flatMap((entry) => [
        { date: entry.date, type: 'bus', count: entry.bus },
        { date: entry.date, type: 'van', count: entry.van },
        { date: entry.date, type: 'truck', count: entry.truck },
        { date: entry.date, type: 'car', count: entry.car },
    ]);

    const lineConfig = {
        data: lineChartData,
        xField: 'date', // X轴：日期
        yField: 'count', // Y轴：车辆数
        seriesField: 'type', // 按车辆类型区分颜色
        colorField: 'type', // 颜色映射字段，自动分配不同颜色
        xAxis: {
            type: 'timeCat', // 时间刻度轴
            tickCount: 6, // 控制刻度数量
            title: { text: '日期', style: { fontSize: 14 } },
        },
        yAxis: {
            label: {
                formatter: (v) => `${v} 辆`, // Y轴单位
            },
            title: { text: '车辆数量', style: { fontSize: 14 } },
        },
        legend: {
            position: 'top-right', // 让图例显示在右上角
        },
        smooth: false, // 平滑曲线
        lineStyle: {
            lineWidth: 5, // 让曲线更粗
        },
        interactions: [{ type: 'element-active' }], // 交互
    };

    // 处理日期选择
    const handleDateChange = (date) => {
        setSelectedDate(date || moment()); // 如果 date 是 null，则设置为当前日期
    };

    // 处理日期范围选择
    const handleRangeChange = (dates) => {
        setSelectedRange(dates || [moment(), moment()]); // 如果 dates 是 null，则设置为当前日期范围
    };

    // 处理数据导出
    const handleExport = () => {
        // 这里可以添加导出逻辑
    };

    // 将数据转换为饼图需要的格式
    const pieData = vehicleStats.map((item) => ({
        type: item.type,
        value: item.count,
    }));

    console.log(pieData); // 确保生成了正确的数据

    const pieConfig = {
        data: pieData,
        angleField: 'value',  // 使用 value 字段作为饼图角度
        colorField: 'type',  // 使用 type 字段作为颜色
        radius: 0.9,
        label: {
            formatter: (datum) => {
                if (datum && datum.type && datum.value !== undefined) {
                    return `${datum.type}: ${(datum.value || 0).toFixed(2)} (${(datum.percent * 100).toFixed(2)}%)`;
                }
                return ' ';
            },
        },
        interactions: [{ type: 'element-active' }],
    };








    return (
        <Layout className="history-layout">
            {/* 顶部导航栏 */}


            {/* 主要内容区域 */}
            <Content className="content">
                <Row gutter={[16, 16]}>
                    {/* 左列卡片列表 */}
                    <Col span={12}>
                        {/* 卡片 1：2025.3.6日各类型车辆数量和异常统计 */}
                        <Card title="选定日期各类型车辆数量和异常统计" className="data-card">
                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    {/* DatePicker 组件 */}
                                    <DatePicker
                                        defaultValue={selectedDate}
                                        onChange={handleDateChange}
                                        picker="date"
                                        style={{ width: '100%' }}
                                    />
                                </Col>
                                <Col span={12} style={{ textAlign: 'right' }}>
                                    {/* 显示当前选择的日期 */}
                                    {selectedDate.format('YYYY-MM-DD')}
                                </Col>
                            </Row>

                            <List
                                dataSource={vehicleStats}
                                renderItem={(item) => (
                                    <List.Item>
                                        <span>{item.type}数量统计</span>
                                        <span>{item.count}辆</span>
                                    </List.Item>
                                )}
                            />
                        </Card>

                        {/* 卡片 2：异常记录 */}
                        <Card className="data-card">
                            <List
                                dataSource={anomalies}
                                renderItem={(item) => (
                                    <List.Item style={{ color: 'red' }}>{item}</List.Item>
                                )}
                            />
                        </Card>
                    </Col>

                    {/* 右列卡片列表 */}
                    <Col span={12}>
                        {/* 卡片 1：2024.2.14到2024.2.28的车辆流量统计 */}
                        <Card title="选定时间段内的车辆流量统计" className="data-card">
                            <RangePicker
                                defaultValue={selectedRange} // 使用 moment 对象
                                onChange={handleRangeChange}
                            />
                            <div style={{ height: 300, marginTop: 16 }}>
                                <Line
                                    {...lineConfig}
                                    style={{ strokeWidth: 6 }} // 强制设置折线宽度
                                />


                            </div>
                        </Card>

                        {/* 卡片 2：导入数据和饼图 */}
                        <Card title="导出选定时间段内车辆流量统计数据为" className="data-card">
                            <Row gutter={[16, 16]}>
                                <Col span={12}>

                                    <Select defaultValue="csv" style={{ width: 120, marginLeft: 8 }}>
                                        <Option value="csv">CSV</Option>
                                        <Option value="excel">Excel</Option>
                                    </Select>
                                    <Button icon={<DownloadOutlined />} style={{ marginLeft: 8 }} onClick={handleExport}>
                                        导出
                                    </Button>
                                </Col>
                                <Col span={12} style={{ textAlign: 'right' }}>

                                    <div style={{ height: 200, marginTop: 16 }}>
                                        {/* 饼图 */}
                                        <Pie {...pieConfig} />
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default History;