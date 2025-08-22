import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Switch,
  Space,
  Typography,
  Divider,
  message,
  Popconfirm,
  Tag,
  Card,
  Row,
  Col,
  InputNumber,
  Collapse,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CopyOutlined,
  SearchOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { CollapseProps } from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;

// 定义流程模板类型
interface ProcessTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  version: string;
  dsl: any; // 流程DSL定义
  isPublic: boolean;
  status: 'draft' | 'published' | 'archived';
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

const TemplatesPage: React.FC = () => {
  const [templates, setTemplates] = useState<ProcessTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<ProcessTemplate | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<ProcessTemplate | null>(null);

  // 模拟获取流程模板数据
  const fetchTemplates = async () => {
    setLoading(true);
    try {
      // 在实际应用中，这里会调用 API 获取流程模板数据
      // const response = await templateService.getTemplates();
      // setTemplates(response.data);
      
      // 模拟数据
      const mockTemplates: ProcessTemplate[] = [
        {
          id: '1',
          name: '销售订单处理流程',
          description: '处理销售订单的标准流程',
          category: '销售',
          version: '1.0',
          dsl: { /* 流程DSL定义 */ },
          isPublic: true,
          status: 'published',
          usageCount: 128,
          createdAt: '2023-01-01',
          updatedAt: '2023-01-01',
        },
        {
          id: '2',
          name: '采购订单处理流程',
          description: '处理采购订单的标准流程',
          category: '采购',
          version: '1.0',
          dsl: { /* 流程DSL定义 */ },
          isPublic: true,
          status: 'draft',
          usageCount: 0,
          createdAt: '2023-01-02',
          updatedAt: '2023-01-02',
        },
        {
          id: '3',
          name: '客户主数据维护流程',
          description: '维护客户主数据的流程',
          category: '客户管理',
          version: '1.0',
          dsl: { /* 流程DSL定义 */ },
          isPublic: false,
          status: 'published',
          usageCount: 45,
          createdAt: '2023-01-03',
          updatedAt: '2023-01-03',
        },
      ];
      setTemplates(mockTemplates);
    } catch (error) {
      message.error('获取流程模板数据失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  // 处理创建/编辑流程模板
  const handleFinish = async (values: any) => {
    try {
      if (editingTemplate) {
        // 在实际应用中，这里会调用 API 更新流程模板
        // await templateService.updateTemplate(editingTemplate.id, values);
        message.success('流程模板更新成功');
      } else {
        // 在实际应用中，这里会调用 API 创建流程模板
        // await templateService.createTemplate(values);
        message.success('流程模板创建成功');
      }
      setIsModalVisible(false);
      form.resetFields();
      fetchTemplates();
    } catch (error) {
      message.error(editingTemplate ? '流程模板更新失败' : '流程模板创建失败');
    }
  };

  // 处理打开创建/编辑模态框
  const handleOpenModal = (template?: ProcessTemplate) => {
    if (template) {
      setEditingTemplate(template);
      form.setFieldsValue(template);
    } else {
      setEditingTemplate(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  // 处理关闭模态框
  const handleCloseModal = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingTemplate(null);
  };

  // 处理删除流程模板
  const handleDeleteTemplate = async (id: string) => {
    try {
      // 在实际应用中，这里会调用 API 删除流程模板
      // await templateService.deleteTemplate(id);
      message.success('流程模板删除成功');
      fetchTemplates();
    } catch (error) {
      message.error('流程模板删除失败');
    }
  };

  // 处理发布流程模板
  const handlePublishTemplate = async (id: string) => {
    try {
      // 在实际应用中，这里会调用 API 发布流程模板
      // await templateService.publishTemplate(id);
      message.success('流程模板发布成功');
      fetchTemplates();
    } catch (error) {
      message.error('流程模板发布失败');
    }
  };

  // 处理取消发布流程模板
  const handleUnpublishTemplate = async (id: string) => {
    try {
      // 在实际应用中，这里会调用 API 取消发布流程模板
      // await templateService.unpublishTemplate(id);
      message.success('流程模板取消发布成功');
      fetchTemplates();
    } catch (error) {
      message.error('流程模板取消发布失败');
    }
  };

  // 处理复制流程模板
  const handleCopyTemplate = async (id: string) => {
    try {
      // 在实际应用中，这里会调用 API 复制流程模板
      // const response = await templateService.copyTemplate(id);
      // setTemplates([...templates, response.data]);
      message.success('流程模板复制成功');
      fetchTemplates();
    } catch (error) {
      message.error('流程模板复制失败');
    }
  };

  // 处理预览流程模板
  const handlePreviewTemplate = (template: ProcessTemplate) => {
    setPreviewTemplate(template);
    setPreviewModalVisible(true);
  };

  // 处理关闭预览模态框
  const handleClosePreviewModal = () => {
    setPreviewModalVisible(false);
    setPreviewTemplate(null);
  };

  // 处理搜索
  const handleSearch = () => {
    // 在实际应用中，这里会调用 API 搜索流程模板
    // const results = await templateService.searchTemplates(searchText, selectedCategory, selectedStatus);
    // setTemplates(results);
    message.success('搜索完成');
  };

  // 处理重置搜索
  const handleResetSearch = () => {
    setSearchText('');
    setSelectedCategory(undefined);
    setSelectedStatus(undefined);
    fetchTemplates();
  };

  // 定义表格列
  const columns: ColumnsType<ProcessTemplate> = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      filters: [
        { text: '销售', value: '销售' },
        { text: '采购', value: '采购' },
        { text: '客户管理', value: '客户管理' },
        { text: '供应商管理', value: '供应商管理' },
      ],
      onFilter: (value, record) => record.category === value,
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
      filters: [
        { text: '草稿', value: 'draft' },
        { text: '已发布', value: 'published' },
        { text: '已归档', value: 'archived' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: '公开',
      dataIndex: 'isPublic',
      key: 'isPublic',
      render: (isPublic: boolean) => (
        <Switch checked={isPublic} disabled />
      ),
      filters: [
        { text: '公开', value: 'true' },
        { text: '私有', value: 'false' },
      ],
      onFilter: (value, record) => record.isPublic.toString() === value,
    },
    {
      title: '使用次数',
      dataIndex: 'usageCount',
      key: 'usageCount',
      sorter: (a, b) => a.usageCount - b.usageCount,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<EyeOutlined />} 
            onClick={() => handlePreviewTemplate(record)}
            size="small"
          >
            预览
          </Button>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => handleOpenModal(record)}
            size="small"
          >
            编辑
          </Button>
          <Button 
            icon={<CopyOutlined />} 
            onClick={() => handleCopyTemplate(record.id)}
            size="small"
          >
            复制
          </Button>
          {record.status === 'draft' && (
            <Button 
              type="primary" 
              icon={<PlayCircleOutlined />} 
              onClick={() => handlePublishTemplate(record.id)}
              size="small"
            >
              发布
            </Button>
          )}
          {record.status === 'published' && (
            <Button 
              danger 
              icon={<PlayCircleOutlined />} 
              onClick={() => handleUnpublishTemplate(record.id)}
              size="small"
            >
              取消发布
            </Button>
          )}
          <Popconfirm
            title="确认删除"
            description="确定要删除这个流程模板吗？"
            onConfirm={() => handleDeleteTemplate(record.id)}
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

  // 预览面板项
  const previewItems: CollapseProps['items'] = [
    {
      key: '1',
      label: '基本信息',
      children: previewTemplate ? (
        <div>
          <p><Text strong>名称:</Text> {previewTemplate.name}</p>
          <p><Text strong>描述:</Text> {previewTemplate.description}</p>
          <p><Text strong>分类:</Text> {previewTemplate.category}</p>
          <p><Text strong>版本:</Text> {previewTemplate.version}</p>
          <p><Text strong>状态:</Text> {previewTemplate.status}</p>
          <p><Text strong>公开:</Text> {previewTemplate.isPublic ? '是' : '否'}</p>
          <p><Text strong>使用次数:</Text> {previewTemplate.usageCount}</p>
        </div>
      ) : null,
    },
    {
      key: '2',
      label: '流程DSL',
      children: previewTemplate ? (
        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          {JSON.stringify(previewTemplate.dsl, null, 2)}
        </pre>
      ) : null,
    },
  ];

  return (
    <div>
      <Title level={2}>流程模板管理</Title>
      <Divider />
      
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={16} align="middle">
          <Col span={6}>
            <Input
              placeholder="搜索模板名称或描述"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              suffix={<SearchOutlined />}
            />
          </Col>
          <Col span={4}>
            <Select
              placeholder="选择分类"
              style={{ width: '100%' }}
              value={selectedCategory}
              onChange={setSelectedCategory}
              allowClear
            >
              <Option value="销售">销售</Option>
              <Option value="采购">采购</Option>
              <Option value="客户管理">客户管理</Option>
              <Option value="供应商管理">供应商管理</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Select
              placeholder="选择状态"
              style={{ width: '100%' }}
              value={selectedStatus}
              onChange={setSelectedStatus}
              allowClear
            >
              <Option value="draft">草稿</Option>
              <Option value="published">已发布</Option>
              <Option value="archived">已归档</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
              搜索
            </Button>
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            <Space>
              <Button onClick={handleResetSearch}>
                重置
              </Button>
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={() => handleOpenModal()}
              >
                新建模板
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>
      
      <Table 
        columns={columns} 
        dataSource={templates} 
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1200 }}
      />
      
      {/* 创建/编辑流程模板模态框 */}
      <Modal
        title={editingTemplate ? "编辑流程模板" : "新建流程模板"}
        open={isModalVisible}
        onOk={() => form.submit()}
        onCancel={handleCloseModal}
        okText="确认"
        cancelText="取消"
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: '请输入模板名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
          >
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item
            name="category"
            label="分类"
            rules={[{ required: true, message: '请选择分类' }]}
          >
            <Select>
              <Option value="销售">销售</Option>
              <Option value="采购">采购</Option>
              <Option value="客户管理">客户管理</Option>
              <Option value="供应商管理">供应商管理</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="version"
            label="版本"
            rules={[{ required: true, message: '请输入版本号' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="isPublic"
            label="是否公开"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
      
      {/* 预览流程模板模态框 */}
      <Modal
        title={`预览流程模板 - ${previewTemplate?.name}`}
        open={previewModalVisible}
        onCancel={handleClosePreviewModal}
        footer={null}
        width={800}
      >
        <Collapse items={previewItems} defaultActiveKey={['1']} />
      </Modal>
    </div>
  );
};

export default TemplatesPage;
