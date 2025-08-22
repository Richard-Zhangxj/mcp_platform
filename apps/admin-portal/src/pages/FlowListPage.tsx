import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Tag, Modal, Form, Input, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, PlayCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

// 类型定义
interface Flow {
  id: string;
  name: string;
  description: string;
  version: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
}

const FlowListPage: React.FC = () => {
  const [flows, setFlows] = useState<Flow[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingFlow, setEditingFlow] = useState<Flow | null>(null);

  // 模拟获取流程列表
  const fetchFlows = async () => {
    setLoading(true);
    try {
      // 在实际应用中，这里会调用 API 获取流程列表
      // const response = await flowService.getAllFlows();
      // setFlows(response.data);
      
      // 模拟数据
      const mockFlows: Flow[] = [
        {
          id: '1',
          name: '销售订单处理流程',
          description: '处理销售订单的完整流程',
          version: '1.0',
          status: 'published',
          createdAt: '2023-01-01',
          updatedAt: '2023-01-01',
        },
        {
          id: '2',
          name: '采购订单处理流程',
          description: '处理采购订单的完整流程',
          version: '1.0',
          status: 'draft',
          createdAt: '2023-01-02',
          updatedAt: '2023-01-02',
        },
      ];
      setFlows(mockFlows);
    } catch (error) {
      message.error('获取流程列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlows();
  }, []);

  const handleCreateFlow = () => {
    setEditingFlow(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditFlow = (flow: Flow) => {
    setEditingFlow(flow);
    form.setFieldsValue(flow);
    setIsModalVisible(true);
  };

  const handleDeleteFlow = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个流程吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          // 在实际应用中，这里会调用 API 删除流程
          // await flowService.deleteFlow(id);
          message.success('删除成功');
          fetchFlows();
        } catch (error) {
          message.error('删除失败');
        }
      },
    });
  };

  const handleStartExecution = (id: string) => {
    // 在实际应用中，这里会调用 API 启动流程执行
    message.success('流程执行已启动');
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingFlow) {
        // 在实际应用中，这里会调用 API 更新流程
        // await flowService.updateFlow(editingFlow.id, values);
        message.success('更新成功');
      } else {
        // 在实际应用中，这里会调用 API 创建流程
        // await flowService.createFlow(values);
        message.success('创建成功');
      }
      
      setIsModalVisible(false);
      fetchFlows();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const columns: ColumnsType<Flow> = [
    {
      title: '流程名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '版本',
      dataIndex: 'version',
      key: 'version',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'blue';
        if (status === 'published') color = 'green';
        if (status === 'archived') color = 'red';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={() => handleEditFlow(record)}
            size="small"
          >
            编辑
          </Button>
          <Button 
            icon={<PlayCircleOutlined />} 
            onClick={() => handleStartExecution(record.id)}
            size="small"
          >
            执行
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDeleteFlow(record.id)}
            size="small"
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <h2>流程管理</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateFlow}>
          新建流程
        </Button>
      </div>
      
      <Table 
        columns={columns} 
        dataSource={flows} 
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
      
      <Modal
        title={editingFlow ? "编辑流程" : "新建流程"}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="流程名称"
            rules={[{ required: true, message: '请输入流程名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="version"
            label="版本"
            rules={[{ required: true, message: '请输入版本号' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FlowListPage;
