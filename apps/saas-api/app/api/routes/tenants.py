from fastapi import APIRouter, HTTPException, Query, Depends
from typing import List, Optional
from app.schemas.tenant import Tenant, TenantCreate, TenantUpdate, APIKey
from app.services.tenant_service import TenantService
from app.core.security import create_api_key, verify_api_key

router = APIRouter()
tenant_service = TenantService()

@router.get("/", response_model=List[Tenant])
async def list_tenants(
    skip: int = 0,
    limit: int = Query(100, le=1000),
    name: Optional[str] = None
):
    """获取租户列表"""
    return tenant_service.get_tenants(skip, limit, name)

@router.get("/{tenant_id}", response_model=Tenant)
async def get_tenant(tenant_id: str):
    """根据ID获取租户详情"""
    tenant = tenant_service.get_tenant_by_id(tenant_id)
    if not tenant:
        raise HTTPException(status_code=404, detail="Tenant not found")
    return tenant

@router.post("/", response_model=Tenant)
async def create_tenant(tenant: TenantCreate):
    """创建新租户"""
    return tenant_service.create_tenant(tenant)

@router.put("/{tenant_id}", response_model=Tenant)
async def update_tenant(tenant_id: str, tenant: TenantUpdate):
    """更新租户"""
    updated_tenant = tenant_service.update_tenant(tenant_id, tenant)
    if not updated_tenant:
        raise HTTPException(status_code=404, detail="Tenant not found")
    return updated_tenant

@router.delete("/{tenant_id}")
async def delete_tenant(tenant_id: str):
    """删除租户"""
    success = tenant_service.delete_tenant(tenant_id)
    if not success:
        raise HTTPException(status_code=404, detail="Tenant not found")
    return {"message": "Tenant deleted successfully"}

@router.post("/{tenant_id}/api-keys", response_model=APIKey)
async def create_api_key_for_tenant(tenant_id: str):
    """为租户创建API密钥"""
    tenant = tenant_service.get_tenant_by_id(tenant_id)
    if not tenant:
        raise HTTPException(status_code=404, detail="Tenant not found")
    
    key = create_api_key()
    api_key = tenant_service.create_api_key(tenant_id, key)
    return api_key

@router.get("/{tenant_id}/api-keys", response_model=List[APIKey])
async def list_api_keys_for_tenant(tenant_id: str):
    """获取租户的API密钥列表"""
    tenant = tenant_service.get_tenant_by_id(tenant_id)
    if not tenant:
        raise HTTPException(status_code=404, detail="Tenant not found")
    
    return tenant_service.get_api_keys_for_tenant(tenant_id)

@router.delete("/{tenant_id}/api-keys/{key_id}")
async def revoke_api_key(tenant_id: str, key_id: str):
    """撤销租户的API密钥"""
    tenant = tenant_service.get_tenant_by_id(tenant_id)
    if not tenant:
        raise HTTPException(status_code=404, detail="Tenant not found")
    
    success = tenant_service.revoke_api_key(tenant_id, key_id)
    if not success:
        raise HTTPException(status_code=404, detail="API key not found")
    
    return {"message": "API key revoked successfully"}
