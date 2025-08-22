from typing import List, Optional, Dict, Any
import uuid
import logging
import hashlib
import secrets
from datetime import datetime, timedelta
from app.schemas.tenant import Tenant, TenantCreate, TenantUpdate, APIKey

# 配置日志
logger = logging.getLogger(__name__)

class TenantService:
    """
    租户服务类，负责处理租户相关的业务逻辑
    """
    
    def __init__(self):
        """
        初始化租户服务
        """
        # 在实际实现中，这里需要连接数据库
        # 为了简化，我们使用内存存储
        self.tenants = {}
        self.api_keys = {}
    
    def get_tenants(
        self, 
        skip: int = 0, 
        limit: int = 100, 
        name: Optional[str] = None
    ) -> List[Tenant]:
        """
        获取租户列表
        
        Args:
            skip: 跳过的租户数
            limit: 返回的租户数限制
            name: 租户名称筛选
            
        Returns:
            租户列表
        """
        tenants = list(self.tenants.values())
        
        # 应用筛选条件
        if name:
            tenants = [tenant for tenant in tenants if name.lower() in tenant.name.lower()]
            
        # 应用分页
        return tenants[skip:skip+limit]
    
    def get_tenant_by_id(self, tenant_id: str) -> Optional[Tenant]:
        """
        根据ID获取租户详情
        
        Args:
            tenant_id: 租户ID
            
        Returns:
            租户对象，如果未找到则返回None
        """
        return self.tenants.get(tenant_id)
    
    def create_tenant(self, tenant_create: TenantCreate) -> Tenant:
        """
        创建新租户
        
        Args:
            tenant_create: 租户创建对象
            
        Returns:
            创建的租户对象
        """
        tenant_id = str(uuid.uuid4())
        tenant = Tenant(
            id=tenant_id,
            name=tenant_create.name,
            description=tenant_create.description,
            contact_email=tenant_create.contact_email,
            is_active=tenant_create.is_active,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        self.tenants[tenant_id] = tenant
        logger.info(f"创建新租户: {tenant_id}")
        return tenant
    
    def update_tenant(self, tenant_id: str, tenant_update: TenantUpdate) -> Optional[Tenant]:
        """
        更新租户
        
        Args:
            tenant_id: 租户ID
            tenant_update: 租户更新对象
            
        Returns:
            更新后的租户对象，如果未找到则返回None
        """
        if tenant_id not in self.tenants:
            return None
            
        tenant = self.tenants[tenant_id]
        update_data = tenant_update.dict(exclude_unset=True)
        
        for field, value in update_data.items():
            setattr(tenant, field, value)
            
        tenant.updated_at = datetime.now()
        self.tenants[tenant_id] = tenant
        logger.info(f"更新租户: {tenant_id}")
        return tenant
    
    def delete_tenant(self, tenant_id: str) -> bool:
        """
        删除租户
        
        Args:
            tenant_id: 租户ID
            
        Returns:
            删除成功返回True，否则返回False
        """
        if tenant_id not in self.tenants:
            return False
            
        # 删除关联的API密钥
        api_key_ids_to_delete = [key_id for key_id, key in self.api_keys.items() if key.tenant_id == tenant_id]
        for key_id in api_key_ids_to_delete:
            del self.api_keys[key_id]
            
        del self.tenants[tenant_id]
        logger.info(f"删除租户: {tenant_id}")
        return True
    
    def create_api_key(self, tenant_id: str, key: str) -> APIKey:
        """
        为租户创建API密钥
        
        Args:
            tenant_id: 租户ID
            key: API密钥
            
        Returns:
            创建的API密钥对象
        """
        key_id = str(uuid.uuid4())
        # 对密钥进行哈希处理存储
        key_hash = hashlib.sha256(key.encode()).hexdigest()
        
        api_key = APIKey(
            id=key_id,
            tenant_id=tenant_id,
            key_hash=key_hash,
            name=f"API Key {key_id[:8]}",
            created_at=datetime.now(),
            expires_at=datetime.now() + timedelta(days=365),  # 默认有效期1年
            is_active=True
        )
        self.api_keys[key_id] = api_key
        logger.info(f"为租户创建API密钥: {tenant_id}")
        return api_key
    
    def get_api_keys_for_tenant(self, tenant_id: str) -> List[APIKey]:
        """
        获取租户的API密钥列表
        
        Args:
            tenant_id: 租户ID
            
        Returns:
            API密钥列表
        """
        return [key for key in self.api_keys.values() if key.tenant_id == tenant_id]
    
    def revoke_api_key(self, tenant_id: str, key_id: str) -> bool:
        """
        撤销租户的API密钥
        
        Args:
            tenant_id: 租户ID
            key_id: API密钥ID
            
        Returns:
            撤销成功返回True，否则返回False
        """
        if key_id not in self.api_keys or self.api_keys[key_id].tenant_id != tenant_id:
            return False
            
        api_key = self.api_keys[key_id]
        api_key.is_active = False
        api_key.expires_at = datetime.now()  # 立即过期
        self.api_keys[key_id] = api_key
        logger.info(f"撤销租户的API密钥: {tenant_id} - {key_id}")
        return True
    
    def verify_api_key(self, key: str) -> Optional[APIKey]:
        """
        验证API密钥
        
        Args:
            key: API密钥
            
        Returns:
            API密钥对象，如果验证失败则返回None
        """
        key_hash = hashlib.sha256(key.encode()).hexdigest()
        
        for api_key in self.api_keys.values():
            if api_key.key_hash == key_hash and api_key.is_active:
                # 检查是否过期
                if api_key.expires_at is None or api_key.expires_at > datetime.now():
                    return api_key
                    
        return None
