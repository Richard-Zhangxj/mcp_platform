from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class ProcessTemplateBase(BaseModel):
    name: str
    description: Optional[str] = None
    category: str
    dsl: Dict[str, Any]
    version: str = "1.0"
    is_public: bool = True
    tags: List[str] = []

class ProcessTemplateCreate(ProcessTemplateBase):
    pass

class ProcessTemplateUpdate(ProcessTemplateBase):
    name: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    dsl: Optional[Dict[str, Any]] = None
    version: Optional[str] = None
    is_public: Optional[bool] = None
    tags: Optional[List[str]] = None

class ProcessTemplate(ProcessTemplateBase):
    id: str
    tenant_id: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    status: str = "draft"  # draft, published, archived
    usage_count: int = 0

    class Config:
        orm_mode = True
