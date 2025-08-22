import unittest
from app.services.rag_service import RAGService
from app.schemas.knowledge import KnowledgeItemCreate

class TestRAGService(unittest.TestCase):
    """RAG 服务测试类"""
    
    def setUp(self):
        """测试前准备"""
        self.rag_service = RAGService()
    
    def test_create_knowledge_item(self):
        """测试创建知识库条目"""
        # 创建知识库条目
        item_create = KnowledgeItemCreate(
            title="测试条目",
            content="这是一个测试条目",
            category="test",
            tags=["test", "example"],
            is_public=True
        )
        
        item = self.rag_service.create_knowledge_item(item_create)
        
        # 验证返回结果
        self.assertIsNotNone(item)
        self.assertEqual(item.title, "测试条目")
        self.assertEqual(item.content, "这是一个测试条目")
        self.assertEqual(item.category, "test")
        self.assertEqual(item.tags, ["test", "example"])
        self.assertTrue(item.is_public)
    
    def test_get_knowledge_item_by_id(self):
        """测试根据ID获取知识库条目"""
        # 创建知识库条目
        item_create = KnowledgeItemCreate(
            title="测试条目",
            content="这是一个测试条目",
            category="test",
            tags=["test", "example"],
            is_public=True
        )
        
        item = self.rag_service.create_knowledge_item(item_create)
        
        # 根据ID获取知识库条目
        retrieved_item = self.rag_service.get_knowledge_item_by_id(item.id)
        
        # 验证返回结果
        self.assertIsNotNone(retrieved_item)
        self.assertEqual(retrieved_item.id, item.id)
        self.assertEqual(retrieved_item.title, "测试条目")
    
    def test_update_knowledge_item(self):
        """测试更新知识库条目"""
        # 创建知识库条目
        item_create = KnowledgeItemCreate(
            title="测试条目",
            content="这是一个测试条目",
            category="test",
            tags=["test", "example"],
            is_public=True
        )
        
        item = self.rag_service.create_knowledge_item(item_create)
        
        # 更新知识库条目
        from app.schemas.knowledge import KnowledgeItemUpdate
        item_update = KnowledgeItemUpdate(
            title="更新后的测试条目",
            content="这是更新后的测试条目"
        )
        
        updated_item = self.rag_service.update_knowledge_item(item.id, item_update)
        
        # 验证返回结果
        self.assertIsNotNone(updated_item)
        self.assertEqual(updated_item.title, "更新后的测试条目")
        self.assertEqual(updated_item.content, "这是更新后的测试条目")
    
    def test_delete_knowledge_item(self):
        """测试删除知识库条目"""
        # 创建知识库条目
        item_create = KnowledgeItemCreate(
            title="测试条目",
            content="这是一个测试条目",
            category="test",
            tags=["test", "example"],
            is_public=True
        )
        
        item = self.rag_service.create_knowledge_item(item_create)
        
        # 删除知识库条目
        result = self.rag_service.delete_knowledge_item(item.id)
        
        # 验证返回结果
        self.assertTrue(result)
        
        # 验证条目已被删除
        deleted_item = self.rag_service.get_knowledge_item_by_id(item.id)
        self.assertIsNone(deleted_item)
    
    def test_search_knowledge(self):
        """测试搜索知识库"""
        # 创建知识库条目
        item_create1 = KnowledgeItemCreate(
            title="销售订单处理",
            content="如何处理销售订单",
            category="sales",
            tags=["sales", "order"],
            is_public=True
        )
        
        item_create2 = KnowledgeItemCreate(
            title="采购订单处理",
            content="如何处理采购订单",
            category="purchase",
            tags=["purchase", "order"],
            is_public=True
        )
        
        self.rag_service.create_knowledge_item(item_create1)
        self.rag_service.create_knowledge_item(item_create2)
        
        # 搜索知识库
        results = self.rag_service.search_knowledge("销售", 10)
        
        # 验证返回结果
        self.assertIsNotNone(results)
        self.assertGreater(len(results), 0)
        self.assertEqual(results[0]["title"], "销售订单处理")

if __name__ == "__main__":
    unittest.main()
