import unittest
from app.services.rfc_service import RFCService

class TestRFCService(unittest.TestCase):
    """RFC 服务测试类"""
    
    def setUp(self):
        """测试前准备"""
        self.rfc_service = RFCService()
    
    def tearDown(self):
        """测试后清理"""
        self.rfc_service.close()
    
    def test_call_rfc(self):
        """测试调用 RFC 函数"""
        # 测试调用 RFC 函数
        result = self.rfc_service.call_rfc("STFC_CONNECTION", {"REQUTEXT": "Hello SAP"})
        
        # 验证返回结果
        self.assertIsNotNone(result)
        self.assertEqual(result["function_name"], "STFC_CONNECTION")
        self.assertIn("result", result)
        self.assertEqual(result["result"]["status"], "success")
    
    def test_search_rfc_schema(self):
        """测试查询 RFC 函数结构"""
        # 测试查询 RFC 函数结构
        schema = self.rfc_service.search_rfc_schema("STFC_CONNECTION")
        
        # 验证返回结果
        self.assertIsNotNone(schema)
        self.assertEqual(schema["function_name"], "STFC_CONNECTION")
        self.assertIn("imports", schema)
        self.assertIn("exports", schema)
    
    def test_validate_parameters(self):
        """测试验证 RFC 参数"""
        # 测试验证 RFC 参数
        validation_result = self.rfc_service.validate_parameters(
            "STFC_CONNECTION", 
            {"REQUTEXT": "Hello SAP"}
        )
        
        # 验证返回结果
        self.assertIsNotNone(validation_result)
        self.assertEqual(validation_result["function_name"], "STFC_CONNECTION")
        self.assertTrue(validation_result["valid"])

if __name__ == "__main__":
    unittest.main()
