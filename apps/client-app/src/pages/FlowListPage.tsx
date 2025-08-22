import React, { useState, useEffect } from 'react';
import { List, Card, Input, Button, Typography, Tag, message } from 'antd';
import { SearchOutlined, StarOutlined, StarFilled } from '@ant-design/icons';

// 类型定义
interface Flow {
  id: string;
  name: string;
  description: string;
  version: string;
  isFavorite: boolean;
  lastExecutedAt: string | null;
}

const FlowListPage: React.FC = () => {
  const [flows, setFlows] = useState<Flow[]>([]);
  const [filteredFlows, setFilteredFlows] = useState<Flow[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  // 模拟获取流程列表
  const fetchFlows = async () => {
    setLoading(true);
    try {
      // 在实际应用中，这里会调用 API 获取流程列表
      // const response = await flowService.getAssignedFlows();
      // setFlows(response.data);
      
      // 模拟数据
      const mockFlows: Flow[] = [
        {
          id: '1',
          name: '销售订单处理流程',
          description: '处理销售订单的完整流程',
          version: '1.0',
          isFavorite: true,
          lastExecutedAt: '2023-01-01 10:00:00',
        },
        {
          id: '2',
          name: '采购订单处理流程',
          description: '处理采购订单的完整流程',
          version: '1.0',
          isFavorite: false,
          lastExecutedAt: null,
        },
        {
          id: '3',
          name: '客户主数据维护流程',
          description: '维护客户主数据的流程',
          version: '1.0',
          isFavorite: false,
          lastExecutedAt: '2023-01-02 11:00:00',
        },
      ];
      setFlows(mockFlows);
      setFilteredFlows(mockFlows);
    } catch (error) {
      message.error('获取流程列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlows();
  }, []);

  useEffect(() => {
    if (searchText) {
      const filtered = flows.filter(
        flow => flow.name.toLowerCase().includes(searchText.toLowerCase()) ||
                flow.description.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredFlows(filtered);
    } else {
      setFilteredFlows(flows);
    }
  }, [searchText, flows]);

  const handleToggleFavorite = (id: string) => {
    setFlows(prevFlows => 
      prevFlows.map(flow => 
        flow.id === id ? { ...flow, isFavorite: !flow.isFavorite } : flow
      )
    );
  };

  const handleExecuteFlow = (id: string) => {
    // 在实际应用中，这里会导航到执行页面
    // navigate(`/flows/execute/${id}`);
    message.success('开始执行流程');
  };

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Typography.Title level={2}>流程选择</Typography.Title>
        <Input
          placeholder="搜索流程..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
      </div>
      
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={filteredFlows}
        loading={loading}
        renderItem={flow => (
          <List.Item>
            <Card
              title={flow.name}
              extra={
                <Button 
                  type="text" 
                  icon={flow.isFavorite ? <StarFilled style={{ color: '#ffd700' }} /> : <StarOutlined />}
                  onClick={() => handleToggleFavorite(flow.id)}
                />
              }
              actions={[
                <Button 
                  type="primary" 
                  onClick={() => handleExecuteFlow(flow.id)}
                  disabled={flow.lastExecutedAt && !flow.lastExecutedAt.includes('2023')}
                >
                  执行
                </Button>
              ]}
            >
              <p>{flow.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Tag>版本: {flow.version}</Tag>
                {flow.lastExecutedAt && (
                  <Tag>上次执行: {flow.lastExecutedAt}</Tag>
                )}
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default FlowListPage;
