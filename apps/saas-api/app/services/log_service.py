from typing import List, Optional, Dict, Any
import uuid
import logging
from datetime import datetime
from app.schemas.log import Log, LogCreate, LogSearch

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
    
    def get_logs(
        self,
        skip: int = 0,
        limit: int = 100,
        tenant_id: Optional[str] = None,
        template_id: Optional[str] = None,
        level: Optional[str] = None,
        start_time: Optional[datetime] = None,
        end_time: Optional[datetime] = None
    ) -> List[Log]:
        """
        获取日志列表
        
        Args:
            skip: 跳过的日志数
            limit: 返回的日志数限制
            tenant_id: 租户ID筛选
            template_id: 模板ID筛选
            level: 日志级别筛选
            start_time: 开始时间筛选
            end_time: 结束时间筛选
            
        Returns:
            日志列表
        """
        logs = list(self.logs.values())
        
        # 应用筛选条件
        if tenant_id:
            logs = [log for log in logs if log.tenant_id == tenant_id]
            
        if template_id:
            logs = [log for log in logs if log.template_id == template_id]
            
        if level:
            logs = [log for log in logs if log.level == level]
            
        if start_time:
            logs = [log for log in logs if log.timestamp >= start_time]
            
        if end_time:
            logs = [log for log in logs if log.timestamp <= end_time]
            
        # 按时间倒序排列
        logs.sort(key=lambda x: x.timestamp, reverse=True)
        
        # 应用分页
        return logs[skip:skip+limit]
    
    def get_log_by_id(self, log_id: str) -> Optional[Log]:
        """
        根据ID获取日志详情
        
        Args:
            log_id: 日志ID
            
        Returns:
            日志对象，如果未找到则返回None
        """
        return self.logs.get(log_id)
    
    def create_log(self, log_create: LogCreate) -> Log:
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
            tenant_id=log_create.tenant_id,
            template_id=log_create.template_id,
            process_id=log_create.process_id,
            step_id=log_create.step_id,
            user_id=log_create.user_id,
            level=log_create.level,
            message=log_create.message,
            details=log_create.details,
            timestamp=datetime.now()
        )
        self.logs[log_id] = log
        logger.info(f"创建新日志: {log_id}")
        return log
    
    def search_logs(self, search: LogSearch) -> List[Log]:
        """
        搜索日志
        
        Args:
            search: 日志搜索对象
            
        Returns:
            搜索结果列表
        """
        logs = list(self.logs.values())
        
        # 应用搜索条件
        if search.tenant_id:
            logs = [log for log in logs if log.tenant_id == search.tenant_id]
            
        if search.template_id:
            logs = [log for log in logs if log.template_id == search.template_id]
            
        if search.process_id:
            logs = [log for log in logs if log.process_id == search.process_id]
            
        if search.step_id:
            logs = [log for log in logs if log.step_id == search.step_id]
            
        if search.user_id:
            logs = [log for log in logs if log.user_id == search.user_id]
            
        if search.level:
            logs = [log for log in logs if log.level == search.level]
            
        if search.message:
            logs = [log for log in logs if search.message.lower() in log.message.lower()]
            
        if search.start_time:
            logs = [log for log in logs if log.timestamp >= search.start_time]
            
        if search.end_time:
            logs = [log for log in logs if log.timestamp <= search.end_time]
            
        # 按时间倒序排列
        logs.sort(key=lambda x: x.timestamp, reverse=True)
        
        # 限制返回数量
        return logs[:search.limit]
    
    def get_log_stats(
        self,
        tenant_id: Optional[str] = None,
        template_id: Optional[str] = None,
        start_time: Optional[datetime] = None,
        end_time: Optional[datetime] = None
    ) -> Dict[str, Any]:
        """
        获取日志统计信息
        
        Args:
            tenant_id: 租户ID筛选
            template_id: 模板ID筛选
            start_time: 开始时间筛选
            end_time: 结束时间筛选
            
        Returns:
            日志统计信息
        """
        logs = list(self.logs.values())
        
        # 应用筛选条件
        if tenant_id:
            logs = [log for log in logs if log.tenant_id == tenant_id]
            
        if template_id:
            logs = [log for log in logs if log.template_id == template_id]
            
        if start_time:
            logs = [log for log in logs if log.timestamp >= start_time]
            
        if end_time:
            logs = [log for log in logs if log.timestamp <= end_time]
            
        # 计算统计信息
        total_logs = len(logs)
        info_logs = len([log for log in logs if log.level == "info"])
        warn_logs = len([log for log in logs if log.level == "warn"])
        error_logs = len([log for log in logs if log.level == "error"])
        
        return {
            "total_logs": total_logs,
            "info_logs": info_logs,
            "warn_logs": warn_logs,
            "error_logs": error_logs,
            "error_rate": error_logs / total_logs if total_logs > 0 else 0
        }
    
    def get_error_logs(
        self,
        tenant_id: Optional[str] = None,
        template_id: Optional[str] = None,
        limit: int = 100
    ) -> List[Log]:
        """
        获取错误日志
        
        Args:
            tenant_id: 租户ID筛选
            template_id: 模板ID筛选
            limit: 返回结果数量限制
            
        Returns:
            错误日志列表
        """
        logs = list(self.logs.values())
        
        # 应用筛选条件
        if tenant_id:
            logs = [log for log in logs if log.tenant_id == tenant_id]
            
        if template_id:
            logs = [log for log in logs if log.template_id == template_id]
            
        # 筛选错误日志
        error_logs = [log for log in logs if log.level == "error"]
        
        # 按时间倒序排列
        error_logs.sort(key=lambda x: x.timestamp, reverse=True)
        
        # 限制返回数量
        return error_logs[:limit]
