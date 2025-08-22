from fastapi import APIRouter, HTTPException, Query
from typing import List
from app.schemas.log import Log, LogCreate
from app.services.log_service import LogService
from datetime import datetime

router = APIRouter()
log_service = LogService()

@router.get("/execution/{execution_id}", response_model=List[Log])
async def list_logs_by_execution(execution_id: str):
    """根据执行实例ID获取日志列表"""
    return log_service.get_logs_by_execution_id(execution_id)

@router.get("/{log_id}", response_model=Log)
async def get_log(log_id: str):
    """根据ID获取日志详情"""
    log = log_service.get_log_by_id(log_id)
    if not log:
        raise HTTPException(status_code=404, detail="Log not found")
    return log

@router.post("/", response_model=Log)
async def create_log(log: LogCreate):
    """创建新日志"""
    return log_service.create_log(log)

@router.get("/search", response_model=List[Log])
async def search_logs(
    flow_id: str = None,
    execution_id: str = None,
    step_id: str = None,
    user_id: str = None,
    start_time: datetime = None,
    end_time: datetime = None,
    limit: int = Query(100, le=1000)
):
    """搜索日志"""
    return log_service.search_logs(
        flow_id=flow_id,
        execution_id=execution_id,
        step_id=step_id,
        user_id=user_id,
        start_time=start_time,
        end_time=end_time,
        limit=limit
    )
