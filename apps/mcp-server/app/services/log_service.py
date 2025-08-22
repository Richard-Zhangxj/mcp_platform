from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid
import logging
from app.schemas.log import Log, LogCreate

# 配置日志
logger = logging.getLogger(__name__)

class LogService:
    """
    日志服务类，负责处理日志相关的业务逻辑
    """
    
    def __init__(self):
        """
        初始化日志服务
        """
        # 在实际实现中，这里需要连接数据库
        # 为了简化，我们使用内存存储
        self.logs = {}
    
    def get_logs_by_execution_id(self, execution_id: str) -> List[Log]:
        """
        根据执行实例ID获取日志列表
        
        Args:
            execution_id: 执行实例ID
            
        Returns:
            日志列表
        """
        return [log for log in self.logs.values() if log.execution_id == execution_id]
    
    def get_log_by_id(self, log_id: str) -> Optional[Log]:
        """
        根据ID获取日志详情
        
        Args:
            log_id: 日志ID
            
        Returns:
            日志对象，如果未找到则返回None
        """
        return self.logs.get(log_id)
    
    def create_log(self, log_create: Dict[str, Any]) -> Log:
        """
        创建新日志
        
        Args:
            log_create: 日志创建对象
            
        Returns:
            创建的日志对象
        """
        log_id = str(uuid.uuid4())
        log = Log(
            id=log_id,
            flow_id=log_create["flow_id"],
            execution_id=log_create["execution_id"],
            step_id=log_create.get("step_id"),
            user_id=log_create["user_id"],
            level=log_create["level"],
            message=log_create["message"],
            details=log_create.get("details"),
            timestamp=datetime.now()
        )
        self.logs[log_id] = log
        logger.info(f"创建新日志: {log_id}")
        return log
    
    def search_logs(
        self,
        flow_id: Optional[str] = None,
        execution_id: Optional[str] = None,
        step_id: Optional[str] = None,
        user_id: Optional[str] = None,
        start_time: Optional[datetime] = None,
        end_time: Optional[datetime] = None,
        limit: int = 100
    ) -> List[Log]:
        """
        搜索日志
        
        Args:
            flow_id: 流程ID
            execution_id: 执行实例ID
            step_id: 步骤ID
            user_id: 用户ID
            start_time: 开始时间
            end_time: 结束时间
            limit: 返回结果数量限制
            
        Returns:
            日志列表
        """
        filtered_logs = list(self.logs.values())
        
        # 应用过滤条件
        if flow_id:
            filtered_logs = [log for log in filtered_logs if log.flow_id == flow_id]
            
        if execution_id:
            filtered_logs = [log for log in filtered_logs if log.execution_id == execution_id]
            
        if step_id:
            filtered_logs = [log for log in filtered_logs if log.step_id == step_id]
            
        if user_id:
            filtered_logs = [log for log in filtered_logs if log.user_id == user_id]
            
        if start_time:
            filtered_logs = [log for log in filtered_logs if log.timestamp >= start_time]
            
        if end_time:
            filtered_logs = [log for log in filtered_logs if log.timestamp <= end_time]
            
        # 按时间倒序排列
        filtered_logs.sort(key=lambda x: x.timestamp, reverse=True)
        
        # 限制返回数量
        return filtered_logs[:limit]
    
    def delete_log(self, log_id: str) -> bool:
        """
        删除日志
        
        Args:
            log_id: 日志ID
            
        Returns:
            删除成功返回True，否则返回False
        """
        if log_id not in self.logs:
            return False
            
        del self.logs[log_id]
        logger.info(f"删除日志: {log_id}")
        return True
