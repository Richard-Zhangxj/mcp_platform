import React, { useState } from 'react';
import { Layout, Menu, theme, Typography } from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  BookOutlined,
  FileTextOutlined,
  FileSearchOutlined,
  BarChartOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const { Header, Sider, Content, Footer } = Layout;
const { Title } = Typography;

interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: React.ReactNode;
  path?: string;
  children?: MenuItem[];
}

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems: MenuItem[] = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">仪表板</Link>,
      path: '/dashboard',
    },
    {
      key: 'tenants',
      icon: <TeamOutlined />,
      label: <Link to="/tenants">租户管理</Link>,
      path: '/tenants',
    },
    {
      key: 'knowledge',
      icon: <BookOutlined />,
      label: <Link to="/knowledge">知识库管理</Link>,
      path: '/knowledge',
    },
    {
      key: 'templates',
      icon: <FileTextOutlined />,
      label: <Link to="/templates">模板管理</Link>,
      path: '/templates',
    },
    {
      key: 'logs',
      icon: <FileSearchOutlined />,
      label: <Link to="/logs">日志监控</Link>,
      path: '/logs',
    },
    {
      key: 'analytics',
      icon: <BarChartOutlined />,
      label: <Link to="/analytics">数据分析</Link>,
      path: '/analytics',
    },
    {
      key: 'system',
      icon: <SettingOutlined />,
      label: <Link to="/system">系统管理</Link>,
      path: '/system',
    },
  ];

  // 根据当前路径确定选中的菜单项
  const getSelectedKeys = () => {
    const path = location.pathname;
    const selectedItem = menuItems.find(item => path.startsWith(item.path || ''));
    return selectedItem ? [selectedItem.key] : ['dashboard'];
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="demo-logo-vertical" />
        <Title level={4} style={{ color: 'white', textAlign: 'center', padding: '16px 0' }}>
          {collapsed ? 'SaaS' : 'SaaS 管理门户'}
        </Title>
        <Menu
          theme="dark"
          defaultSelectedKeys={['dashboard']}
          selectedKeys={getSelectedKeys()}
          mode="inline"
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px' }}>
            <Title level={3} style={{ margin: 0 }}>云服务商管理平台</Title>
            <div>
              {/* 用户信息和退出登录按钮可以放在这里 */}
            </div>
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          SaaS Admin Portal ©{new Date().getFullYear()} Created by Cloud Provider
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
