from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from datetime import datetime

class ProcessStats(BaseModel):
    tenant_id: Optional[str] = None
    template_id: Optional[str] = None
    template_name: Optional[str] = None
    total_executions: int
    successful_executions: int
    failed_executions: int
    avg_duration: float  # in seconds
    success_rate: float
    period_start: datetime
    period_end: datetime

class TemplateUsage(BaseModel):
    template_id: str
    template_name: str
    tenant_id: Optional[str] = None
    usage_count: int
    last_used: datetime
    avg_duration: float  # in seconds

class TenantStats(BaseModel):
    tenant_id: str
    tenant_name: str
    total_processes: int
    total_executions: int
    active_processes: int
    failed_processes: int
    period_start: datetime
    period_end: datetime

class ErrorAnalysis(BaseModel):
    tenant_id: Optional[str] = None
    template_id: Optional[str] = None
    error_type: str
    error_message: str
    count: int
    first_occurrence: datetime
    last_occurrence: datetime
    affected_processes: List[str]

class OptimizationSuggestion(BaseModel):
    tenant_id: Optional[str] = None
    template_id: Optional[str] = None
    suggestion_type: str  # performance, reliability, usability
    description: str
    priority: str  # low, medium, high
    estimated_impact: str
    implementation_guide: str
