from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime

class ExecutionBase(BaseModel):
    flow_id: str
    user_id: str
    initial_parameters: Optional[Dict[str, Any]] = None

class ExecutionCreate(ExecutionBase):
    pass

class ExecutionUpdate(BaseModel):
    status: Optional[str] = None
    current_step_id: Optional[str] = None

class Execution(ExecutionBase):
    id: str
    status: str  # running, completed, failed, cancelled
    current_step_id: Optional[str] = None
    started_at: datetime
    finished_at: Optional[datetime] = None
    result: Optional[Dict[str, Any]] = None

    class Config:
        orm_mode = True
