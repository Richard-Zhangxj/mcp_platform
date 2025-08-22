import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Switch,
  Space,
  Typography,
  Divider,
  message,
  Popconfirm,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, KeyOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

// 定义租户类型
interface Tenant {
  id: string;
  name: string;
  description: string;
  contactEmail: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// 定义 API 密钥类型
interface ApiKey {
  id: string;
  name: string;
  tenantId: string;
  key: string;
  createdAt: string;
  expiresAt: string;
  isActive: boolean;
}

const TenantsPage: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null);
  const [form] = Form.useForm();
  const [apiKeyModalVisible, setApiKeyModalVisible] = useState(false);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  // 模拟获取租户数据
  const fetchTenants = async () => {
    setLoading(true);
    try {
      // 在实际应用中，这里会调用 API 获取租户数据
      // const response = await tenantService.getTenants();
      // setTenants(response.data);
      
      // 模拟数据
      const mockTenants: Tenant[] = [
        {
          id: '1',
          name: 'ABC 公司',
          description: '制造业客户',
          contactEmail: 'contact@abc.com',
          isActive: true,
          createdAt: '2023-01-01',
          updatedAt: '2023-01-01',
        },
        {
          id: '2',
          name: 'XYZ 公司',
          description: '零售业客户',
          contactEmail: 'info@xyz.com',
          isActive: true,
          createdAt: '2023-01-02',
          updatedAt: '2023-01-02',
        },
        {
          id: '3',
          name: 'DEF 公司',
          description: '服务业客户',
          contactEmail: 'support@def.com',
          isActive: false,
          createdAt: '2023-01-03',
          updatedAt: '2023-01-03',
        },
      ];
      setTenants(mockTenants);
    } catch (error) {
      message.error('获取租户数据失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  // 处理创建/编辑租户
  const handleFinish = async (values: any) => {
    try {
      if (editingTenant) {
        // 在实际应用中，这里会调用 API 更新租户
        // await tenantService.updateTenant(editingTenant.id, values);
        message.success('租户更新成功');
      } else {
        // 在实际应用中，这里会调用 API 创建租户
        // await tenantService.createTenant(values);
        message.success('租户创建成功');
      }
      setIsModalVisible(false);
      form.resetFields();
      fetchTenants();
    } catch (error) {
      message.error(editingTenant ? '租户更新失败' : '租户创建失败');
    }
  };

  // 处理打开创建/编辑模态框
  const handleOpenModal = (tenant?: Tenant) => {
    if (tenant) {
      setEditingTenant(tenant);
      form.setFieldsValue(tenant);
    } else {
      setEditingTenant(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  // 处理关闭模态框
  const handleCloseModal = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingTenant(null);
  };

  // 处理删除租户
  const handleDeleteTenant = async (id: string) => {
    try {
      // 在实际应用中，这里会调用 API 删除租户
      // await tenantService.deleteTenant(id);
      message.success('租户删除成功');
      fetchTenants();
    } catch (error) {
      message.error('租户删除失败');
    }
  };

  // 处理打开 API 密钥模态框
  const handleOpenApiKeyModal = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    fetchApiKeys(tenant.id);
    setApiKeyModalVisible(true);
  };

  // 模拟获取 API 密钥数据
  const fetchApiKeys = async (tenantId: string) => {
    try {
      // 在实际应用中，这里会调用 API 获取 API 密钥数据
      // const response = await apiKeyService.getApiKeys(tenantId);
      // setApiKeys(response.data);
      
      // 模拟数据
      const mockApiKeys: ApiKey[] = [
        {
          id: 'key1',
          name: '主密钥',
          tenantId: tenantId,
          key: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          createdAt: '2023-01-01',
          expiresAt: '2024-01-01',
          isActive: true,
        },
        {
          id: 'key2',
          name: '测试密钥',
          tenantId: tenantId,
          key: 'sk-yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',
          createdAt: '2023-01-02',
          expiresAt: '2024-01-02',
          isActive: true,
        },
      ];
      setApiKeys(mockApiKeys);
    } catch (error) {
      message.error('获取 API 密钥失败');
    }
  };

  // 处理创建 API 密钥
  const handleCreateApiKey = async () => {
    try {
      if (!selectedTenant) return;
      
      // 在实际应用中，这里会调用 API 创建 API 密钥
      // const response = await apiKeyService.createApiKey(selectedTenant.id, { name: '新密钥' });
      // setApiKeys([...apiKeys, response.data]);
      
      message.success('API 密钥创建成功');
    } catch (error) {
      message.error('API 密钥创建失败');
    }
  };

  // 处理删除 API 密钥
  const handleDeleteApiKey = async (keyId: string) => {
    try {
      // 在实际应用中，这里会调用 API 删除 API 密钥
      // await apiKeyService.deleteApiKey(keyId);
      // setApiKeys(apiKeys.filter(key => key.id !== keyId));
      
      message.success('API 密钥删除成功');
    } catch (error) {
      message.error('API 密钥删除失败');
    }
  };

  // 定义表格列
  const columns: ColumnsType<Tenant> = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '联系邮箱',
      dataIndex: 'contactEmail',
      key: 'contactEmail',
    },
    {
      title: '状态',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (
        <Switch checked={isActive} disabled />
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={() => handleOpenModal(record)}
            size="small"
          >
            编辑
          </Button>
          <Button 
            icon={<KeyOutlined />} 
            onClick={() => handleOpenApiKeyModal(record)}
            size="small"
          >
            API 密钥
          </Button>
          <Popconfirm
            title="确认删除"
            description="确定要删除这个租户吗？"
            onConfirm={() => handleDeleteTenant(record.id)}
            okText="确认"
            cancelText="取消"
          >
            <Button 
              danger 
              icon={<DeleteOutlined />} 
              size="small"
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>租户管理</Title>
      <Divider />
      
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => handleOpenModal()}
        >
          新建租户
        </Button>
      </div>
      
      <Table 
        columns={columns} 
        dataSource={tenants} 
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
      
      {/* 创建/编辑租户模态框 */}
      <Modal
        title={editingTenant ? "编辑租户" : "新建租户"}
        open={isModalVisible}
        onOk={() => form.submit()}
        onCancel={handleCloseModal}
        okText="确认"
        cancelText="取消"
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: '请输入租户名称' }]}
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
            name="contactEmail"
            label="联系邮箱"
            rules={[{ required: true, message: '请输入联系邮箱' }, { type: 'email', message: '请输入有效的邮箱地址' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="isActive"
            label="是否激活"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
      
      {/* API 密钥管理模态框 */}
      <Modal
        title={`API 密钥管理 - ${selectedTenant?.name}`}
        open={apiKeyModalVisible}
        onCancel={() => setApiKeyModalVisible(false)}
        footer={null}
        width={800}
      >
        <div style={{ marginBottom: 16 }}>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleCreateApiKey}
          >
            创建 API 密钥
          </Button>
        </div>
        
        <Table 
          columns={[
            {
              title: '名称',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '密钥',
              dataIndex: 'key',
              key: 'key',
              render: (key: string) => (
                <span>{key.substring(0, 10)}...{key.substring(key.length - 4)}</span>
              ),
            },
            {
              title: '创建时间',
              dataIndex: 'createdAt',
              key: 'createdAt',
            },
            {
              title: '过期时间',
              dataIndex: 'expiresAt',
              key: 'expiresAt',
            },
            {
              title: '状态',
              dataIndex: 'isActive',
              key: 'isActive',
              render: (isActive: boolean) => (
                <Switch checked={isActive} disabled />
              ),
            },
            {
              title: '操作',
              key: 'action',
              render: (_, record) => (
                <Space size="middle">
                  <Popconfirm
                    title="确认删除"
                    description="确定要删除这个 API 密钥吗？"
                    onConfirm={() => handleDeleteApiKey(record.id)}
                    okText="确认"
                    cancelText="取消"
                  >
                    <Button 
                      danger 
                      icon={<DeleteOutlined />} 
                      size="small"
                    >
                      删除
                    </Button>
                  </Popconfirm>
                </Space>
              ),
            },
          ]} 
          dataSource={apiKeys} 
          rowKey="id"
          pagination={false}
        />
      </Modal>
    </div>
  );
};

export default TenantsPage;
