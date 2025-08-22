import React from 'react';
import { Card, Row, Col, Statistic, Typography, Divider } from 'antd';
import {
  UsergroupAddOutlined,
  FileTextOutlined,
  BarChartOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { Title } = Typography;

// 模拟数据
const statisticsData = [
  { title: '总租户数', value: 128, icon: <UsergroupAddOutlined />, color: '#1890ff' },
  { title: '流程模板数', value: 56, icon: <FileTextOutlined />, color: '#52c41a' },
  { title: '今日执行数', value: 124, icon: <BarChartOutlined />, color: '#faad14' },
  { title: '异常数量', value: 3, icon: <WarningOutlined />, color: '#ff4d4f' },
];

// 模拟图表数据
const chartData = [
  { date: '08-01', executions: 45, errors: 2 },
  { date: '08-02', executions: 52, errors: 1 },
  { date: '08-03', executions: 48, errors: 3 },
  { date: '08-04', executions: 61, errors: 0 },
  { date: '08-05', executions: 55, errors: 2 },
  { date: '08-06', executions: 67, errors: 1 },
  { date: '08-07', executions: 72, errors: 0 },
];

const DashboardPage: React.FC = () => {
  return (
    <div>
      <Title level={2}>仪表板</Title>
      <Divider />
      
      <Row gutter={16} style={{ marginBottom: 24 }}>
        {statisticsData.map((stat, index) => (
          <Col span={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={React.cloneElement(stat.icon as React.ReactElement, { style: { color: stat.color } })}
              />
            </Card>
          </Col>
        ))}
      </Row>
      
      <Row gutter={16}>
        <Col span={24}>
          <Card title="执行趋势">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="executions" stroke="#1890ff" name="执行数量" />
                <Line type="monotone" dataKey="errors" stroke="#ff4d4f" name="错误数量" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
      
      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card title="最近活动">
            <ul>
              <li>租户 ABC 公司创建了一个新的流程模板</li>
              <li>租户 XYZ 公司执行了销售订单处理流程</li>
              <li>系统检测到一个潜在的性能问题</li>
              <li>新的知识库条目已添加</li>
            </ul>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="系统状态">
            <ul>
              <li>API 服务: <span style={{ color: '#52c41a' }}>正常运行</span></li>
              <li>数据库连接: <span style={{ color: '#52c41a' }}>正常</span></li>
              <li>向量数据库: <span style={{ color: '#52c41a' }}>正常</span></li>
              <li>消息队列: <span style={{ color: '#52c41a' }}>正常</span></li>
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
