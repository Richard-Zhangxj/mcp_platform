# Admin Portal

Admin Portal 是 SAP MCP 混合部署解决方案的管理端前端应用，用于流程设计和管理。

## 功能特性

- **流程管理**: 创建、编辑、删除和发布业务流程
- **流程设计器**: 可视化流程设计工具
- **执行管理**: 查看和管理流程执行实例
- **日志管理**: 查看和搜索执行日志

## 技术栈

- **主框架**: React 18 + TypeScript
- **UI 库**: Ant Design
- **路由**: React Router v6
- **状态管理**: React Hooks
- **流程设计**: React Flow
- **构建工具**: Vite

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

开发服务器将启动在 `http://localhost:3000`。

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
├── pages/           # 页面组件
├── hooks/           # 自定义 Hooks
├── services/        # API 服务
├── utils/           # 工具函数
├── styles/          # 样式文件
├── App.tsx          # 根组件
└── main.tsx         # 入口文件
```

## 页面介绍

### 流程管理页面

- 展示所有流程列表
- 支持创建、编辑、删除流程
- 支持启动流程执行

### 流程设计器页面

- 可视化流程设计工具
- 支持拖拽添加步骤
- 支持连接步骤形成流程
- 支持编辑步骤属性

### 执行管理页面

- 展示所有执行实例列表
- 支持按条件搜索执行实例
- 支持取消运行中的执行实例

### 日志管理页面

- 展示所有执行日志
- 支持按条件搜索日志
- 支持查看日志详情

## 开发指南

### 添加新页面

1. 在 `src/pages` 目录下创建新的页面组件
2. 在 `src/App.tsx` 中添加路由配置
3. 在侧边栏菜单中添加导航链接

### 添加新组件

1. 在 `src/components` 目录下创建新的组件
2. 在需要使用的页面中导入并使用组件

### 添加新服务

1. 在 `src/services` 目录下创建新的服务文件
2. 实现相应的 API 调用方法
3. 在需要使用的页面或组件中导入并使用服务

## 配置

### 环境变量

在 `.env` 文件中配置环境变量：

```env
VITE_API_BASE_URL=http://localhost:8000
```

### 主题定制

通过修改 `src/styles/theme.less` 文件来定制 Ant Design 主题。
