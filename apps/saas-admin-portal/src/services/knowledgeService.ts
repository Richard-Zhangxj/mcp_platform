import { api } from './api';

// 定义知识库条目类型
export interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  isPublic: boolean;
  isVectorized: boolean;
  createdAt: string;
  updatedAt: string;
}

// 定义创建知识库条目的参数类型
export interface CreateKnowledgeItemParams {
  title: string;
  content: string;
  category: string;
  tags?: string[];
  isPublic: boolean;
}

// 定义更新知识库条目的参数类型
export interface UpdateKnowledgeItemParams {
  title?: string;
  content?: string;
  category?: string;
  tags?: string[];
  isPublic?: boolean;
  isVectorized?: boolean;
}

// 定义搜索知识库条目的参数类型
export interface SearchKnowledgeParams {
  query?: string;
  category?: string;
  tags?: string[];
  isPublic?: boolean;
  isVectorized?: boolean;
  page?: number;
  limit?: number;
}

// 知识库服务
export const knowledgeService = {
  // 获取知识库条目列表
  getKnowledgeItems: async (params?: SearchKnowledgeParams): Promise<KnowledgeItem[]> => {
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, String(value));
          }
        });
      }
      
      const response = await api.get<KnowledgeItem[]>(`/knowledge?${queryParams.toString()}`);
      return response;
    } catch (error) {
      throw new Error(`获取知识库条目列表失败: ${error}`);
    }
  },

  // 根据ID获取知识库条目详情
  getKnowledgeItemById: async (id: string): Promise<KnowledgeItem> => {
    try {
      const response = await api.get<KnowledgeItem>(`/knowledge/${id}`);
      return response;
    } catch (error) {
      throw new Error(`获取知识库条目详情失败: ${error}`);
    }
  },

  // 创建知识库条目
  createKnowledgeItem: async (params: CreateKnowledgeItemParams): Promise<KnowledgeItem> => {
    try {
      const response = await api.post<KnowledgeItem>('/knowledge', params);
      return response;
    } catch (error) {
      throw new Error(`创建知识库条目失败: ${error}`);
    }
  },

  // 更新知识库条目
  updateKnowledgeItem: async (id: string, params: UpdateKnowledgeItemParams): Promise<KnowledgeItem> => {
    try {
      const response = await api.put<KnowledgeItem>(`/knowledge/${id}`, params);
      return response;
    } catch (error) {
      throw new Error(`更新知识库条目失败: ${error}`);
    }
  },

  // 删除知识库条目
  deleteKnowledgeItem: async (id: string): Promise<void> => {
    try {
      await api.delete<void>(`/knowledge/${id}`);
    } catch (error) {
      throw new Error(`删除知识库条目失败: ${error}`);
    }
  },

  // 搜索知识库条目
  searchKnowledge: async (query: string, limit: number = 10): Promise<KnowledgeItem[]> => {
    try {
      const response = await api.post<KnowledgeItem[]>('/knowledge/search', { query, limit });
      return response;
    } catch (error) {
      throw new Error(`搜索知识库条目失败: ${error}`);
    }
  },

  // 对知识库条目进行向量化
  vectorizeKnowledgeItem: async (id: string): Promise<void> => {
    try {
      await api.post<void>(`/knowledge/${id}/vectorize`);
    } catch (error) {
      throw new Error(`知识库条目向量化失败: ${error}`);
    }
  },
};
