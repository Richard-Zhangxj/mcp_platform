from fastapi import FastAPI
from app.api.routes import knowledge, templates, tenants, logs, analytics

app = FastAPI(
    title="SAP MCP SaaS API",
    description="SAP MCP 混合部署解决方案的云端服务",
    version="0.1.0"
)

# 注册路由
app.include_router(knowledge.router, prefix="/knowledge", tags=["knowledge"])
app.include_router(templates.router, prefix="/templates", tags=["templates"])
app.include_router(tenants.router, prefix="/tenants", tags=["tenants"])
app.include_router(logs.router, prefix="/logs", tags=["logs"])
app.include_router(analytics.router, prefix="/analytics", tags=["analytics"])

@app.get("/")
async def root():
    return {"message": "Welcome to SAP MCP SaaS API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
