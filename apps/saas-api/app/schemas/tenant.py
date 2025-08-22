from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class TenantBase(BaseModel):
    name: str
    description: Optional[str] = None
    contact_email: Optional[str] = None
    is_active: bool = True

class TenantCreate(TenantBase):
    pass

class TenantUpdate(TenantBase):
    name: Optional[str] = None
    description: Optional[str] = None
    contact_email: Optional[str] = None
    is_active: Optional[bool] = None

class Tenant(TenantBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class APIKeyBase(BaseModel):
    name: str
    description: Optional[str] = None

class APIKeyCreate(APIKeyBase):
    pass

class APIKey(APIKeyBase):
    id: str
    tenant_id: str
    key_hash: str
    created_at: datetime
    expires_at: Optional[datetime] = None
    is_active: bool = True

    class Config:
        orm_mode = True
