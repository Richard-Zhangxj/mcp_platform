from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class KnowledgeItemBase(BaseModel):
    title: str
    content: str
    category: str
    tags: List[str] = []
    is_public: bool = True

class KnowledgeItemCreate(KnowledgeItemBase):
    pass

class KnowledgeItemUpdate(KnowledgeItemBase):
    title: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    is_public: Optional[bool] = None

class KnowledgeItem(KnowledgeItemBase):
    id: str
    tenant_id: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    is_vectorized: bool = False

    class Config:
        orm_mode = True
