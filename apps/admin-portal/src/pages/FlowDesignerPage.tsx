import React, { useState, useEffect } from 'react';
import { Button, Card, Space, Modal, Form, Input, Select, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  PlayCircleOutlined, 
  SaveOutlined, 
  UndoOutlined, 
  RedoOutlined,
  PlusOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';

// 节点类型
const nodeTypes = {
  // 在实际应用中，这里会定义不同类型的节点组件
};

// 边类型
const edgeTypes = {
  // 在实际应用中，这里会定义不同类型的边组件
};

const FlowDesignerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isStepModalVisible, setIsStepModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingStep, setEditingStep] = useState<any>(null);

  // 模拟获取流程数据
  const fetchFlowData = async () => {
    try {
      // 在实际应用中，这里会调用 API 获取流程数据
      // const response = await flowService.getFlowById(id);
      // 初始化节点和边
      
      // 模拟数据
      const initialNodes = [
        {
          id: '1',
          type: 'input',
          data: { label: '开始' },
          position: { x: 0, y: 0 },
        },
        {
          id: '2',
          data: { label: 'RFC调用' },
          position: { x: 0, y: 100 },
        },
        {
          id: '3',
          type: 'output',
          data: { label: '结束' },
          position: { x: 0, y: 200 },
        },
      ];
      
      const initialEdges = [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
      ];
      
      setNodes(initialNodes);
      setEdges(initialEdges);
    } catch (error) {
      message.error('获取流程数据失败');
    }
  };

  useEffect(() => {
    if (id) {
      fetchFlowData();
    }
  }, [id]);

  const onConnect = (params: any) => {
    setEdges((eds) => addEdge(params, eds));
  };

  const handleAddNode = () => {
    // 添加新节点的逻辑
    const newNode = {
      id: `${nodes.length + 1}`,
      data: { label: '新步骤' },
      position: { x: Math.random() * 500, y: Math.random() * 500 },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const handleDeleteNode = (nodeId: string) => {
    // 删除节点的逻辑
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  };

  const handleEditNode = (node: any) => {
    setEditingStep(node);
    form.setFieldsValue(node.data);
    setIsStepModalVisible(true);
  };

  const handleStartExecution = () => {
    // 启动流程执行的逻辑
    message.success('流程执行已启动');
  };

  const handleSaveFlow = async () => {
    try {
      // 保存流程的逻辑
      // const flowData = { nodes, edges };
      // await flowService.updateFlow(id, flowData);
      message.success('流程保存成功');
    } catch (error) {
      message.error('流程保存失败');
    }
  };

  const handleStepModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingStep) {
        // 更新节点数据
        setNodes((nds) =>
          nds.map((node) =>
            node.id === editingStep.id
              ? { ...node, data: { ...node.data, ...values } }
              : node
          )
        );
        message.success('步骤更新成功');
      }
      
      setIsStepModalVisible(false);
    } catch (error) {
      message.error('操作失败');
    }
  };

  const handleStepModalCancel = () => {
    setIsStepModalVisible(false);
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Panel position="top-center">
        <Space>
          <Button 
            type="primary" 
            icon={<PlayCircleOutlined />} 
            onClick={handleStartExecution}
          >
            执行流程
          </Button>
          <Button 
            icon={<SaveOutlined />} 
            onClick={handleSaveFlow}
          >
            保存流程
          </Button>
          <Button 
            icon={<PlusOutlined />} 
            onClick={handleAddNode}
          >
            添加步骤
          </Button>
          <Button 
            icon={<UndoOutlined />}
          >
            撤销
          </Button>
          <Button 
            icon={<RedoOutlined />}
          >
            重做
          </Button>
        </Space>
      </Panel>
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDoubleClick={(e, node) => handleEditNode(node)}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
      
      <Modal
        title="编辑步骤"
        visible={isStepModalVisible}
        onOk={handleStepModalOk}
        onCancel={handleStepModalCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="label"
            label="步骤名称"
            rules={[{ required: true, message: '请输入步骤名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="步骤类型"
            rules={[{ required: true, message: '请选择步骤类型' }]}
          >
            <Select>
              <Select.Option value="mcp_call">RFC调用</Select.Option>
              <Select.Option value="condition">条件判断</Select.Option>
              <Select.Option value="loop">循环</Select.Option>
              <Select.Option value="input">输入</Select.Option>
              <Select.Option value="output">输出</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FlowDesignerPage;
