import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Button,
  Space,
  Typography,
  Divider,
  message,
  Tabs,
  Form,
  Input,
  Select,
  Switch,
  InputNumber,
} from 'antd';
import {
  UserOutlined,
  DatabaseOutlined,
  ApiOutlined,
  SettingOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { TabsProps } from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

// 定义系统状态类型
interface SystemStatus {
  apiStatus: 'healthy' | 'warning' | 'error';
  databaseStatus: 'healthy' | 'warning' | 'error';
  cacheStatus: 'healthy' | 'warning' | 'error';
  queueStatus: 'healthy' | 'warning' | 'error';
  lastChecked: string;
}

// 定义用户统计类型
interface UserStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  newUsersThisMonth: number;
}

// 定义API统计类型
interface ApiStats {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  requestsPerMinute: number;
}

// 定义系统配置类型
interface SystemConfig {
  maxConcurrentProcesses: number;
  defaultTimeout: number;
  logRetentionDays: number;
  enableDebugLogging: boolean;
  enablePerformanceMonitoring: boolean;
}

const SystemPage: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    apiStatus: 'healthy',
    databaseStatus: 'healthy',
    cacheStatus: 'healthy',
    queueStatus: 'healthy',
    lastChecked: '',
  });
  const [userStats, setUserStats] = useState<UserStats>({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    newUsersThisMonth: 0,
  });
  const [apiStats, setApiStats] = useState<ApiStats>({
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    averageResponseTime: 0,
    requestsPerMinute: 0,
  });
  const [systemConfig, setSystemConfig] = useState<SystemConfig>({
    maxConcurrentProcesses: 10,
    defaultTimeout: 300,
    logRetentionDays: 30,
    enableDebugLogging: false,
    enablePerformanceMonitoring: true,
  });
  const [loading, setLoading] = useState(false);
  const [configForm] = Form.useForm();

  // 模拟获取系统状态
  const fetchSystemStatus = async () => {
    setLoading(true);
    try {
      // 在实际应用中，这里会调用 API 获取系统状态
      // const response = await systemService.getSystemStatus();
      // setSystemStatus(response.data);
      
      // 模拟数据
      setSystemStatus({
        apiStatus: 'healthy',
        databaseStatus: 'healthy',
        cacheStatus: 'healthy',
        queueStatus: 'healthy',
        lastChecked: new Date().toISOString(),
      });
    } catch (error) {
      message.error('获取系统状态失败');
    } finally {
      setLoading(false);
    }
  };

  // 模拟获取用户统计
  const fetchUserStats = async () => {
    try {
      // 在实际应用中，这里会调用 API 获取用户统计
      // const response = await systemService.getUserStats();
      // setUserStats(response.data);
      
      // 模拟数据
      setUserStats({
        totalUsers: 128,
        activeUsers: 115,
        inactiveUsers: 13,
        newUsersThisMonth: 8,
      });
    } catch (error) {
      message.error('获取用户统计失败');
    }
  };

  // 模拟获取API统计
  const fetchApiStats = async () => {
    try {
      // 在实际应用中，这里会调用 API 获取API统计
      // const response = await systemService.getApiStats();
      // setApiStats(response.data);
      
      // 模拟数据
      setApiStats({
        totalRequests: 12400,
        successfulRequests: 11800,
        failedRequests: 600,
        averageResponseTime: 120.5,
        requestsPerMinute: 86,
      });
    } catch (error) {
      message.error('获取API统计失败');
    }
  };

  // 模拟获取系统配置
  const fetchSystemConfig = async () => {
    try {
      // 在实际应用中，这里会调用 API 获取系统配置
      // const response = await systemService.getSystemConfig();
      // setSystemConfig(response.data);
      // configForm.setFieldsValue(response.data);
      
      // 模拟数据
      const config = {
        maxConcurrentProcesses: 10,
        defaultTimeout: 300,
        logRetentionDays: 30,
        enableDebugLogging: false,
        enablePerformanceMonitoring: true,
      };
      setSystemConfig(config);
      configForm.setFieldsValue(config);
    } catch (error) {
      message.error('获取系统配置失败');
    }
  };

  // 获取所有数据
  const fetchData = async () => {
    await Promise.all([
      fetchSystemStatus(),
      fetchUserStats(),
      fetchApiStats(),
      fetchSystemConfig(),
    ]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 处理刷新数据
  const handleRefresh = async () => {
    await fetchData();
    message.success('数据刷新成功');
  };

  // 处理保存配置
  const handleSaveConfig = async (values: any) => {
    try {
      // 在实际应用中，这里会调用 API 保存系统配置
      // await systemService.updateSystemConfig(values);
      setSystemConfig(values);
      message.success('系统配置保存成功');
    } catch (error) {
      message.error('系统配置保存失败');
    }
  };

  // 处理重置配置
  const handleResetConfig = () => {
    configForm.setFieldsValue(systemConfig);
  };

  // 获取状态图标和颜色
  const getStatusIconAndColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return { icon: <CheckCircleOutlined />, color: 'green' };
      case 'warning':
        return { icon: <WarningOutlined />, color: 'orange' };
      case 'error':
        return { icon: <CloseCircleOutlined />, color: 'red' };
      default:
        return { icon: <InfoCircleOutlined />, color: 'blue' };
    }
  };

  // 系统监控表格列定义
  const monitoringColumns: ColumnsType<any> = [
    {
      title: '组件',
      dataIndex: 'component',
      key: 'component',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const { icon, color } = getStatusIconAndColor(status);
        return (
          <Space>
            {icon}
            <Text style={{ color }}>{status}</Text>
          </Space>
        );
      },
    },
    {
      title: '最后检查时间',
      dataIndex: 'lastChecked',
      key: 'lastChecked',
      render: (lastChecked: string) => new Date(lastChecked).toLocaleString(),
    },
  ];

  // 系统监控数据
  const monitoringData = [
    {
      key: '1',
      component: 'API服务',
      status: systemStatus.apiStatus,
      lastChecked: systemStatus.lastChecked,
    },
    {
      key: '2',
      component: '数据库',
      status: systemStatus.databaseStatus,
      lastChecked: systemStatus.lastChecked,
    },
    {
      key: '3',
      component: '缓存服务',
      status: systemStatus.cacheStatus,
      lastChecked: systemStatus.lastChecked,
    },
    {
      key: '4',
      component: '消息队列',
      status: systemStatus.queueStatus,
      lastChecked: systemStatus.lastChecked,
    },
  ];

  return (
    <div>
      <Title level={2}>系统管理</Title>
      <Divider />
      
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button 
          type="primary" 
          icon={<SyncOutlined />} 
          onClick={handleRefresh}
          loading={loading}
        >
          刷新数据
        </Button>
      </div>
      
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总用户数"
              value={userStats.totalUsers}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="活跃用户数"
              value={userStats.activeUsers}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="本月新增用户"
              value={userStats.newUsersThisMonth}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="API请求成功率"
              value={apiStats.successfulRequests / apiStats.totalRequests * 100}
              precision={1}
              suffix="%"
              prefix={<ApiOutlined />}
            />
          </Card>
        </Col>
      </Row>
      
      <Tabs defaultActiveKey="1">
        <TabPane tab={<span><DatabaseOutlined /> 系统监控</span>} key="1">
          <Card title="系统组件状态">
            <Table 
              columns={monitoringColumns} 
              dataSource={monitoringData} 
              loading={loading}
              pagination={false}
            />
          </Card>
          
          <Card title="用户统计" style={{ marginTop: 16 }}>
            <Row gutter={16}>
              <Col span={6}>
                <Statistic
                  title="总用户数"
                  value={userStats.totalUsers}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="活跃用户数"
                  value={userStats.activeUsers}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="非活跃用户数"
                  value={userStats.inactiveUsers}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="本月新增用户"
                  value={userStats.newUsersThisMonth}
                />
              </Col>
            </Row>
          </Card>
          
          <Card title="API统计" style={{ marginTop: 16 }}>
            <Row gutter={16}>
              <Col span={6}>
                <Statistic
                  title="总请求数"
                  value={apiStats.totalRequests}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="成功请求数"
                  value={apiStats.successfulRequests}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="失败请求数"
                  value={apiStats.failedRequests}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="平均响应时间(ms)"
                  value={apiStats.averageResponseTime}
                  precision={1}
                />
              </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col span={6}>
                <Statistic
                  title="每分钟请求数"
                  value={apiStats.requestsPerMinute}
                />
              </Col>
            </Row>
          </Card>
        </TabPane>
        
        <TabPane tab={<span><SettingOutlined /> 系统配置</span>} key="2">
          <Card title="系统配置">
            <Form 
              form={configForm} 
              layout="vertical" 
              onFinish={handleSaveConfig}
              initialValues={systemConfig}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="maxConcurrentProcesses"
                    label="最大并发流程数"
                    rules={[{ required: true, message: '请输入最大并发流程数' }]}
                  >
                    <InputNumber min={1} max={100} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="defaultTimeout"
                    label="默认超时时间(秒)"
                    rules={[{ required: true, message: '请输入默认超时时间' }]}
                  >
                    <InputNumber min={1} max={3600} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
              
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="logRetentionDays"
                    label="日志保留天数"
                    rules={[{ required: true, message: '请输入日志保留天数' }]}
                  >
                    <InputNumber min={1} max={365} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="enableDebugLogging"
                    label="启用调试日志"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
              
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="enablePerformanceMonitoring"
                    label="启用性能监控"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit">
                    保存配置
                  </Button>
                  <Button onClick={handleResetConfig}>
                    重置
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
        
        <TabPane tab={<span><InfoCircleOutlined /> 系统信息</span>} key="3">
          <Card title="系统信息">
            <p><Text strong>系统版本:</Text> v1.0.0</p>
            <p><Text strong>构建时间:</Text> 2023-01-01 12:00:00</p>
            <p><Text strong>运行环境:</Text> Production</p>
            <p><Text strong>操作系统:</Text> Linux</p>
            <p><Text strong>数据库:</Text> PostgreSQL 13.0</p>
            <p><Text strong>缓存:</Text> Redis 6.0</p>
            <p><Text strong>消息队列:</Text> RabbitMQ 3.8</p>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default SystemPage;
