from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from datetime import datetime

class LogBase(BaseModel):
    tenant_id: str
    template_id: Optional[str] = None
    process_id: Optional[str] = None
    step_id: Optional[str] = None
    user_id: Optional[str] = None
    level: str  # info, warn, error
    message: str
    details: Optional[Dict[str, Any]] = None

class LogCreate(LogBase):
    pass

class Log(LogBase):
    id: str
    timestamp: datetime

    class Config:
        orm_mode = True

class LogSearch(BaseModel):
    tenant_id: Optional[str] = None
    template_id: Optional[str] = None
    process_id: Optional[str] = None
    step_id: Optional[str] = None
    user_id: Optional[str] = None
    level: Optional[str] = None
    message: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    limit: int = 100
