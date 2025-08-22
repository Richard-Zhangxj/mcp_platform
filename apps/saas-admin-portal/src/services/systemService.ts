import { api } from './api';

// 定义系统状态类型
export interface SystemStatus {
  apiStatus: 'healthy' | 'warning' | 'error';
  databaseStatus: 'healthy' | 'warning' | 'error';
  cacheStatus: 'healthy' | 'warning' | 'error';
  queueStatus: 'healthy' | 'warning' | 'error';
  lastChecked: string;
}

// 定义用户统计类型
export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  newUsersThisMonth: number;
}

// 定义API统计类型
export interface ApiStats {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number; // 毫秒
  requestsPerMinute: number;
}

// 定义系统配置类型
export interface SystemConfig {
  maxConcurrentProcesses: number;
  defaultTimeout: number; // 秒
  logRetentionDays: number;
  enableDebugLogging: boolean;
  enablePerformanceMonitoring: boolean;
}

// 定义系统信息类型
export interface SystemInfo {
  version: string;
  buildTime: string;
  environment: string;
  os: string;
  database: string;
  cache: string;
  messageQueue: string;
}

// 系统服务
export const systemService = {
  // 获取系统状态
  getSystemStatus: async (): Promise<SystemStatus> => {
    try {
      const response = await api.get<SystemStatus>('/system/status');
      return response;
    } catch (error) {
      throw new Error(`获取系统状态失败: ${error}`);
    }
  },

  // 获取用户统计
  getUserStats: async (): Promise<UserStats> => {
    try {
      const response = await api.get<UserStats>('/system/user-stats');
      return response;
    } catch (error) {
      throw new Error(`获取用户统计失败: ${error}`);
    }
  },

  // 获取API统计
  getApiStats: async (): Promise<ApiStats> => {
    try {
      const response = await api.get<ApiStats>('/system/api-stats');
      return response;
    } catch (error) {
      throw new Error(`获取API统计失败: ${error}`);
    }
  },

  // 获取系统配置
  getSystemConfig: async (): Promise<SystemConfig> => {
    try {
      const response = await api.get<SystemConfig>('/system/config');
      return response;
    } catch (error) {
      throw new Error(`获取系统配置失败: ${error}`);
    }
  },

  // 更新系统配置
  updateSystemConfig: async (config: Partial<SystemConfig>): Promise<SystemConfig> => {
    try {
      const response = await api.put<SystemConfig>('/system/config', config);
      return response;
    } catch (error) {
      throw new Error(`更新系统配置失败: ${error}`);
    }
  },

  // 获取系统信息
  getSystemInfo: async (): Promise<SystemInfo> => {
    try {
      const response = await api.get<SystemInfo>('/system/info');
      return response;
    } catch (error) {
      throw new Error(`获取系统信息失败: ${error}`);
    }
  },

  // 重启系统服务
  restartServices: async (): Promise<void> => {
    try {
      await api.post<void>('/system/restart');
    } catch (error) {
      throw new Error(`重启系统服务失败: ${error}`);
    }
  },

  // 清除缓存
  clearCache: async (): Promise<void> => {
    try {
      await api.post<void>('/system/clear-cache');
    } catch (error) {
      throw new Error(`清除缓存失败: ${error}`);
    }
  },

  // 执行垃圾回收
  runGarbageCollection: async (): Promise<void> => {
    try {
      await api.post<void>('/system/gc');
    } catch (error) {
      throw new Error(`执行垃圾回收失败: ${error}`);
    }
  },
};
