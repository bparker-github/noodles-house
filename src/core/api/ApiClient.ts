import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosRequestConfig,
} from 'axios';
import { useAuthStore } from '..';

export class ApiClient<T> {
  private axios: AxiosInstance;

  private interceptorId?: number;

  constructor() {
    this.axios = axios.create({
      baseURL: import.meta.env.NOOD_API_URL,
    });

    this.axios.interceptors.request.use((config) => {
      console.log('This is intercepted:', config);
      return config;
    });
    // this.axios.interceptors.request.use(this.onFulfilledInterceptor);
  }

  // private onFulfilledInterceptor = async (
  //   config: InternalAxiosRequestConfig
  // ): Promise<InternalAxiosRequestConfig> => {
  //   if (config.headers.Authorization) {
  //     console.warn('Authentication already present.');
  //     return config;
  //   }

  //   const authStore = useAuthStore();
  //   try {
  //     const token = await authStore.getToken();

  //     return {
  //       ...config,
  //       headers: {
  //         ...config.headers,
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };
  //   } catch (error) {
  //     console.warn('Fialed to get token:', error);
  //   }

  //   return config;
  // };
}
