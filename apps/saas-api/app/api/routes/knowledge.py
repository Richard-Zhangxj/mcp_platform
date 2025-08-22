from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.schemas.knowledge import KnowledgeItem, KnowledgeItemCreate, KnowledgeItemUpdate
from app.services.rag_service import RAGService

router = APIRouter()
rag_service = RAGService()

@router.get("/", response_model=List[KnowledgeItem])
async def list_knowledge_items(
    skip: int = 0,
    limit: int = Query(100, le=1000),
    category: Optional[str] = None,
    search: Optional[str] = None
):
    """获取知识库条目列表"""
    return rag_service.get_knowledge_items(skip, limit, category, search)

@router.get("/{item_id}", response_model=KnowledgeItem)
async def get_knowledge_item(item_id: str):
    """根据ID获取知识库条目详情"""
    item = rag_service.get_knowledge_item_by_id(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Knowledge item not found")
    return item

@router.post("/", response_model=KnowledgeItem)
async def create_knowledge_item(item: KnowledgeItemCreate):
    """创建新知识库条目"""
    return rag_service.create_knowledge_item(item)

@router.put("/{item_id}", response_model=KnowledgeItem)
async def update_knowledge_item(item_id: str, item: KnowledgeItemUpdate):
    """更新知识库条目"""
    updated_item = rag_service.update_knowledge_item(item_id, item)
    if not updated_item:
        raise HTTPException(status_code=404, detail="Knowledge item not found")
    return updated_item

@router.delete("/{item_id}")
async def delete_knowledge_item(item_id: str):
    """删除知识库条目"""
    success = rag_service.delete_knowledge_item(item_id)
    if not success:
        raise HTTPException(status_code=404, detail="Knowledge item not found")
    return {"message": "Knowledge item deleted successfully"}

@router.post("/search")
async def search_knowledge(query: str, limit: int = Query(10, le=100)):
    """搜索知识库"""
    results = rag_service.search_knowledge(query, limit)
    return results

@router.post("/vectorize")
async def vectorize_knowledge_item(item_id: str):
    """对知识库条目进行向量化"""
    try:
        rag_service.vectorize_item(item_id)
        return {"message": "Knowledge item vectorized successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Vectorization failed: {str(e)}")
