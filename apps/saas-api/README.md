# SaaS API

SaaS API 是 SAP MCP 混合部署解决方案的云端服务，提供公共知识库、RAG 检索、流程模板库、租户/API 密钥、日志聚合分析等功能。

## 功能特性

- **知识库管理**: 管理公共和私有知识库条目
- **流程模板**: 创建、发布和管理流程模板
- **租户管理**: 管理多租户和API密钥
- **日志聚合**: 收集和分析执行日志
- **数据分析**: 提供流程执行统计和优化建议

## 技术栈

- **主框架**: FastAPI (Python)
- **数据库**: PostgreSQL, Redis
- **向量数据库**: Milvus/Weaviate/Pinecone (可选)

## 快速开始

### 安装依赖

```bash
pip install -r requirements.txt
```

### 启动服务

```bash
python app/main.py
```

服务将启动在 `http://localhost:8001`。

### API 文档

启动服务后，可以通过以下地址访问 API 文档：

- Swagger UI: `http://localhost:8001/docs`
- ReDoc: `http://localhost:8001/redoc`

## API 接口

### 知识库管理

- `GET /knowledge` - 获取知识库条目列表
- `GET /knowledge/{item_id}` - 根据ID获取知识库条目详情
- `POST /knowledge` - 创建新知识库条目
- `PUT /knowledge/{item_id}` - 更新知识库条目
- `DELETE /knowledge/{item_id}` - 删除知识库条目
- `POST /knowledge/search` - 搜索知识库
- `POST /knowledge/vectorize` - 对知识库条目进行向量化

### 流程模板

- `GET /templates` - 获取流程模板列表
- `GET /templates/{template_id}` - 根据ID获取流程模板详情
- `POST /templates` - 创建新流程模板
- `PUT /templates/{template_id}` - 更新流程模板
- `DELETE /templates/{template_id}` - 删除流程模板
- `POST /templates/{template_id}/publish` - 发布流程模板
- `POST /templates/{template_id}/unpublish` - 取消发布流程模板

### 租户管理

- `GET /tenants` - 获取租户列表
- `GET /tenants/{tenant_id}` - 根据ID获取租户详情
- `POST /tenants` - 创建新租户
- `PUT /tenants/{tenant_id}` - 更新租户
- `DELETE /tenants/{tenant_id}` - 删除租户
- `POST /tenants/{tenant_id}/api-keys` - 为租户创建API密钥
- `GET /tenants/{tenant_id}/api-keys` - 获取租户的API密钥列表
- `DELETE /tenants/{tenant_id}/api-keys/{key_id}` - 撤销租户的API密钥

### 日志管理

- `GET /logs` - 获取日志列表
- `GET /logs/{log_id}` - 根据ID获取日志详情
- `POST /logs` - 创建新日志
- `POST /logs/search` - 搜索日志
- `GET /logs/aggregate/stats` - 获取日志统计信息
- `GET /logs/aggregate/errors` - 获取错误日志

### 数据分析

- `GET /analytics/process-stats` - 获取流程统计信息
- `GET /analytics/template-usage` - 获取模板使用情况
- `GET /analytics/tenant-stats` - 获取租户统计信息
- `GET /analytics/error-analysis` - 获取错误分析
- `GET /analytics/optimization-suggestions` - 获取优化建议
- `POST /analytics/generate-report` - 生成分析报告

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
python -m unittest tests/test_rag_service.py
```

## 配置

在 `.env` 文件中配置环境变量：

```env
DATABASE_URL=postgresql://user:password@localhost:5432/saas_api
REDIS_URL=redis://localhost:6379
