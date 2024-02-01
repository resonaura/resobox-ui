import { AxiosError } from 'axios';

export class RequestTools {
  static getApiErrorMessage(error: any): string {
    return (
      (error.response &&
        error.response.data &&
        ((error.response.data.message
          ? error.response.data.message +
            (error.response.data.details instanceof Array
              ? '\n\n' + error.response.data.details.join('\n')
              : '')
          : null) ||
          error.response.data.title ||
          error.response.data.status ||
          error.response.data.error)) ||
      error.message ||
      error.toString()
    );
  }

  static getApiErrorCode(error: any): number | null {
    if (error instanceof AxiosError) {
      return error.response ? error.response.status : null;
    }

    return null;
  }

  static getBase64FromUrl = async (url: string) => {
    const blob: Blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', url, true);
      xhr.send(xhr.response);
    });

    return await blob.text();
  };

  static buildQueryString(data: any) {
    return Object.keys(data)
      .map((key) => {
        let value = data[key];

        if (Array.isArray(value)) {
          return value
            .map((value: any) => `${key}=${encodeURIComponent(value)}`)
            .join('&');
        }
        return `${key}=${encodeURIComponent(value)}`;
      })
      .filter(Boolean) // фильтруем пустые строки
      .join('&');
  }
}
