import React, { useState, useEffect } from 'react';
import { 
  Steps, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  Button, 
  Card, 
  Typography, 
  Space, 
  Modal, 
  message,
  Timeline,
  Alert
} from 'antd';
import { 
  PlayCircleOutlined, 
  SaveOutlined, 
  DownloadOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

// 类型定义
interface Step {
  id: string;
  name: string;
  description: string;
  parameters: Parameter[];
}

interface Parameter {
  name: string;
  type: 'string' | 'number' | 'date' | 'select' | 'boolean';
  label: string;
  required: boolean;
  defaultValue?: string | number | boolean;
  options?: { label: string; value: string }[];
}

interface ExecutionResult {
  status: 'success' | 'error' | 'warning';
  message: string;
  data?: any;
}

const FlowExecutionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<Step[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [isResultModalVisible, setIsResultModalVisible] = useState(false);

  // 模拟获取流程步骤
  const fetchFlowSteps = async () => {
    setLoading(true);
    try {
      // 在实际应用中，这里会调用 API 获取流程步骤
      // const response = await flowService.getFlowSteps(id);
      // setSteps(response.data);
      
      // 模拟数据
      const mockSteps: Step[] = [
        {
          id: '1',
          name: '输入销售订单基本信息',
          description: '输入销售订单的基本信息',
          parameters: [
            {
              name: 'customer',
              type: 'string',
              label: '客户代码',
              required: true,
              defaultValue: 'C001'
            },
            {
              name: 'salesOrg',
              type: 'select',
              label: '销售组织',
              required: true,
              options: [
                { label: '1000 - 公司1', value: '1000' },
                { label: '2000 - 公司2', value: '2000' }
              ]
            },
            {
              name: 'deliveryDate',
              type: 'date',
              label: '交货日期',
              required: true
            }
          ]
        },
        {
          id: '2',
          name: '输入订单项目',
          description: '输入订单的项目信息',
          parameters: [
            {
              name: 'material',
              type: 'string',
              label: '物料号',
              required: true
            },
            {
              name: 'quantity',
              type: 'number',
              label: '数量',
              required: true
            },
            {
              name: 'price',
              type: 'number',
              label: '单价',
              required: true
            }
          ]
        },
        {
          id: '3',
          name: '确认并提交',
          description: '确认订单信息并提交',
          parameters: [
            {
              name: 'notes',
              type: 'string',
              label: '备注',
              required: false
            }
          ]
        }
      ];
      setSteps(mockSteps);
      
      // 设置默认值
      const defaultValues: Record<string, any> = {};
      mockSteps.forEach(step => {
        step.parameters.forEach(param => {
          if (param.defaultValue !== undefined) {
            defaultValues[param.name] = param.defaultValue;
          }
        });
      });
      form.setFieldsValue(defaultValues);
    } catch (error) {
      message.error('获取流程步骤失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchFlowSteps();
    }
  }, [id]);

  const handleStepChange = (step: number) => {
    // 在实际应用中，这里可以添加表单验证
    setCurrentStep(step);
  };

  const handleSaveDefaults = async () => {
    try {
      const values = await form.validateFields();
      // 在实际应用中，这里会调用 API 保存默认值
      // await parameterService.saveDefaults(values);
      message.success('默认值保存成功');
    } catch (error) {
      message.error('保存默认值失败');
    }
  };

  const handleExecuteStep = async () => {
    try {
      const values = await form.validateFields();
      
      // 在实际应用中，这里会调用 API 执行步骤
      // const response = await executionService.executeStep(id, steps[currentStep].id, values);
      
      // 模拟执行结果
      const mockResult: ExecutionResult = {
        status: 'success',
        message: '步骤执行成功',
        data: {
          salesOrderNumber: 'SO20230001',
          deliveryNumber: 'DL20230001'
        }
      };
      
      setExecutionResult(mockResult);
      setIsResultModalVisible(true);
    } catch (error) {
      const mockResult: ExecutionResult = {
        status: 'error',
        message: '步骤执行失败: 参数验证错误'
      };
      setExecutionResult(mockResult);
      setIsResultModalVisible(true);
    }
  };

  const handleExportResult = () => {
    // 在实际应用中，这里会导出执行结果
    message.success('结果已导出');
  };

  const handleResultModalOk = () => {
    setIsResultModalVisible(false);
    if (executionResult?.status === 'success') {
      // 如果当前步骤不是最后一步，进入下一步
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleResultModalCancel = () => {
    setIsResultModalVisible(false);
  };

  const renderParameter = (param: Parameter) => {
    switch (param.type) {
      case 'string':
        return <Input />;
      case 'number':
        return <Input type="number" />;
      case 'date':
        return <DatePicker style={{ width: '100%' }} />;
      case 'select':
        return (
          <Select>
            {param.options?.map(option => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        );
      case 'boolean':
        return <Select>
          <Select.Option value="true">是</Select.Option>
          <Select.Option value="false">否</Select.Option>
        </Select>;
      default:
        return <Input />;
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Typography.Title level={2}>销售订单处理流程</Typography.Title>
        <Space>
          <Button 
            icon={<SaveOutlined />} 
            onClick={handleSaveDefaults}
          >
            保存默认值
          </Button>
        </Space>
      </div>
      
      <Card style={{ marginBottom: 16 }}>
        <Steps 
          current={currentStep} 
          onChange={handleStepChange}
          items={steps.map(step => ({ key: step.id, title: step.name }))}
        />
      </Card>
      
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <Card title={steps[currentStep]?.name} style={{ marginBottom: 16 }}>
            <p>{steps[currentStep]?.description}</p>
            <Form form={form} layout="vertical">
              {steps[currentStep]?.parameters.map(param => (
                <Form.Item
                  key={param.name}
                  name={param.name}
                  label={param.label}
                  rules={[{ required: param.required, message: `请输入${param.label}` }]}
                  initialValue={param.defaultValue}
                >
                  {renderParameter(param)}
                </Form.Item>
              ))}
            </Form>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <Button 
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} 
                disabled={currentStep === 0}
              >
                上一步
              </Button>
              <Button 
                type="primary" 
                icon={<PlayCircleOutlined />} 
                onClick={handleExecuteStep}
                loading={loading}
              >
                执行
              </Button>
              <Button 
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))} 
                disabled={currentStep === steps.length - 1}
              >
                下一步
              </Button>
            </div>
          </Card>
        </div>
        
        <div style={{ width: 300 }}>
          <Card title="流程信息" style={{ marginBottom: 16 }}>
            <Timeline>
              {steps.map((step, index) => (
                <Timeline.Item 
                  key={step.id} 
                  color={index === currentStep ? 'blue' : index < currentStep ? 'green' : 'gray'}
                >
                  {step.name}
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
          
          <Card title="执行历史">
            <p>暂无执行历史</p>
          </Card>
        </div>
      </div>
      
      <Modal
        title="执行结果"
        visible={isResultModalVisible}
        onOk={handleResultModalOk}
        onCancel={handleResultModalCancel}
        okText="确认"
        cancelText="取消"
        footer={[
          <Button key="export" icon={<DownloadOutlined />} onClick={handleExportResult}>
            导出结果
          </Button>,
          <Button 
            key="ok" 
            type={executionResult?.status === 'success' ? 'primary' : 'default'} 
            onClick={handleResultModalOk}
          >
            确认
          </Button>
        ]}
      >
        {executionResult?.status === 'success' ? (
          <Alert 
            message="执行成功" 
            description={
              <div>
                <p>{executionResult.message}</p>
                {executionResult.data && (
                  <div>
                    <p>销售订单号: {executionResult.data.salesOrderNumber}</p>
                    <p>交货单号: {executionResult.data.deliveryNumber}</p>
                  </div>
                )}
              </div>
            } 
            type="success" 
            showIcon 
          />
        ) : (
          <Alert 
            message="执行失败" 
            description={executionResult?.message} 
            type="error" 
            showIcon 
            icon={<ExclamationCircleOutlined />}
          />
        )}
      </Modal>
    </div>
  );
};

export default FlowExecutionPage;
