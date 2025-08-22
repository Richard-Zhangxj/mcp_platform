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
  Upload,
  UploadProps,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  DownloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { RcFile } from 'antd/es/upload';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

// 定义知识库条目类型
interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  isPublic: boolean;
  isVectorized: boolean;
  createdAt: string;
  updatedAt: string;
}

const KnowledgePage: React.FC = () => {
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<KnowledgeItem | null>(null);
  const [form] = Form.useForm();
  const [importModalVisible, setImportModalVisible] = useState(false);
  const [fileList, setFileList] = useState<RcFile[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  // 模拟获取知识库条目数据
  const fetchKnowledgeItems = async () => {
    setLoading(true);
    try {
      // 在实际应用中，这里会调用 API 获取知识库条目数据
      // const response = await knowledgeService.getKnowledgeItems();
      // setKnowledgeItems(response.data);
      
      // 模拟数据
      const mockItems: KnowledgeItem[] = [
        {
          id: '1',
          title: 'SAP RFC 调用指南',
          content: '如何正确调用 SAP RFC 函数...',
          category: '技术文档',
          tags: ['SAP', 'RFC', '集成'],
          isPublic: true,
          isVectorized: true,
          createdAt: '2023-01-01',
          updatedAt: '2023-01-01',
        },
        {
          id: '2',
          title: '销售订单处理流程',
          content: '销售订单的标准处理流程...',
          category: '业务流程',
          tags: ['销售', '订单', '流程'],
          isPublic: true,
          isVectorized: false,
          createdAt: '2023-01-02',
          updatedAt: '2023-01-02',
        },
        {
          id: '3',
          title: '采购订单异常处理',
          content: '采购订单异常情况的处理方法...',
          category: '异常处理',
          tags: ['采购', '异常', '处理'],
          isPublic: false,
          isVectorized: true,
          createdAt: '2023-01-03',
          updatedAt: '2023-01-03',
        },
      ];
      setKnowledgeItems(mockItems);
    } catch (error) {
      message.error('获取知识库条目数据失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKnowledgeItems();
  }, []);

  // 处理创建/编辑知识库条目
  const handleFinish = async (values: any) => {
    try {
      if (editingItem) {
        // 在实际应用中，这里会调用 API 更新知识库条目
        // await knowledgeService.updateKnowledgeItem(editingItem.id, values);
        message.success('知识库条目更新成功');
      } else {
        // 在实际应用中，这里会调用 API 创建知识库条目
        // await knowledgeService.createKnowledgeItem(values);
        message.success('知识库条目创建成功');
      }
      setIsModalVisible(false);
      form.resetFields();
      fetchKnowledgeItems();
    } catch (error) {
      message.error(editingItem ? '知识库条目更新失败' : '知识库条目创建失败');
    }
  };

  // 处理打开创建/编辑模态框
  const handleOpenModal = (item?: KnowledgeItem) => {
    if (item) {
      setEditingItem(item);
      form.setFieldsValue({
        ...item,
        tags: item.tags.join(','),
      });
    } else {
      setEditingItem(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  // 处理关闭模态框
  const handleCloseModal = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingItem(null);
  };

  // 处理删除知识库条目
  const handleDeleteItem = async (id: string) => {
    try {
      // 在实际应用中，这里会调用 API 删除知识库条目
      // await knowledgeService.deleteKnowledgeItem(id);
      message.success('知识库条目删除成功');
      fetchKnowledgeItems();
    } catch (error) {
      message.error('知识库条目删除失败');
    }
  };

  // 处理向量化知识库条目
  const handleVectorizeItem = async (id: string) => {
    try {
      // 在实际应用中，这里会调用 API 向量化知识库条目
      // await knowledgeService.vectorizeKnowledgeItem(id);
      message.success('知识库条目向量化成功');
      fetchKnowledgeItems();
    } catch (error) {
      message.error('知识库条目向量化失败');
    }
  };

  // 处理导入文件
  const handleImport = async () => {
    try {
      // 在实际应用中，这里会调用 API 导入文件
      // await knowledgeService.importKnowledgeItems(fileList);
      message.success('知识库条目导入成功');
      setImportModalVisible(false);
      setFileList([]);
      fetchKnowledgeItems();
    } catch (error) {
      message.error('知识库条目导入失败');
    }
  };

  // 文件上传配置
  const uploadProps: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file as RcFile);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file as RcFile]);
      return false;
    },
    fileList,
  };

  // 处理搜索
  const handleSearch = () => {
    // 在实际应用中，这里会调用 API 搜索知识库条目
    // const results = await knowledgeService.searchKnowledgeItems(searchText, selectedCategory);
    // setKnowledgeItems(results);
    message.success('搜索完成');
  };

  // 处理重置搜索
  const handleResetSearch = () => {
    setSearchText('');
    setSelectedCategory(undefined);
    fetchKnowledgeItems();
  };

  // 定义表格列
  const columns: ColumnsType<KnowledgeItem> = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      filters: [
        { text: '技术文档', value: '技术文档' },
        { text: '业务流程', value: '业务流程' },
        { text: '异常处理', value: '异常处理' },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => (
        <>
          {tags.map(tag => (
            <Tag color="blue" key={tag}>{tag}</Tag>
          ))}
        </>
      ),
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
      title: '向量化',
      dataIndex: 'isVectorized',
      key: 'isVectorized',
      render: (isVectorized: boolean) => (
        <Switch checked={isVectorized} disabled />
      ),
      filters: [
        { text: '已向量化', value: 'true' },
        { text: '未向量化', value: 'false' },
      ],
      onFilter: (value, record) => record.isVectorized.toString() === value,
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
            icon={<EditOutlined />} 
            onClick={() => handleOpenModal(record)}
            size="small"
          >
            编辑
          </Button>
          <Button 
            icon={<UploadOutlined />} 
            onClick={() => handleVectorizeItem(record.id)}
            size="small"
            disabled={record.isVectorized}
          >
            向量化
          </Button>
          <Popconfirm
            title="确认删除"
            description="确定要删除这个知识库条目吗？"
            onConfirm={() => handleDeleteItem(record.id)}
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
      <Title level={2}>知识库管理</Title>
      <Divider />
      
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={16} align="middle">
          <Col span={6}>
            <Input
              placeholder="搜索标题或内容"
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
              <Option value="技术文档">技术文档</Option>
              <Option value="业务流程">业务流程</Option>
              <Option value="异常处理">异常处理</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
              搜索
            </Button>
          </Col>
          <Col span={4}>
            <Button onClick={handleResetSearch}>
              重置
            </Button>
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            <Space>
              <Button 
                icon={<UploadOutlined />} 
                onClick={() => setImportModalVisible(true)}
              >
                导入
              </Button>
              <Button 
                icon={<DownloadOutlined />} 
                onClick={() => message.info('导出功能待实现')}
              >
                导出
              </Button>
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={() => handleOpenModal()}
              >
                新建条目
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>
      
      <Table 
        columns={columns} 
        dataSource={knowledgeItems} 
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1200 }}
      />
      
      {/* 创建/编辑知识库条目模态框 */}
      <Modal
        title={editingItem ? "编辑知识库条目" : "新建知识库条目"}
        open={isModalVisible}
        onOk={() => form.submit()}
        onCancel={handleCloseModal}
        okText="确认"
        cancelText="取消"
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="title"
            label="标题"
            rules={[{ required: true, message: '请输入标题' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="分类"
            rules={[{ required: true, message: '请选择分类' }]}
          >
            <Select>
              <Option value="技术文档">技术文档</Option>
              <Option value="业务流程">业务流程</Option>
              <Option value="异常处理">异常处理</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="content"
            label="内容"
            rules={[{ required: true, message: '请输入内容' }]}
          >
            <TextArea rows={6} />
          </Form.Item>
          <Form.Item
            name="tags"
            label="标签"
            help="多个标签请用逗号分隔"
          >
            <Input placeholder="标签1,标签2,标签3" />
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
      
      {/* 导入知识库条目模态框 */}
      <Modal
        title="导入知识库条目"
        open={importModalVisible}
        onOk={handleImport}
        onCancel={() => setImportModalVisible(false)}
        okText="导入"
        cancelText="取消"
      >
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>选择文件</Button>
        </Upload>
        <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
          支持 .txt, .md, .docx 格式的文件
        </Text>
      </Modal>
    </div>
  );
};

export default KnowledgePage;
