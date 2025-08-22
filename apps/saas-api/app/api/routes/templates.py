from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.schemas.template import ProcessTemplate, ProcessTemplateCreate, ProcessTemplateUpdate
from app.services.template_service import TemplateService

router = APIRouter()
template_service = TemplateService()

@router.get("/", response_model=List[ProcessTemplate])
async def list_templates(
    skip: int = 0,
    limit: int = Query(100, le=1000),
    category: Optional[str] = None,
    search: Optional[str] = None
):
    """获取流程模板列表"""
    return template_service.get_templates(skip, limit, category, search)

@router.get("/{template_id}", response_model=ProcessTemplate)
async def get_template(template_id: str):
    """根据ID获取流程模板详情"""
    template = template_service.get_template_by_id(template_id)
    if not template:
        raise HTTPException(status_code=404, detail="Process template not found")
    return template

@router.post("/", response_model=ProcessTemplate)
async def create_template(template: ProcessTemplateCreate):
    """创建新流程模板"""
    return template_service.create_template(template)

@router.put("/{template_id}", response_model=ProcessTemplate)
async def update_template(template_id: str, template: ProcessTemplateUpdate):
    """更新流程模板"""
    updated_template = template_service.update_template(template_id, template)
    if not updated_template:
        raise HTTPException(status_code=404, detail="Process template not found")
    return updated_template

@router.delete("/{template_id}")
async def delete_template(template_id: str):
    """删除流程模板"""
    success = template_service.delete_template(template_id)
    if not success:
        raise HTTPException(status_code=404, detail="Process template not found")
    return {"message": "Process template deleted successfully"}

@router.post("/{template_id}/publish")
async def publish_template(template_id: str):
    """发布流程模板"""
    try:
        template_service.publish_template(template_id)
        return {"message": "Process template published successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Publish failed: {str(e)}")

@router.post("/{template_id}/unpublish")
async def unpublish_template(template_id: str):
    """取消发布流程模板"""
    try:
        template_service.unpublish_template(template_id)
        return {"message": "Process template unpublished successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unpublish failed: {str(e)}")
