import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Tag, Form, Input, Select, DatePicker, message } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';

// 类型定义
interface Log {
  id: string;
  flowId: string;
  flowName: string;
  executionId: string;
  stepId: string | null;
  stepName: string | null;
  userId: string;
  userName: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  timestamp: string;
  details: any; // 日志详情
}

const LogListPage: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchForm] = Form.useForm();

  // 模拟获取日志列表
  const fetchLogs = async (params: any = {}) => {
    setLoading(true);
    try {
      // 在实际应用中，这里会调用 API 获取日志列表
      // const response = await logService.getLogs(params);
      // setLogs(response.data);
      
      // 模拟数据
      const mockLogs: Log[] = [
        {
          id: '1',
          flowId: '1',
          flowName: '销售订单处理流程',
          executionId: '1',
          stepId: '1',
          stepName: '创建销售订单',
          userId: 'user1',
          userName: '张三',
          level: 'info',
          message: 'RFC调用成功',
          timestamp: '2023-01-01 10:00:00',
          details: { result: 'success' },
        },
        {
          id: '2',
          flowId: '2',
          flowName: '采购订单处理流程',
          executionId: '2',
          stepId: '2',
          stepName: '验证供应商信息',
          userId: 'user2',
          userName: '李四',
          level: 'error',
          message: '供应商信息验证失败',
          timestamp: '2023-01-02 11:00:00',
          details: { error: '供应商不存在' },
        },
        {
          id: '3',
          flowId: '1',
          flowName: '销售订单处理流程',
          executionId: '3',
          stepId: '1',
          stepName: '创建销售订单',
          userId: 'user1',
          userName: '张三',
          level: 'warn',
          message: '订单金额较大，需要审批',
          timestamp: '2023-01-03 12:00:00',
          details: { amount: 100000 },
        },
      ];
      setLogs(mockLogs);
    } catch (error) {
      message.error('获取日志列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleSearch = async (values: any) => {
    // 处理搜索逻辑
    await fetchLogs(values);
  };

  const handleReset = () => {
    searchForm.resetFields();
    fetchLogs();
  };

  const handleRefresh = () => {
    const values = searchForm.getFieldsValue();
    fetchLogs(values);
  };

  const handleViewDetails = (log: Log) => {
    // 查看日志详情
    Modal.info({
      title: '日志详情',
      content: (
        <div>
          <p><strong>消息:</strong> {log.message}</p>
          <p><strong>详情:</strong></p>
          <pre>{JSON.stringify(log.details, null, 2)}</pre>
        </div>
      ),
      width: 600,
    });
  };

  const columns: ColumnsType<Log> = [
    {
      title: '时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      sorter: (a, b) => moment(a.timestamp).unix() - moment(b.timestamp).unix(),
    },
    {
      title: '流程名称',
      dataIndex: 'flowName',
      key: 'flowName',
    },
    {
      title: '步骤名称',
      dataIndex: 'stepName',
      key: 'stepName',
      render: (stepName: string | null) => stepName || '-',
    },
    {
      title: '用户',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '级别',
      dataIndex: 'level',
      key: 'level',
      render: (level: string) => {
        let color = 'blue';
        if (level === 'warn') color = 'orange';
        if (level === 'error') color = 'red';
        return <Tag color={color}>{level}</Tag>;
      },
      filters: [
        { text: '信息', value: 'info' },
        { text: '警告', value: 'warn' },
        { text: '错误', value: 'error' },
      ],
      onFilter: (value, record) => record.level === value,
    },
    {
      title: '消息',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="link" 
            onClick={() => handleViewDetails(record)}
          >
            详情
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <h2>日志管理</h2>
      </div>
      
      <Card style={{ marginBottom: 16 }}>
        <Form form={searchForm} layout="inline" onFinish={handleSearch}>
          <Form.Item name="flowName" label="流程名称">
            <Input placeholder="请输入流程名称" />
          </Form.Item>
          <Form.Item name="userName" label="用户">
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item name="level" label="级别">
            <Select placeholder="请选择级别" allowClear>
              <Select.Option value="info">信息</Select.Option>
              <Select.Option value="warn">警告</Select.Option>
              <Select.Option value="error">错误</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="dateRange" label="时间范围">
            <DatePicker.RangePicker />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                搜索
              </Button>
              <Button onClick={handleReset}>
                重置
              </Button>
              <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
                刷新
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
      
      <Table 
        columns={columns} 
        dataSource={logs} 
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default LogListPage;
