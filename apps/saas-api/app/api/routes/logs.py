from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from datetime import datetime
from app.schemas.log import Log, LogCreate, LogSearch
from app.services.log_service import LogService

router = APIRouter()
log_service = LogService()

@router.get("/", response_model=List[Log])
async def list_logs(
    skip: int = 0,
    limit: int = Query(100, le=1000),
    tenant_id: Optional[str] = None,
    template_id: Optional[str] = None,
    level: Optional[str] = None,
    start_time: Optional[datetime] = None,
    end_time: Optional[datetime] = None
):
    """获取日志列表"""
    return log_service.get_logs(skip, limit, tenant_id, template_id, level, start_time, end_time)

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

@router.post("/search", response_model=List[Log])
async def search_logs(search: LogSearch):
    """搜索日志"""
    return log_service.search_logs(search)

@router.get("/aggregate/stats")
async def get_log_stats(
    tenant_id: Optional[str] = None,
    template_id: Optional[str] = None,
    start_time: Optional[datetime] = None,
    end_time: Optional[datetime] = None
):
    """获取日志统计信息"""
    return log_service.get_log_stats(tenant_id, template_id, start_time, end_time)

@router.get("/aggregate/errors")
async def get_error_logs(
    tenant_id: Optional[str] = None,
    template_id: Optional[str] = None,
    limit: int = Query(100, le=1000)
):
    """获取错误日志"""
    return log_service.get_error_logs(tenant_id, template_id, limit)
