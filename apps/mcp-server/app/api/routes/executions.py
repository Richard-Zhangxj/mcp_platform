from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.execution import Execution, ExecutionCreate, ExecutionUpdate
from app.services.flow_service import FlowService

router = APIRouter()
flow_service = FlowService()

@router.get("/flow/{flow_id}", response_model=List[Execution])
async def list_executions(flow_id: str):
    """获取指定流程的所有执行实例"""
    return flow_service.get_executions_by_flow_id(flow_id)

@router.get("/{execution_id}", response_model=Execution)
async def get_execution(execution_id: str):
    """根据ID获取执行实例详情"""
    execution = flow_service.get_execution_by_id(execution_id)
    if not execution:
        raise HTTPException(status_code=404, detail="Execution not found")
    return execution

@router.post("/", response_model=Execution)
async def start_execution(execution: ExecutionCreate):
    """启动新流程执行"""
    return flow_service.start_execution(execution)

@router.put("/{execution_id}", response_model=Execution)
async def update_execution(execution_id: str, execution: ExecutionUpdate):
    """更新执行实例"""
    updated_execution = flow_service.update_execution(execution_id, execution)
    if not updated_execution:
        raise HTTPException(status_code=404, detail="Execution not found")
    return updated_execution

@router.delete("/{execution_id}")
async def cancel_execution(execution_id: str):
    """取消执行实例"""
    success = flow_service.cancel_execution(execution_id)
    if not success:
        raise HTTPException(status_code=404, detail="Execution not found")
    return {"message": "Execution cancelled successfully"}

@router.post("/{execution_id}/execute_step")
async def execute_step(execution_id: str, step_id: str, parameters: dict):
    """执行指定步骤"""
    result = flow_service.execute_step(execution_id, step_id, parameters)
    if not result:
        raise HTTPException(status_code=404, detail="Execution or step not found")
    return result
