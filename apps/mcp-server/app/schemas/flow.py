from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class FlowBase(BaseModel):
    name: str
    description: Optional[str] = None
    dsl: dict
    version: str = "1.0"

class FlowCreate(FlowBase):
    pass

class FlowUpdate(FlowBase):
    name: Optional[str] = None
    dsl: Optional[dict] = None
    version: Optional[str] = None

class Flow(FlowBase):
    id: str
    status: str = "draft"  # draft, published, archived
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
