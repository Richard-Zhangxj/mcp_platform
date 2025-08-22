import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Tag, Modal, Form, Input, Select, DatePicker, message } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';

// 类型定义
interface Execution {
  id: string;
  flowId: string;
  flowName: string;
  userId: string;
  userName: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  startedAt: string;
  finishedAt: string | null;
  duration: number; // in seconds
}

const ExecutionListPage: React.FC = () => {
  const [executions, setExecutions] = useState<Execution[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchForm] = Form.useForm();

  // 模拟获取执行列表
  const fetchExecutions = async (params: any = {}) => {
    setLoading(true);
    try {
      // 在实际应用中，这里会调用 API 获取执行列表
      // const response = await executionService.getExecutions(params);
      // setExecutions(response.data);
      
      // 模拟数据
      const mockExecutions: Execution[] = [
        {
          id: '1',
          flowId: '1',
          flowName: '销售订单处理流程',
          userId: 'user1',
          userName: '张三',
          status: 'completed',
          startedAt: '2023-01-01 10:00:00',
          finishedAt: '2023-01-01 10:05:00',
          duration: 300,
        },
        {
          id: '2',
          flowId: '2',
          flowName: '采购订单处理流程',
          userId: 'user2',
          userName: '李四',
          status: 'running',
          startedAt: '2023-01-02 11:00:00',
          finishedAt: null,
          duration: 0,
        },
        {
          id: '3',
          flowId: '1',
          flowName: '销售订单处理流程',
          userId: 'user1',
          userName: '张三',
          status: 'failed',
          startedAt: '2023-01-03 12:00:00',
          finishedAt: '2023-01-03 12:02:00',
          duration: 120,
        },
      ];
      setExecutions(mockExecutions);
    } catch (error) {
      message.error('获取执行列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExecutions();
  }, []);

  const handleSearch = async (values: any) => {
    // 处理搜索逻辑
    await fetchExecutions(values);
  };

  const handleReset = () => {
    searchForm.resetFields();
    fetchExecutions();
  };

  const handleRefresh = () => {
    const values = searchForm.getFieldsValue();
    fetchExecutions(values);
  };

  const handleCancelExecution = (id: string) => {
    Modal.confirm({
      title: '确认取消',
      content: '确定要取消这个执行实例吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          // 在实际应用中，这里会调用 API 取消执行
          // await executionService.cancelExecution(id);
          message.success('取消成功');
          fetchExecutions();
        } catch (error) {
          message.error('取消失败');
        }
      },
    });
  };

  const columns: ColumnsType<Execution> = [
    {
      title: '执行ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '流程名称',
      dataIndex: 'flowName',
      key: 'flowName',
    },
    {
      title: '用户',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'blue';
        if (status === 'completed') color = 'green';
        if (status === 'failed') color = 'red';
        if (status === 'cancelled') color = 'orange';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: '开始时间',
      dataIndex: 'startedAt',
      key: 'startedAt',
    },
    {
      title: '结束时间',
      dataIndex: 'finishedAt',
      key: 'finishedAt',
      render: (finishedAt: string | null) => finishedAt || '-',
    },
    {
      title: '持续时间',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration: number) => {
        if (duration === 0) return '-';
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        return `${minutes}分${seconds}秒`;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {record.status === 'running' && (
            <Button 
              danger 
              onClick={() => handleCancelExecution(record.id)}
              size="small"
            >
              取消
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <h2>执行管理</h2>
      </div>
      
      <Card style={{ marginBottom: 16 }}>
        <Form form={searchForm} layout="inline" onFinish={handleSearch}>
          <Form.Item name="flowName" label="流程名称">
            <Input placeholder="请输入流程名称" />
          </Form.Item>
          <Form.Item name="userName" label="用户">
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item name="status" label="状态">
            <Select placeholder="请选择状态" allowClear>
              <Select.Option value="running">运行中</Select.Option>
              <Select.Option value="completed">已完成</Select.Option>
              <Select.Option value="failed">失败</Select.Option>
              <Select.Option value="cancelled">已取消</Select.Option>
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
        dataSource={executions} 
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ExecutionListPage;
