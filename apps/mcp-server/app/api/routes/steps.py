from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.step import Step, StepCreate, StepUpdate
from app.services.flow_service import FlowService

router = APIRouter()
flow_service = FlowService()

@router.get("/flow/{flow_id}", response_model=List[Step])
async def list_steps(flow_id: str):
    """获取指定流程的所有步骤"""
    return flow_service.get_steps_by_flow_id(flow_id)

@router.get("/{step_id}", response_model=Step)
async def get_step(step_id: str):
    """根据ID获取步骤详情"""
    step = flow_service.get_step_by_id(step_id)
    if not step:
        raise HTTPException(status_code=404, detail="Step not found")
    return step

@router.post("/", response_model=Step)
async def create_step(step: StepCreate):
    """创建新步骤"""
    return flow_service.create_step(step)

@router.put("/{step_id}", response_model=Step)
async def update_step(step_id: str, step: StepUpdate):
    """更新步骤"""
    updated_step = flow_service.update_step(step_id, step)
    if not updated_step:
        raise HTTPException(status_code=404, detail="Step not found")
    return updated_step

@router.delete("/{step_id}")
async def delete_step(step_id: str):
    """删除步骤"""
    success = flow_service.delete_step(step_id)
    if not success:
        raise HTTPException(status_code=404, detail="Step not found")
    return {"message": "Step deleted successfully"}
