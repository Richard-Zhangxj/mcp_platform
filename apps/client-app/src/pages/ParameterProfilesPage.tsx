import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Typography, 
  Space, 
  message,
  Card,
  Row,
  Col
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  SaveOutlined,
  UploadOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

// 类型定义
interface ParameterProfile {
  id: string;
  parameterName: string;
  parameterLabel: string;
  defaultValue: string;
  dataType: 'string' | 'number' | 'date' | 'select';
  lastUsedAt: string | null;
}

const ParameterProfilesPage: React.FC = () => {
  const [profiles, setProfiles] = useState<ParameterProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProfile, setEditingProfile] = useState<ParameterProfile | null>(null);
  const [form] = Form.useForm();

  // 模拟获取参数配置文件
  const fetchProfiles = async () => {
    setLoading(true);
    try {
      // 在实际应用中，这里会调用 API 获取参数配置文件
      // const response = await parameterService.getProfiles();
      // setProfiles(response.data);
      
      // 模拟数据
      const mockProfiles: ParameterProfile[] = [
        {
          id: '1',
          parameterName: 'customer',
          parameterLabel: '客户代码',
          defaultValue: 'C001',
          dataType: 'string',
          lastUsedAt: '2023-01-01 10:00:00',
        },
        {
          id: '2',
          parameterName: 'salesOrg',
          parameterLabel: '销售组织',
          defaultValue: '1000',
          dataType: 'select',
          lastUsedAt: '2023-01-02 11:00:00',
        },
        {
          id: '3',
          parameterName: 'deliveryDate',
          parameterLabel: '交货日期',
          defaultValue: '2023-01-10',
          dataType: 'date',
          lastUsedAt: '2023-01-03 12:00:00',
        },
      ];
      setProfiles(mockProfiles);
    } catch (error) {
      message.error('获取参数配置文件失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleCreateProfile = () => {
    setEditingProfile(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditProfile = (profile: ParameterProfile) => {
    setEditingProfile(profile);
    form.setFieldsValue(profile);
    setIsModalVisible(true);
  };

  const handleDeleteProfile = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个参数配置吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          // 在实际应用中，这里会调用 API 删除参数配置
          // await parameterService.deleteProfile(id);
          message.success('删除成功');
          fetchProfiles();
        } catch (error) {
          message.error('删除失败');
        }
      },
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingProfile) {
        // 在实际应用中，这里会调用 API 更新参数配置
        // await parameterService.updateProfile(editingProfile.id, values);
        message.success('更新成功');
      } else {
        // 在实际应用中，这里会调用 API 创建参数配置
        // await parameterService.createProfile(values);
        message.success('创建成功');
      }
      
      setIsModalVisible(false);
      fetchProfiles();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleImportProfiles = () => {
    // 在实际应用中，这里会实现导入功能
    message.success('参数配置导入成功');
  };

  const handleExportProfiles = () => {
    // 在实际应用中，这里会实现导出功能
    message.success('参数配置导出成功');
  };

  const handleSaveAll = async () => {
    try {
      // 在实际应用中，这里会调用 API 保存所有参数配置
      // await parameterService.saveAllProfiles(profiles);
      message.success('所有参数配置保存成功');
    } catch (error) {
      message.error('保存失败');
    }
  };

  const columns: ColumnsType<ParameterProfile> = [
    {
      title: '参数名称',
      dataIndex: 'parameterName',
      key: 'parameterName',
    },
    {
      title: '参数标签',
      dataIndex: 'parameterLabel',
      key: 'parameterLabel',
    },
    {
      title: '默认值',
      dataIndex: 'defaultValue',
      key: 'defaultValue',
    },
    {
      title: '数据类型',
      dataIndex: 'dataType',
      key: 'dataType',
    },
    {
      title: '最后使用时间',
      dataIndex: 'lastUsedAt',
      key: 'lastUsedAt',
      render: (lastUsedAt: string | null) => lastUsedAt || '-',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={() => handleEditProfile(record)}
            size="small"
          >
            编辑
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDeleteProfile(record.id)}
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
        <Typography.Title level={2}>参数配置管理</Typography.Title>
        <Space>
          <Button 
            icon={<UploadOutlined />} 
            onClick={handleImportProfiles}
          >
            导入
          </Button>
          <Button 
            icon={<DownloadOutlined />} 
            onClick={handleExportProfiles}
          >
            导出
          </Button>
          <Button 
            type="primary" 
            icon={<SaveOutlined />} 
            onClick={handleSaveAll}
          >
            保存所有
          </Button>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleCreateProfile}
          >
            新建配置
          </Button>
        </Space>
      </div>
      
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={16}>
          <Col span={12}>
            <Typography.Title level={5}>使用说明</Typography.Title>
            <ul>
              <li>在这里可以管理个人参数默认值</li>
              <li>配置的默认值会在执行流程时自动填充</li>
              <li>支持导入/导出配置，方便备份和迁移</li>
            </ul>
          </Col>
          <Col span={12}>
            <Typography.Title level={5}>最佳实践</Typography.Title>
            <ul>
              <li>定期更新常用参数的默认值</li>
              <li>为不同业务场景创建不同的配置</li>
              <li>注意保护敏感信息，避免在默认值中存储密码等</li>
            </ul>
          </Col>
        </Row>
      </Card>
      
      <Table 
        columns={columns} 
        dataSource={profiles} 
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
      
      <Modal
        title={editingProfile ? "编辑参数配置" : "新建参数配置"}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="parameterName"
            label="参数名称"
            rules={[{ required: true, message: '请输入参数名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="parameterLabel"
            label="参数标签"
            rules={[{ required: true, message: '请输入参数标签' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="defaultValue"
            label="默认值"
            rules={[{ required: true, message: '请输入默认值' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="dataType"
            label="数据类型"
            rules={[{ required: true, message: '请选择数据类型' }]}
          >
            <Select>
              <Select.Option value="string">字符串</Select.Option>
              <Select.Option value="number">数字</Select.Option>
              <Select.Option value="date">日期</Select.Option>
              <Select.Option value="select">选择框</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ParameterProfilesPage;
