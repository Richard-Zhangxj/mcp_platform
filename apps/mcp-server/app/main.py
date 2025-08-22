from fastapi import FastAPI
from app.api.routes import flows, steps, executions, logs

app = FastAPI(
    title="SAP MCP Server",
    description="SAP MCP 混合部署解决方案的后端服务",
    version="0.1.0"
)

# 注册路由
app.include_router(flows.router, prefix="/flows", tags=["flows"])
app.include_router(steps.router, prefix="/steps", tags=["steps"])
app.include_router(executions.router, prefix="/executions", tags=["executions"])
app.include_router(logs.router, prefix="/logs", tags=["logs"])

@app.get("/")
async def root():
    return {"message": "Welcome to SAP MCP Server"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
