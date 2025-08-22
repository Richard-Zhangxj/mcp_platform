# MCP Server

MCP Server 是 SAP MCP 混合部署解决方案的后端服务，负责与 SAP 系统进行 RFC 调用和流程管理。

## 功能特性

- **RFC 调用**: 通过 pyRFC 库与 SAP 系统进行 RFC 调用
- **流程管理**: 支持流程的创建、更新、删除和执行
- **步骤管理**: 支持流程步骤的管理
- **执行管理**: 支持流程执行实例的管理
- **日志记录**: 记录流程执行的详细日志

## 技术栈

- **主框架**: FastAPI (Python)
- **SAP 集成**: pyRFC
- **数据库**: PostgreSQL, Redis

## 快速开始

### 安装依赖

```bash
pip install -r requirements.txt
```

### 启动服务

```bash
python app/main.py
```

服务将启动在 `http://localhost:8000`。

### API 文档

启动服务后，可以通过以下地址访问 API 文档：

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API 接口

### 流程管理

- `GET /flows` - 获取所有流程列表
- `GET /flows/{flow_id}` - 根据ID获取流程详情
- `POST /flows` - 创建新流程
- `PUT /flows/{flow_id}` - 更新流程
- `DELETE /flows/{flow_id}` - 删除流程

### 步骤管理

- `GET /steps/flow/{flow_id}` - 获取指定流程的所有步骤
- `GET /steps/{step_id}` - 根据ID获取步骤详情
- `POST /steps` - 创建新步骤
- `PUT /steps/{step_id}` - 更新步骤
- `DELETE /steps/{step_id}` - 删除步骤

### 执行管理

- `GET /executions/flow/{flow_id}` - 获取指定流程的所有执行实例
- `GET /executions/{execution_id}` - 根据ID获取执行实例详情
- `POST /executions` - 启动新流程执行
- `PUT /executions/{execution_id}` - 更新执行实例
- `DELETE /executions/{execution_id}` - 取消执行实例
- `POST /executions/{execution_id}/execute_step` - 执行指定步骤

### 日志管理

- `GET /logs/execution/{execution_id}` - 根据执行实例ID获取日志列表
- `GET /logs/{log_id}` - 根据ID获取日志详情
- `POST /logs` - 创建新日志
- `GET /logs/search` - 搜索日志

## 开发指南

### 项目结构

```
app/
├── main.py          # 应用入口点
├── api/             # API 路由
│   └── routes/      # 路由定义
├── core/            # 核心配置
├── models/          # 数据模型
├── schemas/         # Pydantic 模型
├── services/        # 业务逻辑
└── utils/           # 工具函数
```

### 测试

运行测试：

```bash
python -m unittest tests/test_rfc_service.py
```

## 配置

在 `.env` 文件中配置环境变量：

```env
SAP_ASHOST=your_sap_host
SAP_SYSNR=your_sap_system_number
SAP_CLIENT=your_sap_client
SAP_USER=your_sap_username
SAP_PASSWD=your_sap_password
