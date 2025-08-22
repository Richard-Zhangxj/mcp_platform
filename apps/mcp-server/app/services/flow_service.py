from typing import List, Dict, Any, Optional
from datetime import datetime
import uuid
import logging
from app.schemas.flow import Flow, FlowCreate, FlowUpdate
from app.schemas.step import Step, StepCreate, StepUpdate
from app.schemas.execution import Execution, ExecutionCreate, ExecutionUpdate
from app.services.rfc_service import RFCService
from app.services.log_service import LogService

# 配置日志
logger = logging.getLogger(__name__)

class FlowService:
    """
    流程服务类，负责处理流程、步骤和执行相关的业务逻辑
    """
    
    def __init__(self):
        """
        初始化流程服务
        """
        self.rfc_service = RFCService()
        self.log_service = LogService()
        # 在实际实现中，这里需要连接数据库
        # 为了简化，我们使用内存存储
        self.flows = {}
        self.steps = {}
        self.executions = {}
    
    # Flow 相关方法
    
    def get_all_flows(self) -> List[Flow]:
        """
        获取所有流程列表
        
        Returns:
            流程列表
        """
        return list(self.flows.values())
    
    def get_flow_by_id(self, flow_id: str) -> Optional[Flow]:
        """
        根据ID获取流程详情
        
        Args:
            flow_id: 流程ID
            
        Returns:
            流程对象，如果未找到则返回None
        """
        return self.flows.get(flow_id)
    
    def create_flow(self, flow_create: FlowCreate) -> Flow:
        """
        创建新流程
        
        Args:
            flow_create: 流程创建对象
            
        Returns:
            创建的流程对象
        """
        flow_id = str(uuid.uuid4())
        flow = Flow(
            id=flow_id,
            name=flow_create.name,
            description=flow_create.description,
            dsl=flow_create.dsl,
            version=flow_create.version,
            status="draft",
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        self.flows[flow_id] = flow
        logger.info(f"创建新流程: {flow_id}")
        return flow
    
    def update_flow(self, flow_id: str, flow_update: FlowUpdate) -> Optional[Flow]:
        """
        更新流程
        
        Args:
            flow_id: 流程ID
            flow_update: 流程更新对象
            
        Returns:
            更新后的流程对象，如果未找到则返回None
        """
        if flow_id not in self.flows:
            return None
            
        flow = self.flows[flow_id]
        update_data = flow_update.dict(exclude_unset=True)
        
        for field, value in update_data.items():
            setattr(flow, field, value)
            
        flow.updated_at = datetime.now()
        self.flows[flow_id] = flow
        logger.info(f"更新流程: {flow_id}")
        return flow
    
    def delete_flow(self, flow_id: str) -> bool:
        """
        删除流程
        
        Args:
            flow_id: 流程ID
            
        Returns:
            删除成功返回True，否则返回False
        """
        if flow_id not in self.flows:
            return False
            
        # 删除关联的步骤
        step_ids_to_delete = [step_id for step_id, step in self.steps.items() if step.flow_id == flow_id]
        for step_id in step_ids_to_delete:
            del self.steps[step_id]
            
        # 删除关联的执行实例
        execution_ids_to_delete = [execution_id for execution_id, execution in self.executions.items() if execution.flow_id == flow_id]
        for execution_id in execution_ids_to_delete:
            del self.executions[execution_id]
            
        del self.flows[flow_id]
        logger.info(f"删除流程: {flow_id}")
        return True
    
    # Step 相关方法
    
    def get_steps_by_flow_id(self, flow_id: str) -> List[Step]:
        """
        获取指定流程的所有步骤
        
        Args:
            flow_id: 流程ID
            
        Returns:
            步骤列表
        """
        return [step for step in self.steps.values() if step.flow_id == flow_id]
    
    def get_step_by_id(self, step_id: str) -> Optional[Step]:
        """
        根据ID获取步骤详情
        
        Args:
            step_id: 步骤ID
            
        Returns:
            步骤对象，如果未找到则返回None
        """
        return self.steps.get(step_id)
    
    def create_step(self, step_create: StepCreate) -> Step:
        """
        创建新步骤
        
        Args:
            step_create: 步骤创建对象
            
        Returns:
            创建的步骤对象
        """
        # 验证流程是否存在
        if step_create.flow_id not in self.flows:
            raise ValueError("流程不存在")
            
        step_id = str(uuid.uuid4())
        step = Step(
            id=step_id,
            flow_id=step_create.flow_id,
            name=step_create.name,
            description=step_create.description,
            type=step_create.type,
            config=step_create.config,
            position=step_create.position,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        self.steps[step_id] = step
        logger.info(f"创建新步骤: {step_id}")
        return step
    
    def update_step(self, step_id: str, step_update: StepUpdate) -> Optional[Step]:
        """
        更新步骤
        
        Args:
            step_id: 步骤ID
            step_update: 步骤更新对象
            
        Returns:
            更新后的步骤对象，如果未找到则返回None
        """
        if step_id not in self.steps:
            return None
            
        step = self.steps[step_id]
        update_data = step_update.dict(exclude_unset=True)
        
        for field, value in update_data.items():
            setattr(step, field, value)
            
        step.updated_at = datetime.now()
        self.steps[step_id] = step
        logger.info(f"更新步骤: {step_id}")
        return step
    
    def delete_step(self, step_id: str) -> bool:
        """
        删除步骤
        
        Args:
            step_id: 步骤ID
            
        Returns:
            删除成功返回True，否则返回False
        """
        if step_id not in self.steps:
            return False
            
        del self.steps[step_id]
        logger.info(f"删除步骤: {step_id}")
        return True
    
    # Execution 相关方法
    
    def get_executions_by_flow_id(self, flow_id: str) -> List[Execution]:
        """
        获取指定流程的所有执行实例
        
        Args:
            flow_id: 流程ID
            
        Returns:
            执行实例列表
        """
        return [execution for execution in self.executions.values() if execution.flow_id == flow_id]
    
    def get_execution_by_id(self, execution_id: str) -> Optional[Execution]:
        """
        根据ID获取执行实例详情
        
        Args:
            execution_id: 执行实例ID
            
        Returns:
            执行实例对象，如果未找到则返回None
        """
        return self.executions.get(execution_id)
    
    def start_execution(self, execution_create: ExecutionCreate) -> Execution:
        """
        启动新流程执行
        
        Args:
            execution_create: 执行实例创建对象
            
        Returns:
            创建的执行实例对象
        """
        # 验证流程是否存在
        if execution_create.flow_id not in self.flows:
            raise ValueError("流程不存在")
            
        execution_id = str(uuid.uuid4())
        execution = Execution(
            id=execution_id,
            flow_id=execution_create.flow_id,
            user_id=execution_create.user_id,
            initial_parameters=execution_create.initial_parameters,
            status="running",
            started_at=datetime.now()
        )
        self.executions[execution_id] = execution
        logger.info(f"启动新流程执行: {execution_id}")
        
        # 记录日志
        self.log_service.create_log({
            "flow_id": execution.flow_id,
            "execution_id": execution_id,
            "user_id": execution.user_id,
            "level": "info",
            "message": "流程执行已启动",
            "details": {
                "initial_parameters": execution.initial_parameters
            }
        })
        
        return execution
    
    def update_execution(self, execution_id: str, execution_update: ExecutionUpdate) -> Optional[Execution]:
        """
        更新执行实例
        
        Args:
            execution_id: 执行实例ID
            execution_update: 执行实例更新对象
            
        Returns:
            更新后的执行实例对象，如果未找到则返回None
        """
        if execution_id not in self.executions:
            return None
            
        execution = self.executions[execution_id]
        update_data = execution_update.dict(exclude_unset=True)
        
        for field, value in update_data.items():
            setattr(execution, field, value)
            
        # 如果状态变为完成或失败，设置结束时间
        if execution.status in ["completed", "failed", "cancelled"] and execution.finished_at is None:
            execution.finished_at = datetime.now()
            
        self.executions[execution_id] = execution
        logger.info(f"更新执行实例: {execution_id}")
        return execution
    
    def cancel_execution(self, execution_id: str) -> bool:
        """
        取消执行实例
        
        Args:
            execution_id: 执行实例ID
            
        Returns:
            取消成功返回True，否则返回False
        """
        if execution_id not in self.executions:
            return False
            
        execution = self.executions[execution_id]
        execution.status = "cancelled"
        execution.finished_at = datetime.now()
        self.executions[execution_id] = execution
        
        # 记录日志
        self.log_service.create_log({
            "flow_id": execution.flow_id,
            "execution_id": execution_id,
            "user_id": execution.user_id,
            "level": "info",
            "message": "流程执行已取消",
            "details": {}
        })
        
        logger.info(f"取消执行实例: {execution_id}")
        return True
    
    def execute_step(self, execution_id: str, step_id: str, parameters: Dict[str, Any]) -> Dict[str, Any]:
        """
        执行指定步骤
        
        Args:
            execution_id: 执行实例ID
            step_id: 步骤ID
            parameters: 执行参数
            
        Returns:
            执行结果
        """
        # 验证执行实例是否存在
        if execution_id not in self.executions:
            raise ValueError("执行实例不存在")
            
        execution = self.executions[execution_id]
        
        # 验证步骤是否存在
        if step_id not in self.steps:
            raise ValueError("步骤不存在")
            
        step = self.steps[step_id]
        
        # 验证步骤是否属于该流程
        if step.flow_id != execution.flow_id:
            raise ValueError("步骤不属于该流程")
            
        # 根据步骤类型执行不同的逻辑
        result = None
        if step.type == "mcp_call":
            # 调用 RFC 函数
            rfc_function = step.config.get("rfc_function")
            if not rfc_function:
                raise ValueError("步骤配置中缺少 RFC 函数名称")
                
            result = self.rfc_service.call_rfc(rfc_function, parameters)
        elif step.type == "condition":
            # 条件判断逻辑
            result = {
                "type": "condition",
                "result": True,  # 简化实现，总是返回True
                "next_step": step.config.get("true_next", "")
            }
        else:
            # 其他类型的步骤
            result = {
                "type": step.type,
                "result": "success",
                "message": f"步骤 {step.name} 执行成功"
            }
        
        # 记录执行日志
        self.log_service.create_log({
            "flow_id": execution.flow_id,
            "execution_id": execution_id,
            "step_id": step_id,
            "user_id": execution.user_id,
            "level": "info" if result.get("result", {}).get("status") == "success" else "error",
            "message": f"步骤 {step.name} 执行完成",
            "details": {
                "parameters": parameters,
                "result": result
            }
        })
        
        logger.info(f"执行步骤: {step_id} in execution: {execution_id}")
        return result
    
    def close(self):
        """
        关闭服务连接
        """
        if self.rfc_service:
            self.rfc_service.close()
