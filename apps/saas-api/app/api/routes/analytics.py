from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from datetime import datetime
from app.schemas.analytics import (
    ProcessStats, 
    TemplateUsage, 
    TenantStats, 
    ErrorAnalysis,
    OptimizationSuggestion
)
from app.services.analytics_service import AnalyticsService

router = APIRouter()
analytics_service = AnalyticsService()

@router.get("/process-stats", response_model=List[ProcessStats])
async def get_process_stats(
    tenant_id: Optional[str] = None,
    template_id: Optional[str] = None,
    start_time: Optional[datetime] = None,
    end_time: Optional[datetime] = None
):
    """获取流程统计信息"""
    return analytics_service.get_process_stats(tenant_id, template_id, start_time, end_time)

@router.get("/template-usage", response_model=List[TemplateUsage])
async def get_template_usage(
    tenant_id: Optional[str] = None,
    limit: int = Query(100, le=1000)
):
    """获取模板使用情况"""
    return analytics_service.get_template_usage(tenant_id, limit)

@router.get("/tenant-stats", response_model=List[TenantStats])
async def get_tenant_stats(
    start_time: Optional[datetime] = None,
    end_time: Optional[datetime] = None
):
    """获取租户统计信息"""
    return analytics_service.get_tenant_stats(start_time, end_time)

@router.get("/error-analysis", response_model=List[ErrorAnalysis])
async def get_error_analysis(
    tenant_id: Optional[str] = None,
    template_id: Optional[str] = None,
    start_time: Optional[datetime] = None,
    end_time: Optional[datetime] = None
):
    """获取错误分析"""
    return analytics_service.get_error_analysis(tenant_id, template_id, start_time, end_time)

@router.get("/optimization-suggestions", response_model=List[OptimizationSuggestion])
async def get_optimization_suggestions(
    tenant_id: Optional[str] = None,
    template_id: Optional[str] = None
):
    """获取优化建议"""
    return analytics_service.get_optimization_suggestions(tenant_id, template_id)

@router.post("/generate-report")
async def generate_analytics_report(
    tenant_id: Optional[str] = None,
    start_time: Optional[datetime] = None,
    end_time: Optional[datetime] = None
):
    """生成分析报告"""
    try:
        report = analytics_service.generate_report(tenant_id, start_time, end_time)
        return {"message": "Report generated successfully", "report": report}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Report generation failed: {str(e)}")
