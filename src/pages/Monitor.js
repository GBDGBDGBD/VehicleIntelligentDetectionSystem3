import React, { useState, useRef } from 'react';
import { Layout, Button, Card, Input, Row, Col, Select } from 'antd';
import {
    HomeOutlined,
    CameraOutlined,
    VideoCameraOutlined,
    FullscreenOutlined,
} from '@ant-design/icons';
import ReactPlayer from 'react-player';
import './Monitor.css';
import html2canvas from 'html2canvas';
import Video1 from '../assets/1.mp4';
import Video2 from '../assets/2.mp4';
import Video3 from '../assets/3.mp4';
import Video4 from '../assets/4.mp4';
import Video5 from '../assets/video5.mp4';
import Video6 from '../assets/video6.mp4';
import Video7 from '../assets/video7.mp4';
import Video8 from '../assets/video8.mp4';

const { Header, Content } = Layout;

const Monitor = () => {
    const [aiCheckStatus, setAiCheckStatus] = useState([false, false, false, false]);
    const [aiCheckStates, setAiCheckStates] = useState([false, false, false, false]);

    const [isRecording, setIsRecording] = useState(false);
    const playerRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const [selectedVideoIndices, setSelectedVideoIndices] = useState([0, 2, 5, 4]);

    const videoSources = [
        { name: '河北-G1511日兰高速-兰考北收费站 k453+800-下行-东北', url: Video1, rstp:'rtsp://47.97.29.77:8554/mystream9'},
        { name: '河北-G1511日兰高速-兰考北收费站 k5653+350-下行-西北', url: Video2, rstp:'rtsp://47.97.29.77:8554/mystream9'},
        { name: '河南-G35 济广高速-外场沿线 k386+650-下行-北', url: Video3, rstp:'rtsp://47.97.29.77:8554/mystream9' },
        { name: '河南-G35 济广高速-外场沿线 k332+750-下行-西南', url: Video4, rstp:'rtsp://47.97.29.77:8554/mystream9' },
        { name: '河南 - S81 商南高速 - 外场沿线 k120 + 600 - 下行 - 西南', url: Video5, rstp:'rtsp://47.97.29.77:8554/mystream9' },
        { name: '河南 - S21 濮商高速 - 外场沿线 k80 + 100 - 上行 - 东北', url: Video6, rstp:'rtsp://47.97.29.77:8554/mystream9' },
        { name: '河南 - G4 京港澳高速 - 外场沿线 k230 + 500 - 下行 - 东南', url: Video7, rstp:'rtsp://47.97.29.77:8554/mystream9' },
        { name: '河南 - G45 大广高速 - 外场沿线 k180 + 300 - 上行 - 西北', url: Video8, rstp:'rtsp://47.97.29.77:8554/mystream9'},
    ];

    const handleSelectVideo = (displayIndex, value) => {
        setSelectedVideoIndices(prevIndices => {
            const newSelection = [...prevIndices];
            newSelection[displayIndex] = value; // 更新选定的视频索引
            return newSelection;
        });
    };

    const handleRecord = (index) => {
        const videoElement = playerRefs[index].current.getInternalPlayer();
        if (videoElement) {
            const stream = videoElement.captureStream();
            const recorder = new MediaRecorder(stream);
            const chunks = [];

            recorder.ondataavailable = (e) => chunks.push(e.data);
            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'video/mp4' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `recording_${videoSources[selectedVideoIndices[index]].name}.mp4`;
                link.click();
            };

            recorder.start();
            setIsRecording(true);

            setTimeout(() => {
                recorder.stop();
                setIsRecording(false);
            }, 5000); // 录制 5 秒
        }
    };

    const handleScreenshot = (index) => {
        const videoElement = document.querySelector(`.video-container-${index}`);
        if (videoElement) {
            html2canvas(videoElement).then((canvas) => {
                const link = document.createElement('a');
                link.download = `screenshot_${videoSources[selectedVideoIndices[index]].name}.png`;
                link.href = canvas.toDataURL();
                link.click();
            });
        }
    };

    const toggleFullScreen = (index) => {
        const videoContainer = document.querySelector(`.video-container-${index}`);
        if (videoContainer) {
            if (!document.fullscreenElement) {
                videoContainer.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        }
    };

    return (
        <Layout className="monitor-layout">


                <Row gutter={[16, 16]}>
                    {selectedVideoIndices.map((videoIndex, displayIndex) => (
                        <Col span={12} key={displayIndex}>
                            <Card
                                className="video-card"
                                title={videoSources[videoIndex].name} // 标题只显示当前播放的视频名称
                                extra={(
                                    <Select
                                        value={videoIndex}
                                        style={{ width: 180 }} // 让下拉框在标题右侧
                                        onChange={(value) => handleSelectVideo(displayIndex, value)}
                                        dropdownStyle={{ zIndex: 1050 }} // 避免被其他组件遮挡
                                    >
                                        {videoSources.map((video, index) => (
                                            <Select.Option key={index} value={index}>
                                                {video.rstp}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                )}
                            >
                                {/* 操作按钮组：截图、录像、全屏、AI 识别 */}
                                <div className="video-actions">
                                    <Button className="blue-button" icon={<CameraOutlined />} onClick={() => handleScreenshot(displayIndex)}>
                                        截图
                                    </Button>
                                    <Button className="blue-button" icon={<VideoCameraOutlined />} onClick={() => handleRecord(displayIndex)}>
                                        {isRecording ? '停止录像' : '录像'}
                                    </Button>
                                    <Button className="blue-button" icon={<FullscreenOutlined />} onClick={() => toggleFullScreen(displayIndex)}>
                                        全屏
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            // 切换视频索引
                                            setSelectedVideoIndices(prev => {
                                                const newIndices = [...prev];
                                                newIndices[displayIndex] = (newIndices[displayIndex] + 1) % videoSources.length;
                                                return newIndices;
                                            });

                                            // 切换 AI 检查状态
                                            setAiCheckStates(prev => {
                                                const newStates = [...prev];
                                                newStates[displayIndex] = !newStates[displayIndex];
                                                return newStates;
                                            });
                                        }}
                                        className="blue-button"
                                    >
                                        {aiCheckStates[displayIndex] ? 'AI检查开启' : 'AI检查关闭'}
                                    </Button>


                                </div>

                                {/* 视频播放器 */}
                                <div className={`video-container video-container-${displayIndex}`}>
                                    <ReactPlayer
                                        ref={playerRefs[displayIndex]}
                                        url={videoSources[videoIndex].url}
                                        playing
                                        muted
                                        controls={false}
                                        width="100%"
                                        height="100%"
                                        style={{ objectFit: 'cover' }} // 视频内容覆盖整个容器
                                    />


                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>


        </Layout>
    );
};

export default Monitor;