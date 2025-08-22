from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime

class StepBase(BaseModel):
    flow_id: str
    name: str
    description: Optional[str] = None
    type: str  # mcp_call, condition, loop, input, output, subflow
    config: Dict[str, Any]  # 配置信息，根据步骤类型不同而不同
    position: Dict[str, int]  # 在流程图中的位置 {x: int, y: int}

class StepCreate(StepBase):
    pass

class StepUpdate(StepBase):
    flow_id: Optional[str] = None
    name: Optional[str] = None
    type: Optional[str] = None
    config: Optional[Dict[str, Any]] = None
    position: Optional[Dict[str, int]] = None

class Step(StepBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
