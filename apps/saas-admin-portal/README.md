# SaaS 管理门户

SaaS 管理门户是 SAP MCP 混合部署解决方案的云端管理界面，用于管理租户、知识库、流程模板、日志和数据分析等功能。

## 功能特性

- **仪表板**: 系统概览和关键指标展示
- **租户管理**: 租户和API密钥管理
- **知识库管理**: 知识条目的增删改查和向量化
- **流程模板管理**: 流程模板的创建、发布和复制
- **日志监控**: 日志查询、分析和导出
- **数据分析**: 流程执行统计、错误分析和优化建议
- **系统管理**: 系统状态监控、配置管理和维护操作

## 技术栈

- **主框架**: React 18 + TypeScript
- **UI 库**: Ant Design
- **状态管理**: React Hooks
- **路由**: React Router v6
- **HTTP 客户端**: Axios
- **构建工具**: Vite
- **代码规范**: ESLint + Prettier

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

开发服务器将启动在 `http://localhost:3002`。

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist` 目录中。

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
src/
├── components/      # 公共组件
│   └── layout/     # 布局组件
├── pages/          # 页面组件
│   ├── Dashboard/  # 仪表板页面
│   ├── Tenants/    # 租户管理页面
│   ├── Knowledge/  # 知识库管理页面
│   ├── Templates/  # 流程模板页面
│   ├── Logs/        # 日志监控页面
│   ├── Analytics/   # 数据分析页面
│   └── System/     # 系统管理页面
├── hooks/          # 自定义 Hooks
├── services/        # API 服务
├── utils/          # 工具函数
├── styles/         # 样式文件
├── App.tsx         # 根组件
└── main.tsx        # 入口文件
```

## 环境变量

在 `.env` 文件中配置环境变量：

```env
# 应用配置
VITE_APP_NAME=SaaS Admin Portal
VITE_APP_VERSION=0.1.0

# API 配置
VITE_API_BASE_URL=http://localhost:8001/api/v1
VITE_API_TIMEOUT=10000
```

## 开发指南

### 添加新页面

1. 在 `src/pages` 目录下创建新的页面组件
2. 在 `src/App.tsx` 中添加路由配置

### 添加新组件

1. 在 `src/components` 目录下创建新的组件
2. 在需要使用的页面中导入并使用组件

### 添加新服务

1. 在 `src/services` 目录下创建新的服务文件
2. 实现相应的 API 调用方法
3. 在需要使用的页面或组件中导入并使用服务

## API 接口

### 租户管理

- `GET /tenants` - 获取租户列表
- `GET /tenants/{id}` - 根据ID获取租户详情
- `POST /tenants` - 创建新租户
- `PUT /tenants/{id}` - 更新租户
- `DELETE /tenants/{id}` - 删除租户
- `POST /tenants/{id}/api-keys` - 为租户创建API密钥
- `GET /tenants/{id}/api-keys` - 获取租户的API密钥列表
- `DELETE /tenants/{id}/api-keys/{key_id}` - 删除租户的API密钥

### 知识库管理

- `GET /knowledge` - 获取知识库条目列表
- `GET /knowledge/{id}` - 根据ID获取知识库条目详情
- `POST /knowledge` - 创建新知识库条目
- `PUT /knowledge/{id}` - 更新知识库条目
- `DELETE /knowledge/{id}` - 删除知识库条目
- `POST /knowledge/search` - 搜索知识库条目
- `POST /knowledge/{id}/vectorize` - 对知识库条目进行向量化

### 流程模板管理

- `GET /templates` - 获取流程模板列表
- `GET /templates/{id}` - 根据ID获取流程模板详情
- `POST /templates` - 创建新流程模板
- `PUT /templates/{id}` - 更新流程模板
- `DELETE /templates/{id}` - 删除流程模板
- `POST /templates/{id}/publish` - 发布流程模板
- `POST /templates/{id}/unpublish` - 取消发布流程模板
- `POST /templates/{id}/copy` - 复制流程模板

### 日志管理

- `GET /logs` - 获取日志列表
- `GET /logs/{id}` - 根据ID获取日志详情
- `POST /logs/search` - 搜索日志
- `GET /logs/stats` - 获取日志统计信息
- `GET /logs/errors` - 获取错误分析
- `POST /logs/export` - 导出日志

### 数据分析

- `GET /analytics/process-stats` - 获取流程统计信息
- `GET /analytics/template-usage` - 获取模板使用情况
- `GET /analytics/tenant-stats` - 获取租户统计信息
- `GET /analytics/error-analysis` - 获取错误分析
- `GET /analytics/optimization-suggestions` - 获取优化建议
- `POST /analytics/generate-report` - 生成分析报告
- `POST /analytics/export-report` - 导出分析报告

### 系统管理

- `GET /system/status` - 获取系统状态
- `GET /system/user-stats` - 获取用户统计
- `GET /system/api-stats` - 获取API统计
- `GET /system/config` - 获取系统配置
- `PUT /system/config` - 更新系统配置
- `GET /system/info` - 获取系统信息
- `POST /system/restart` - 重启系统服务
- `POST /system/clear-cache` - 清除缓存
- `POST /system/gc` - 执行垃圾回收

## 部署

### Docker 部署

```bash
docker build -t saas-admin-portal .
docker run -p 3002:3002 saas-admin-portal
```

### Kubernetes 部署

```bash
kubectl apply -f k8s/deployment.yaml
