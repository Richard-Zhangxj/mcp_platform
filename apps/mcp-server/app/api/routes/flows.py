from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.flow import Flow, FlowCreate, FlowUpdate
from app.services.flow_service import FlowService

router = APIRouter()
flow_service = FlowService()

@router.get("/", response_model=List[Flow])
async def list_flows():
    """获取所有流程列表"""
    return flow_service.get_all_flows()

@router.get("/{flow_id}", response_model=Flow)
async def get_flow(flow_id: str):
    """根据ID获取流程详情"""
    flow = flow_service.get_flow_by_id(flow_id)
    if not flow:
        raise HTTPException(status_code=404, detail="Flow not found")
    return flow

@router.post("/", response_model=Flow)
async def create_flow(flow: FlowCreate):
    """创建新流程"""
    return flow_service.create_flow(flow)

@router.put("/{flow_id}", response_model=Flow)
async def update_flow(flow_id: str, flow: FlowUpdate):
    """更新流程"""
    updated_flow = flow_service.update_flow(flow_id, flow)
    if not updated_flow:
        raise HTTPException(status_code=404, detail="Flow not found")
    return updated_flow

@router.delete("/{flow_id}")
async def delete_flow(flow_id: str):
    """删除流程"""
    success = flow_service.delete_flow(flow_id)
    if not success:
        raise HTTPException(status_code=404, detail="Flow not found")
    return {"message": "Flow deleted successfully"}
