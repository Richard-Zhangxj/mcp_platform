import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'antd/dist/reset.css';

// 页面组件
import FlowListPage from './pages/FlowListPage';
import FlowDesignerPage from './pages/FlowDesignerPage';
import ExecutionListPage from './pages/ExecutionListPage';
import LogListPage from './pages/LogListPage';

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Routes>
          <Route path="/" element={<FlowListPage />} />
          <Route path="/flows" element={<FlowListPage />} />
          <Route path="/flows/designer/:id" element={<FlowDesignerPage />} />
          <Route path="/executions" element={<ExecutionListPage />} />
          <Route path="/logs" element={<LogListPage />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;
