export interface ApiError {
    status: number;
    data?: {
      message?: string;
      success?: boolean;
    //   errorSources?: any[];
      stack?: string;
    };
  }
  