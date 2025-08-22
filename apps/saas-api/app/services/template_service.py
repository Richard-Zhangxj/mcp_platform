from typing import List, Optional, Dict, Any
import uuid
import logging
from datetime import datetime
from app.schemas.template import ProcessTemplate, ProcessTemplateCreate, ProcessTemplateUpdate

# 配置日志
logger = logging.getLogger(__name__)

class TemplateService:
    """
    流程模板服务类，负责处理流程模板相关的业务逻辑
    """
    
    def __init__(self):
        """
        初始化流程模板服务
        """
        # 在实际实现中，这里需要连接数据库
        # 为了简化，我们使用内存存储
        self.templates = {}
    
    def get_templates(
        self, 
        skip: int = 0, 
        limit: int = 100, 
        category: Optional[str] = None, 
        search: Optional[str] = None
    ) -> List[ProcessTemplate]:
        """
        获取流程模板列表
        
        Args:
            skip: 跳过的模板数
            limit: 返回的模板数限制
            category: 分类筛选
            search: 搜索关键词
            
        Returns:
            流程模板列表
        """
        templates = list(self.templates.values())
        
        # 应用筛选条件
        if category:
            templates = [template for template in templates if template.category == category]
            
        if search:
            templates = [template for template in templates if search.lower() in template.name.lower() or search.lower() in template.description.lower()]
            
        # 应用分页
        return templates[skip:skip+limit]
    
    def get_template_by_id(self, template_id: str) -> Optional[ProcessTemplate]:
        """
        根据ID获取流程模板详情
        
        Args:
            template_id: 流程模板ID
            
        Returns:
            流程模板对象，如果未找到则返回None
        """
        return self.templates.get(template_id)
    
    def create_template(self, template_create: ProcessTemplateCreate) -> ProcessTemplate:
        """
        创建新流程模板
        
        Args:
            template_create: 流程模板创建对象
            
        Returns:
            创建的流程模板对象
        """
        template_id = str(uuid.uuid4())
        template = ProcessTemplate(
            id=template_id,
            name=template_create.name,
            description=template_create.description,
            category=template_create.category,
            dsl=template_create.dsl,
            version=template_create.version,
            is_public=template_create.is_public,
            tags=template_create.tags,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        self.templates[template_id] = template
        logger.info(f"创建新流程模板: {template_id}")
        return template
    
    def update_template(self, template_id: str, template_update: ProcessTemplateUpdate) -> Optional[ProcessTemplate]:
        """
        更新流程模板
        
        Args:
            template_id: 流程模板ID
            template_update: 流程模板更新对象
            
        Returns:
            更新后的流程模板对象，如果未找到则返回None
        """
        if template_id not in self.templates:
            return None
            
        template = self.templates[template_id]
        update_data = template_update.dict(exclude_unset=True)
        
        for field, value in update_data.items():
            setattr(template, field, value)
            
        template.updated_at = datetime.now()
        self.templates[template_id] = template
        logger.info(f"更新流程模板: {template_id}")
        return template
    
    def delete_template(self, template_id: str) -> bool:
        """
        删除流程模板
        
        Args:
            template_id: 流程模板ID
            
        Returns:
            删除成功返回True，否则返回False
        """
        if template_id not in self.templates:
            return False
            
        del self.templates[template_id]
        logger.info(f"删除流程模板: {template_id}")
        return True
    
    def publish_template(self, template_id: str) -> bool:
        """
        发布流程模板
        
        Args:
            template_id: 流程模板ID
            
        Returns:
            发布成功返回True，否则返回False
        """
        if template_id not in self.templates:
            return False
            
        template = self.templates[template_id]
        template.status = "published"
        template.updated_at = datetime.now()
        self.templates[template_id] = template
        logger.info(f"发布流程模板: {template_id}")
        return True
    
    def unpublish_template(self, template_id: str) -> bool:
        """
        取消发布流程模板
        
        Args:
            template_id: 流程模板ID
            
        Returns:
            取消发布成功返回True，否则返回False
        """
        if template_id not in self.templates:
            return False
            
        template = self.templates[template_id]
        template.status = "draft"
        template.updated_at = datetime.now()
        self.templates[template_id] = template
        logger.info(f"取消发布流程模板: {template_id}")
        return True
