export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
}

export interface HealthStatus {
  status: string;
  uptime: number;
  timestamp: string;
  version: string;
}

export interface HelloResponse {
  message: string;
  timestamp: string;
}

export interface ErrorResponse {
  error: string;
  message?: string;
  path?: string;
  method?: string;
}
