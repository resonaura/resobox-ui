import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Bottleneck from 'bottleneck';

import axiosRetry from 'axios-retry';

export class DebouncedAxios {
  private limiter: Bottleneck;
  private axiosInstance: AxiosInstance;

  constructor(axios: AxiosInstance) {
    axiosRetry(axios, { retries: 3 });

    this.axiosInstance = axios;
    this.limiter = new Bottleneck({
      maxConcurrent: 3,
      minTime: 200,
    });
  }

  getUri(config?: AxiosRequestConfig): string {
    return this.axiosInstance.getUri(config);
  }

  request<T = any, R = AxiosResponse<T>, D = any>(
    config: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.limiter.schedule(() =>
      this.axiosInstance.request<T, R, D>(config),
    ) as unknown as Promise<R>;
  }

  get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.limiter.schedule(() =>
      this.axiosInstance.get<T, R, D>(url, config),
    ) as unknown as Promise<R>;
  }

  delete<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.limiter.schedule(() =>
      this.axiosInstance.delete<T, R, D>(url, config),
    ) as unknown as Promise<R>;
  }

  head<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.limiter.schedule(() =>
      this.axiosInstance.head<T, R, D>(url, config),
    ) as unknown as Promise<R>;
  }

  options<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.limiter.schedule(() =>
      this.axiosInstance.options<T, R, D>(url, config),
    ) as unknown as Promise<R>;
  }

  post<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.limiter.schedule(() =>
      this.axiosInstance.post<T, R, D>(url, data, config),
    ) as unknown as Promise<R>;
  }

  put<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.limiter.schedule(() =>
      this.axiosInstance.put<T, R, D>(url, data, config),
    ) as unknown as Promise<R>;
  }

  patch<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.limiter.schedule(() =>
      this.axiosInstance.patch<T, R, D>(url, data, config),
    ) as unknown as Promise<R>;
  }

  postForm<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.axiosInstance.postForm(url, data, config) as unknown as Promise<R>;
  }
  putForm<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.axiosInstance.putForm(url, data, config) as unknown as Promise<R>;
  }
  patchForm<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.axiosInstance.patchForm(url, data, config) as unknown as Promise<R>;
  }
}
