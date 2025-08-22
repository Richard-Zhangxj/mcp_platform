import { api } from './api';

// 定义流程模板类型
export interface ProcessTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  version: string;
  dsl: any; // 流程DSL定义
  isPublic: boolean;
  status: 'draft' | 'published' | 'archived';
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

// 定义创建流程模板的参数类型
export interface CreateTemplateParams {
  name: string;
  description?: string;
  category: string;
  version: string;
  dsl: any;
  isPublic: boolean;
}

// 定义更新流程模板的参数类型
export interface UpdateTemplateParams {
  name?: string;
  description?: string;
  category?: string;
  version?: string;
  dsl?: any;
  isPublic?: boolean;
  status?: 'draft' | 'published' | 'archived';
}

// 定义搜索流程模板的参数类型
export interface SearchTemplateParams {
  name?: string;
  category?: string;
  status?: 'draft' | 'published' | 'archived';
  isPublic?: boolean;
  page?: number;
  limit?: number;
}

// 流程模板服务
export const templateService = {
  // 获取流程模板列表
  getTemplates: async (params?: SearchTemplateParams): Promise<ProcessTemplate[]> => {
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, String(value));
          }
        });
      }
      
      const response = await api.get<ProcessTemplate[]>(`/templates?${queryParams.toString()}`);
      return response;
    } catch (error) {
      throw new Error(`获取流程模板列表失败: ${error}`);
    }
  },

  // 根据ID获取流程模板详情
  getTemplateById: async (id: string): Promise<ProcessTemplate> => {
    try {
      const response = await api.get<ProcessTemplate>(`/templates/${id}`);
      return response;
    } catch (error) {
      throw new Error(`获取流程模板详情失败: ${error}`);
    }
  },

  // 创建流程模板
  createTemplate: async (params: CreateTemplateParams): Promise<ProcessTemplate> => {
    try {
      const response = await api.post<ProcessTemplate>('/templates', params);
      return response;
    } catch (error) {
      throw new Error(`创建流程模板失败: ${error}`);
    }
  },

  // 更新流程模板
  updateTemplate: async (id: string, params: UpdateTemplateParams): Promise<ProcessTemplate> => {
    try {
      const response = await api.put<ProcessTemplate>(`/templates/${id}`, params);
      return response;
    } catch (error) {
      throw new Error(`更新流程模板失败: ${error}`);
    }
  },

  // 删除流程模板
  deleteTemplate: async (id: string): Promise<void> => {
    try {
      await api.delete<void>(`/templates/${id}`);
    } catch (error) {
      throw new Error(`删除流程模板失败: ${error}`);
    }
  },

  // 发布流程模板
  publishTemplate: async (id: string): Promise<void> => {
    try {
      await api.post<void>(`/templates/${id}/publish`);
    } catch (error) {
      throw new Error(`发布流程模板失败: ${error}`);
    }
  },

  // 取消发布流程模板
  unpublishTemplate: async (id: string): Promise<void> => {
    try {
      await api.post<void>(`/templates/${id}/unpublish`);
    } catch (error) {
      throw new Error(`取消发布流程模板失败: ${error}`);
    }
  },

  // 复制流程模板
  copyTemplate: async (id: string): Promise<ProcessTemplate> => {
    try {
      const response = await api.post<ProcessTemplate>(`/templates/${id}/copy`);
      return response;
    } catch (error) {
      throw new Error(`复制流程模板失败: ${error}`);
    }
  },
};
