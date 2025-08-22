import hashlib
import secrets
import logging
from typing import Optional
from datetime import datetime, timedelta

# 配置日志
logger = logging.getLogger(__name__)

def create_api_key() -> str:
    """
    创建新的API密钥
    
    Returns:
        生成的API密钥
    """
    # 生成一个安全的随机字符串作为API密钥
    key = secrets.token_urlsafe(32)
    logger.info("创建新的API密钥")
    return key

def hash_password(password: str) -> str:
    """
    对密码进行哈希处理
    
    Args:
        password: 原始密码
        
    Returns:
        哈希后的密码
    """
    # 使用SHA-256对密码进行哈希处理
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    验证密码
    
    Args:
        plain_password: 原始密码
        hashed_password: 哈希后的密码
        
    Returns:
        验证成功返回True，否则返回False
    """
    return hash_password(plain_password) == hashed_password

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    创建访问令牌
    
    Args:
        data: 令牌数据
        expires_delta: 过期时间增量
        
    Returns:
        生成的访问令牌
    """
    # 在实际实现中，这里会使用JWT库创建令牌
    # 为了简化，我们返回模拟数据
    
    # 默认过期时间为15分钟
    if expires_delta is None:
        expires_delta = timedelta(minutes=15)
        
    expire = datetime.now() + expires_delta
    
    # 在实际实现中，这里会编码数据并签名
    # 为了简化，我们返回模拟的令牌字符串
    token = f"mock_jwt_token_{hashlib.md5(str(data).encode()).hexdigest()}"
    
    logger.info(f"创建访问令牌，过期时间: {expire}")
    return token

def verify_access_token(token: str) -> Optional[dict]:
    """
    验证访问令牌
    
    Args:
        token: 访问令牌
        
    Returns:
        令牌数据，如果验证失败则返回None
    """
    # 在实际实现中，这里会验证JWT令牌
    # 为了简化，我们检查是否为模拟的令牌格式
    
    if token.startswith("mock_jwt_token_"):
        # 在实际实现中，这里会解码令牌并验证签名
        # 为了简化，我们返回模拟数据
        return {
            "sub": "user_id",
            "exp": (datetime.now() + timedelta(minutes=15)).timestamp()
        }
    
    return None
