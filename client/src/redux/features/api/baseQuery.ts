import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

interface AxiosBaseQueryArgs {
  url: string;
  method: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
}

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<AxiosBaseQueryArgs, unknown, unknown> =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ 
        url: baseUrl + url, 
        method, 
        data, 
        params,
        withCredentials: true // This enables cookies
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data ?? err.message,
        },
      };
    }
  };

