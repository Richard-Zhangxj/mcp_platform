import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Tabs, 
  Button, 
  Tag, 
  Space, 
  Typography, 
  Modal, 
  message,
  Descriptions
} from 'antd';
import { 
  PlayCircleOutlined, 
  ReloadOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

// 类型定义
interface Task {
  id: string;
  flowId: string;
  flowName: string;
  stepId: string;
  stepName: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'exception';
  assignedAt: string;
  startedAt: string | null;
  finishedAt: string | null;
  duration: number | null; // in seconds
}

const MyTasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

  // 模拟获取任务列表
  const fetchTasks = async (status: string) => {
    setLoading(true);
    try {
      // 在实际应用中，这里会调用 API 获取任务列表
      // const response = await taskService.getTasksByStatus(status);
      // setTasks(response.data);
      
      // 模拟数据
      const mockTasks: Task[] = [
        {
          id: '1',
          flowId: '1',
          flowName: '销售订单处理流程',
          stepId: '1',
          stepName: '输入销售订单基本信息',
          status: 'pending',
          assignedAt: '2023-01-01 10:00:00',
          startedAt: null,
          finishedAt: null,
          duration: null,
        },
        {
          id: '2',
          flowId: '2',
          flowName: '采购订单处理流程',
          stepId: '2',
          stepName: '验证供应商信息',
          status: 'running',
          assignedAt: '2023-01-02 11:00:00',
          startedAt: '2023-01-02 11:05:00',
          finishedAt: null,
          duration: null,
        },
        {
          id: '3',
          flowId: '1',
          flowName: '销售订单处理流程',
          stepId: '3',
          stepName: '确认并提交',
          status: 'completed',
          assignedAt: '2023-01-03 12:00:00',
          startedAt: '2023-01-03 12:05:00',
          finishedAt: '2023-01-03 12:10:00',
          duration: 300,
        },
        {
          id: '4',
          flowId: '3',
          flowName: '客户主数据维护流程',
          stepId: '1',
          stepName: '输入客户基本信息',
          status: 'failed',
          assignedAt: '2023-01-04 13:00:00',
          startedAt: '2023-01-04 13:05:00',
          finishedAt: '2023-01-04 13:06:00',
          duration: 60,
        },
        {
          id: '5',
          flowId: '2',
          flowName: '采购订单处理流程',
          stepId: '3',
          stepName: '确认并提交',
          status: 'exception',
          assignedAt: '2023-01-05 14:00:00',
          startedAt: null,
          finishedAt: null,
          duration: null,
        },
      ];
      
      // 根据标签页过滤任务
      const filteredTasks = mockTasks.filter(task => task.status === status);
      setTasks(filteredTasks);
    } catch (error) {
      message.error('获取任务列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(activeTab);
  }, [activeTab]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleRefresh = () => {
    fetchTasks(activeTab);
  };

  const handleExecuteTask = (task: Task) => {
    // 在实际应用中，这里会导航到执行页面
    // navigate(`/flows/execute/${task.flowId}`);
    message.success(`开始执行任务: ${task.stepName}`);
  };

  const handleViewDetails = (task: Task) => {
    setSelectedTask(task);
    setIsDetailModalVisible(true);
  };

  const handleDetailModalOk = () => {
    setIsDetailModalVisible(false);
  };

  const handleDetailModalCancel = () => {
    setIsDetailModalVisible(false);
  };

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'pending':
        return <Tag icon={<ClockCircleOutlined />} color="default">待办</Tag>;
      case 'running':
        return <Tag icon={<PlayCircleOutlined />} color="processing">进行中</Tag>;
      case 'completed':
        return <Tag icon={<CheckCircleOutlined />} color="success">已完成</Tag>;
      case 'failed':
        return <Tag icon={<ExclamationCircleOutlined />} color="error">失败</Tag>;
      case 'exception':
        return <Tag icon={<ExclamationCircleOutlined />} color="warning">异常</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  const columns: ColumnsType<Task> = [
    {
      title: '流程名称',
      dataIndex: 'flowName',
      key: 'flowName',
    },
    {
      title: '步骤名称',
      dataIndex: 'stepName',
      key: 'stepName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status),
    },
    {
      title: '分配时间',
      dataIndex: 'assignedAt',
      key: 'assignedAt',
    },
    {
      title: '开始时间',
      dataIndex: 'startedAt',
      key: 'startedAt',
      render: (startedAt: string | null) => startedAt || '-',
    },
    {
      title: '完成时间',
      dataIndex: 'finishedAt',
      key: 'finishedAt',
      render: (finishedAt: string | null) => finishedAt || '-',
    },
    {
      title: '持续时间',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration: number | null) => {
        if (duration === null) return '-';
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
          {record.status === 'pending' && (
            <Button 
              type="primary" 
              icon={<PlayCircleOutlined />} 
              onClick={() => handleExecuteTask(record)}
              size="small"
            >
              执行
            </Button>
          )}
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
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Typography.Title level={2}>我的任务</Typography.Title>
        <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
          刷新
        </Button>
      </div>
      
      <Tabs 
        activeKey={activeTab} 
        onChange={handleTabChange}
        items={[
          { key: 'pending', label: '待办任务' },
          { key: 'running', label: '进行中' },
          { key: 'completed', label: '已完成' },
          { key: 'failed', label: '失败' },
          { key: 'exception', label: '异常处理' },
        ]}
      />
      
      <Table 
        columns={columns} 
        dataSource={tasks} 
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
      
      <Modal
        title="任务详情"
        visible={isDetailModalVisible}
        onOk={handleDetailModalOk}
        onCancel={handleDetailModalCancel}
        okText="确认"
        cancelText="取消"
      >
        {selectedTask && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="任务ID">{selectedTask.id}</Descriptions.Item>
            <Descriptions.Item label="流程名称">{selectedTask.flowName}</Descriptions.Item>
            <Descriptions.Item label="步骤名称">{selectedTask.stepName}</Descriptions.Item>
            <Descriptions.Item label="状态">{getStatusTag(selectedTask.status)}</Descriptions.Item>
            <Descriptions.Item label="分配时间">{selectedTask.assignedAt}</Descriptions.Item>
            <Descriptions.Item label="开始时间">{selectedTask.startedAt || '-'}</Descriptions.Item>
            <Descriptions.Item label="完成时间">{selectedTask.finishedAt || '-'}</Descriptions.Item>
            <Descriptions.Item label="持续时间">
              {selectedTask.duration ? `${Math.floor(selectedTask.duration / 60)}分${selectedTask.duration % 60}秒` : '-'}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default MyTasksPage;
