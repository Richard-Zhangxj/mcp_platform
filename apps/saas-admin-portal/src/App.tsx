import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import MainLayout from '@components/layout/MainLayout';
import DashboardPage from '@pages/Dashboard/DashboardPage';
import TenantsPage from '@pages/Tenants/TenantsPage';
import KnowledgePage from '@pages/Knowledge/KnowledgePage';
import TemplatesPage from '@pages/Templates/TemplatesPage';
import LogsPage from '@pages/Logs/LogsPage';
import AnalyticsPage from '@pages/Analytics/AnalyticsPage';
import SystemPage from '@pages/System/SystemPage';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <MainLayout>
      <Content style={{ padding: '24px' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tenants/*" element={<TenantsPage />} />
          <Route path="/knowledge/*" element={<KnowledgePage />} />
          <Route path="/templates/*" element={<TemplatesPage />} />
          <Route path="/logs/*" element={<LogsPage />} />
          <Route path="/analytics/*" element={<AnalyticsPage />} />
          <Route path="/system/*" element={<SystemPage />} />
        </Routes>
      </Content>
    </MainLayout>
  );
};

export default App;
