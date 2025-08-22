import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Button,
  Space,
  Typography,
  Divider,
  message,
  DatePicker,
  Select,
  Form,
  Input,
} from 'antd';
import {
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  DownloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

// 定义统计数据类型
interface StatsData {
  totalProcesses: number;
  totalExecutions: number;
  successRate: number;
  avgDuration: number;
}

// 定义模板使用情况类型
interface TemplateUsage {
  id: string;
  name: string;
  category: string;
  usageCount: number;
  lastUsed: string;
  avgDuration: number;
}

// 定义租户统计类型
interface TenantStats {
  id: string;
  name: string;
  totalProcesses: number;
  totalExecutions: number;
  activeProcesses: number;
  failedProcesses: number;
}

// 定义错误分析类型
interface ErrorAnalysis {
  id: string;
  templateName: string;
  errorType: string;
  errorMessage: string;
  count: number;
  firstOccurrence: string;
  lastOccurrence: string;
}

const AnalyticsPage: React.FC = () => {
  const [statsData, setStatsData] = useState<StatsData>({
    totalProcesses: 0,
    totalExecutions: 0,
    successRate: 0,
    avgDuration: 0,
  });
  const [templateUsage, setTemplateUsage] = useState<TemplateUsage[]>([]);
  const [tenantStats, setTenantStats] = useState<TenantStats[]>([]);
  const [errorAnalysis, setErrorAnalysis] = useState<ErrorAnalysis[]>([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([null, null]);
  const [searchForm] = Form.useForm();

  // 模拟获取统计数据
  const fetchStatsData = async (params: any = {}) => {
    setLoading(true);
    try {
      // 在实际应用中，这里会调用 API 获取统计数据
      // const response = await analyticsService.getStatsData(params);
      // setStatsData(response.data);
      
      // 模拟数据
      setStatsData({
        totalProcesses: 128,
        totalExecutions: 1240,
        successRate: 92.5,
        avgDuration: 120.5,
      });
    } catch (error) {
      message.error('获取统计数据失败');
    } finally {
      setLoading(false);
    }
  };

  // 模拟获取模板使用情况
  const fetchTemplateUsage = async (params: any = {}) => {
    try {
      // 在实际应用中，这里会调用 API 获取模板使用情况
      // const response = await analyticsService.getTemplateUsage(params);
      // setTemplateUsage(response.data);
      
      // 模拟数据
      setTemplateUsage([
        {
          id: '1',
          name: '销售订单处理流程',
          category: '销售',
          usageCount: 560,
          lastUsed: '2023-01-07',
          avgDuration: 120.5,
        },
        {
          id: '2',
          name: '采购订单处理流程',
          category: '采购',
          usageCount: 320,
          lastUsed: '2023-01-07',
          avgDuration: 180.2,
        },
        {
          id: '3',
          name: '客户主数据维护流程',
          category: '客户管理',
          usageCount: 180,
          lastUsed: '2023-01-06',
          avgDuration: 90.8,
        },
        {
          id: '4',
          name: '供应商主数据维护流程',
          category: '供应商管理',
          usageCount: 95,
          lastUsed: '2023-01-05',
          avgDuration: 110.3,
        },
        {
          id: '5',
          name: '库存转移流程',
          category: '库存管理',
          usageCount: 85,
          lastUsed: '2023-01-04',
          avgDuration: 150.7,
        },
      ]);
    } catch (error) {
      message.error('获取模板使用情况失败');
    }
  };

  // 模拟获取租户统计
  const fetchTenantStats = async (params: any = {}) => {
    try {
      // 在实际应用中，这里会调用 API 获取租户统计
      // const response = await analyticsService.getTenantStats(params);
      // setTenantStats(response.data);
      
      // 模拟数据
      setTenantStats([
        {
          id: '1',
          name: 'ABC 公司',
          totalProcesses: 25,
          totalExecutions: 480,
          activeProcesses: 20,
          failedProcesses: 5,
        },
        {
          id: '2',
          name: 'XYZ 公司',
          totalProcesses: 18,
          totalExecutions: 320,
          activeProcesses: 15,
          failedProcesses: 3,
        },
        {
          id: '3',
          name: 'DEF 公司',
          totalProcesses: 12,
          totalExecutions: 180,
          activeProcesses: 10,
          failedProcesses: 2,
        },
      ]);
    } catch (error) {
      message.error('获取租户统计失败');
    }
  };

  // 模拟获取错误分析
  const fetchErrorAnalysis = async (params: any = {}) => {
    try {
      // 在实际应用中，这里会调用 API 获取错误分析
      // const response = await analyticsService.getErrorAnalysis(params);
      // setErrorAnalysis(response.data);
      
      // 模拟数据
      setErrorAnalysis([
        {
          id: '1',
          templateName: '采购订单处理流程',
          errorType: '参数验证错误',
          errorMessage: '缺少必需参数: supplierId',
          count: 12,
          firstOccurrence: '2023-01-01',
          lastOccurrence: '2023-01-07',
        },
        {
          id: '2',
          templateName: '销售订单处理流程',
          errorType: 'SAP RFC 调用错误',
          errorMessage: 'RFC 调用超时',
          count: 8,
          firstOccurrence: '2023-01-02',
          lastOccurrence: '2023-01-06',
        },
        {
          id: '3',
          templateName: '客户主数据维护流程',
          errorType: '数据冲突错误',
          errorMessage: '客户代码已存在',
          count: 5,
          firstOccurrence: '2023-01-03',
          lastOccurrence: '2023-01-05',
        },
      ]);
    } catch (error) {
      message.error('获取错误分析失败');
    }
  };

  // 获取所有数据
  const fetchData = async (params: any = {}) => {
    await Promise.all([
      fetchStatsData(params),
      fetchTemplateUsage(params),
      fetchTenantStats(params),
      fetchErrorAnalysis(params),
    ]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 处理搜索
  const handleSearch = async (values: any) => {
    try {
      const params = {
        ...values,
        startDate: dateRange[0]?.format('YYYY-MM-DD'),
        endDate: dateRange[1]?.format('YYYY-MM-DD'),
      };
      await fetchData(params);
      message.success('搜索完成');
    } catch (error) {
      message.error('搜索失败');
    }
  };

  // 处理重置搜索
  const handleReset = () => {
    searchForm.resetFields();
    setDateRange([null, null]);
    fetchData();
  };

  // 处理导出报告
  const handleExportReport = async () => {
    try {
      // 在实际应用中，这里会调用 API 导出报告
      // await analyticsService.exportReport();
      message.success('报告导出成功');
    } catch (error) {
      message.error('报告导出失败');
    }
  };

  // 处理日期范围变化
  const handleDateRangeChange: RangePickerProps['onChange'] = (dates) => {
    setDateRange(dates || [null, null]);
  };

  // 模板使用情况表格列定义
  const templateUsageColumns: ColumnsType<TemplateUsage> = [
    {
      title: '模板名称',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
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
        { text: '库存管理', value: '库存管理' },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: '使用次数',
      dataIndex: 'usageCount',
      key: 'usageCount',
      sorter: (a, b) => a.usageCount - b.usageCount,
    },
    {
      title: '最后使用时间',
      dataIndex: 'lastUsed',
      key: 'lastUsed',
      sorter: (a, b) => new Date(a.lastUsed).getTime() - new Date(b.lastUsed).getTime(),
    },
    {
      title: '平均执行时间(秒)',
      dataIndex: 'avgDuration',
      key: 'avgDuration',
      sorter: (a, b) => a.avgDuration - b.avgDuration,
      render: (avgDuration: number) => avgDuration.toFixed(1),
    },
  ];

  // 租户统计表格列定义
  const tenantStatsColumns: ColumnsType<TenantStats> = [
    {
      title: '租户名称',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: '总流程数',
      dataIndex: 'totalProcesses',
      key: 'totalProcesses',
      sorter: (a, b) => a.totalProcesses - b.totalProcesses,
    },
    {
      title: '总执行次数',
      dataIndex: 'totalExecutions',
      key: 'totalExecutions',
      sorter: (a, b) => a.totalExecutions - b.totalExecutions,
    },
    {
      title: '活跃流程数',
      dataIndex: 'activeProcesses',
      key: 'activeProcesses',
      sorter: (a, b) => a.activeProcesses - b.activeProcesses,
    },
    {
      title: '失败流程数',
      dataIndex: 'failedProcesses',
      key: 'failedProcesses',
      sorter: (a, b) => a.failedProcesses - b.failedProcesses,
    },
  ];

  // 错误分析表格列定义
  const errorAnalysisColumns: ColumnsType<ErrorAnalysis> = [
    {
      title: '模板名称',
      dataIndex: 'templateName',
      key: 'templateName',
      sorter: (a, b) => a.templateName.localeCompare(b.templateName),
    },
    {
      title: '错误类型',
      dataIndex: 'errorType',
      key: 'errorType',
    },
    {
      title: '错误消息',
      dataIndex: 'errorMessage',
      key: 'errorMessage',
      ellipsis: true,
    },
    {
      title: '发生次数',
      dataIndex: 'count',
      key: 'count',
      sorter: (a, b) => a.count - b.count,
    },
    {
      title: '首次发生时间',
      dataIndex: 'firstOccurrence',
      key: 'firstOccurrence',
      sorter: (a, b) => new Date(a.firstOccurrence).getTime() - new Date(b.firstOccurrence).getTime(),
    },
    {
      title: '最后发生时间',
      dataIndex: 'lastOccurrence',
      key: 'lastOccurrence',
      sorter: (a, b) => new Date(a.lastOccurrence).getTime() - new Date(b.lastOccurrence).getTime(),
    },
  ];

  return (
    <div>
      <Title level={2}>数据分析</Title>
      <Divider />
      
      <Card style={{ marginBottom: 16 }}>
        <Form form={searchForm} layout="vertical" onFinish={handleSearch}>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item name="tenantName" label="租户">
                <Select allowClear>
                  <Option value="ABC 公司">ABC 公司</Option>
                  <Option value="XYZ 公司">XYZ 公司</Option>
                  <Option value="DEF 公司">DEF 公司</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="templateName" label="模板">
                <Input placeholder="输入模板名称" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="时间范围">
                <RangePicker 
                  value={dateRange} 
                  onChange={handleDateRangeChange} 
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={6} style={{ textAlign: 'right', paddingTop: 30 }}>
              <Space>
                <Button onClick={handleReset}>重置</Button>
                <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                  搜索
                </Button>
                <Button icon={<DownloadOutlined />} onClick={handleExportReport}>
                  导出报告
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
      
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总流程数"
              value={statsData.totalProcesses}
              prefix={<BarChartOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="总执行次数"
              value={statsData.totalExecutions}
              prefix={<LineChartOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="成功率"
              value={statsData.successRate}
              precision={1}
              suffix="%"
              prefix={<PieChartOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="平均执行时间(秒)"
              value={statsData.avgDuration}
              precision={1}
              prefix={<LineChartOutlined />}
            />
          </Card>
        </Col>
      </Row>
      
      <Card title="模板使用情况" style={{ marginBottom: 16 }}>
        <Table 
          columns={templateUsageColumns} 
          dataSource={templateUsage} 
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
        />
      </Card>
      
      <Card title="租户统计" style={{ marginBottom: 16 }}>
        <Table 
          columns={tenantStatsColumns} 
          dataSource={tenantStats} 
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
        />
      </Card>
      
      <Card title="错误分析">
        <Table 
          columns={errorAnalysisColumns} 
          dataSource={errorAnalysis} 
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1200 }}
        />
      </Card>
    </div>
  );
};

export default AnalyticsPage;
