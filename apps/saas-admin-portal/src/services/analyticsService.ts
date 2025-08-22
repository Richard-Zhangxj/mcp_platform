import { api } from './api';

// 定义流程统计类型
export interface ProcessStats {
  tenantId?: string;
  tenantName?: string;
  templateId?: string;
  templateName?: string;
  totalExecutions: number;
  successfulExecutions: number;
  failedExecutions: number;
  avgDuration: number; // 平均执行时间(秒)
  successRate: number; // 成功率(%)
  periodStart: string;
  periodEnd: string;
}

// 定义模板使用情况类型
export interface TemplateUsage {
  templateId: string;
  templateName: string;
  category: string;
  usageCount: number;
  lastUsed: string;
  avgDuration: number; // 平均执行时间(秒)
}

// 定义租户统计类型
export interface TenantStats {
  tenantId: string;
  tenantName: string;
  totalProcesses: number;
  totalExecutions: number;
  activeProcesses: number;
  failedProcesses: number;
  periodStart: string;
  periodEnd: string;
}

// 定义错误分析类型
export interface ErrorAnalysis {
  tenantId?: string;
  tenantName?: string;
  templateId?: string;
  templateName?: string;
  errorType: string;
  errorMessage: string;
  count: number;
  firstOccurrence: string;
  lastOccurrence: string;
  affectedProcesses: string[];
}

// 定义优化建议类型
export interface OptimizationSuggestion {
  tenantId?: string;
  templateId?: string;
  suggestionType: 'performance' | 'reliability' | 'usability';
  description: string;
  priority: 'low' | 'medium' | 'high';
  estimatedImpact: string;
  implementationGuide: string;
}

// 定义分析报告类型
export interface AnalyticsReport {
  reportId: string;
  generatedAt: string;
  periodStart: string;
  periodEnd: string;
  tenantId?: string;
  summary: {
    totalProcesses: number;
    totalExecutions: number;
    successRate: number;
    avgDuration: number;
  };
  topTemplates: Array<{
    templateId: string;
    templateName: string;
    usageCount: number;
    successRate: number;
  }>;
  errorSummary: {
    totalErrors: number;
    topErrorTypes: Array<{
      errorType: string;
      count: number;
      percentage: number;
    }>;
  };
  recommendations: OptimizationSuggestion[];
}

// 定义获取分析数据的参数类型
export interface AnalyticsParams {
  tenantId?: string;
  templateId?: string;
  startDate?: string;
  endDate?: string;
}

// 分析服务
export const analyticsService = {
  // 获取流程统计信息
  getProcessStats: async (params?: AnalyticsParams): Promise<ProcessStats[]> => {
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, String(value));
          }
        });
      }
      
      const response = await api.get<ProcessStats[]>(`/analytics/process-stats?${queryParams.toString()}`);
      return response;
    } catch (error) {
      throw new Error(`获取流程统计信息失败: ${error}`);
    }
  },

  // 获取模板使用情况
  getTemplateUsage: async (params?: Omit<AnalyticsParams, 'templateId'>): Promise<TemplateUsage[]> => {
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, String(value));
          }
        });
      }
      
      const response = await api.get<TemplateUsage[]>(`/analytics/template-usage?${queryParams.toString()}`);
      return response;
    } catch (error) {
      throw new Error(`获取模板使用情况失败: ${error}`);
    }
  },

  // 获取租户统计信息
  getTenantStats: async (params?: Omit<AnalyticsParams, 'tenantId'>): Promise<TenantStats[]> => {
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, String(value));
          }
        });
      }
      
      const response = await api.get<TenantStats[]>(`/analytics/tenant-stats?${queryParams.toString()}`);
      return response;
    } catch (error) {
      throw new Error(`获取租户统计信息失败: ${error}`);
    }
  },

  // 获取错误分析
  getErrorAnalysis: async (params?: AnalyticsParams): Promise<ErrorAnalysis[]> => {
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, String(value));
          }
        });
      }
      
      const response = await api.get<ErrorAnalysis[]>(`/analytics/error-analysis?${queryParams.toString()}`);
      return response;
    } catch (error) {
      throw new Error(`获取错误分析失败: ${error}`);
    }
  },

  // 获取优化建议
  getOptimizationSuggestions: async (params?: AnalyticsParams): Promise<OptimizationSuggestion[]> => {
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, String(value));
          }
        });
      }
      
      const response = await api.get<OptimizationSuggestion[]>(`/analytics/optimization-suggestions?${queryParams.toString()}`);
      return response;
    } catch (error) {
      throw new Error(`获取优化建议失败: ${error}`);
    }
  },

  // 生成分析报告
  generateReport: async (params?: AnalyticsParams): Promise<AnalyticsReport> => {
    try {
      const response = await api.post<AnalyticsReport>('/analytics/generate-report', params);
      return response;
    } catch (error) {
      throw new Error(`生成分析报告失败: ${error}`);
    }
  },

  // 导出分析报告
  exportReport: async (params?: AnalyticsParams): Promise<Blob> => {
    try {
      const response = await api.post<Blob>('/analytics/export-report', params, {
        responseType: 'blob',
      });
      return response;
    } catch (error) {
      throw new Error(`导出分析报告失败: ${error}`);
    }
  },
};
