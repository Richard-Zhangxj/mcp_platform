import { api } from './api';

// 定义日志条目类型
export interface LogEntry {
  id: string;
  tenantId: string;
  tenantName: string;
  templateId: string;
  templateName: string;
  processId: string;
  stepId: string;
  stepName: string;
  userId: string;
  userName: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  details: any;
  timestamp: string;
}

// 定义搜索日志的参数类型
export interface SearchLogParams {
  tenantId?: string;
  templateId?: string;
  processId?: string;
  stepId?: string;
  userId?: string;
  level?: 'info' | 'warn' | 'error';
  message?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

// 定义日志统计类型
export interface LogStats {
  totalLogs: number;
  infoLogs: number;
  warnLogs: number;
  errorLogs: number;
  errorRate: number;
}

// 定义错误分析类型
export interface ErrorAnalysis {
  errorType: string;
  errorMessage: string;
  count: number;
  firstOccurrence: string;
  lastOccurrence: string;
  affectedProcesses: string[];
}

// 日志服务
export const logService = {
  // 获取日志列表
  getLogs: async (params?: SearchLogParams): Promise<LogEntry[]> => {
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, String(value));
          }
        });
      }
      
      const response = await api.get<LogEntry[]>(`/logs?${queryParams.toString()}`);
      return response;
    } catch (error) {
      throw new Error(`获取日志列表失败: ${error}`);
    }
  },

  // 根据ID获取日志详情
  getLogById: async (id: string): Promise<LogEntry> => {
    try {
      const response = await api.get<LogEntry>(`/logs/${id}`);
      return response;
    } catch (error) {
      throw new Error(`获取日志详情失败: ${error}`);
    }
  },

  // 搜索日志
  searchLogs: async (params: SearchLogParams): Promise<LogEntry[]> => {
    try {
      const response = await api.post<LogEntry[]>('/logs/search', params);
      return response;
    } catch (error) {
      throw new Error(`搜索日志失败: ${error}`);
    }
  },

  // 获取日志统计信息
  getLogStats: async (params?: Omit<SearchLogParams, 'page' | 'limit'>): Promise<LogStats> => {
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, String(value));
          }
        });
      }
      
      const response = await api.get<LogStats>(`/logs/stats?${queryParams.toString()}`);
      return response;
    } catch (error) {
      throw new Error(`获取日志统计信息失败: ${error}`);
    }
  },

  // 获取错误分析
  getErrorAnalysis: async (params?: Omit<SearchLogParams, 'level' | 'page' | 'limit'>): Promise<ErrorAnalysis[]> => {
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, String(value));
          }
        });
      }
      
      const response = await api.get<ErrorAnalysis[]>(`/logs/errors?${queryParams.toString()}`);
      return response;
    } catch (error) {
      throw new Error(`获取错误分析失败: ${error}`);
    }
  },

  // 导出日志
  exportLogs: async (params?: SearchLogParams): Promise<Blob> => {
    try {
      const response = await api.post<Blob>('/logs/export', params, {
        responseType: 'blob',
      });
      return response;
    } catch (error) {
      throw new Error(`导出日志失败: ${error}`);
    }
  },
};
