import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'antd/dist/reset.css';

// 页面组件
import FlowListPage from './pages/FlowListPage';
import FlowExecutionPage from './pages/FlowExecutionPage';
import MyTasksPage from './pages/MyTasksPage';
import ParameterProfilesPage from './pages/ParameterProfilesPage';

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Routes>
          <Route path="/" element={<FlowListPage />} />
          <Route path="/flows" element={<FlowListPage />} />
          <Route path="/flows/execute/:id" element={<FlowExecutionPage />} />
          <Route path="/my-tasks" element={<MyTasksPage />} />
          <Route path="/parameter-profiles" element={<ParameterProfilesPage />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;
