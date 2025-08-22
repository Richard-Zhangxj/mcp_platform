import { api } from './api';

// 定义租户类型
export interface Tenant {
  id: string;
  name: string;
  description: string;
  contactEmail: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// 定义API密钥类型
export interface ApiKey {
  id: string;
  tenantId: string;
  name: string;
  keyHash: string;
  createdAt: string;
  expiresAt: string;
  isActive: boolean;
}

// 定义创建租户的参数类型
export interface CreateTenantParams {
  name: string;
  description?: string;
  contactEmail: string;
  isActive: boolean;
}

// 定义更新租户的参数类型
export interface UpdateTenantParams {
  name?: string;
  description?: string;
  contactEmail?: string;
  isActive?: boolean;
}

// 定义创建API密钥的参数类型
export interface CreateApiKeyParams {
  name: string;
  description?: string;
  expiresAt?: string;
}

// 租户服务
export const tenantService = {
  // 获取租户列表
  getTenants: async (): Promise<Tenant[]> => {
    try {
      const response = await api.get<Tenant[]>('/tenants');
      return response;
    } catch (error) {
      throw new Error(`获取租户列表失败: ${error}`);
    }
  },

  // 根据ID获取租户详情
  getTenantById: async (id: string): Promise<Tenant> => {
    try {
      const response = await api.get<Tenant>(`/tenants/${id}`);
      return response;
    } catch (error) {
      throw new Error(`获取租户详情失败: ${error}`);
    }
  },

  // 创建租户
  createTenant: async (params: CreateTenantParams): Promise<Tenant> => {
    try {
      const response = await api.post<Tenant>('/tenants', params);
      return response;
    } catch (error) {
      throw new Error(`创建租户失败: ${error}`);
    }
  },

  // 更新租户
  updateTenant: async (id: string, params: UpdateTenantParams): Promise<Tenant> => {
    try {
      const response = await api.put<Tenant>(`/tenants/${id}`, params);
      return response;
    } catch (error) {
      throw new Error(`更新租户失败: ${error}`);
    }
  },

  // 删除租户
  deleteTenant: async (id: string): Promise<void> => {
    try {
      await api.delete<void>(`/tenants/${id}`);
    } catch (error) {
      throw new Error(`删除租户失败: ${error}`);
    }
  },

  // 获取租户的API密钥列表
  getApiKeys: async (tenantId: string): Promise<ApiKey[]> => {
    try {
      const response = await api.get<ApiKey[]>(`/tenants/${tenantId}/api-keys`);
      return response;
    } catch (error) {
      throw new Error(`获取API密钥列表失败: ${error}`);
    }
  },

  // 为租户创建API密钥
  createApiKey: async (tenantId: string, params: CreateApiKeyParams): Promise<ApiKey> => {
    try {
      const response = await api.post<ApiKey>(`/tenants/${tenantId}/api-keys`, params);
      return response;
    } catch (error) {
      throw new Error(`创建API密钥失败: ${error}`);
    }
  },

  // 删除租户的API密钥
  deleteApiKey: async (tenantId: string, keyId: string): Promise<void> => {
    try {
      await api.delete<void>(`/tenants/${tenantId}/api-keys/${keyId}`);
    } catch (error) {
      throw new Error(`删除API密钥失败: ${error}`);
    }
  },
};
