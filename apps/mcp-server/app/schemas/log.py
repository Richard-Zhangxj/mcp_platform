from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime

class LogBase(BaseModel):
    flow_id: str
    execution_id: str
    step_id: Optional[str] = None
    user_id: str
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
