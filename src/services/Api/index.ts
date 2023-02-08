import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
} from "axios";

export class Api {
  private static instance: Api;
  public client!: AxiosInstance;

  constructor() {
    if (!Api.instance) {
      this.client = axios.create({
        baseURL: `${import.meta.env.VITE_API_URL}/api/v1/`,
      });
      this.client.interceptors.request.use((config) => {
        (config.headers as AxiosHeaders).set(
          "x-token",
          localStorage.getItem("token")
        );
        return config;
      });
      Api.instance = this;
    }

    return Api.instance;
  }

  get get() {
    return this.client.get;
  }
  get post() {
    return this.client.post;
  }
  get patch() {
    return this.client.patch;
  }
  get put() {
    return this.client.put;
  }
  get delete() {
    return this.client.delete;
  }

  public setAuthorization() {
    const token = localStorage.getItem("token");
    if (token) {
      this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      this.removeAuthorization();
    }
  }

  public removeAuthorization() {
    if (this.client.defaults.headers.common?.Authorization) {
      delete this.client.defaults.headers.common?.Authorization;
    }
  }

  // HEADER WHEN UPLOADING FILES
  public setFormHeader() {
    this.client.defaults.headers.post["Content-Type"] = "multipart/form-data";
    this.client.defaults.headers.post["Accept"] = "multipart/form-data";
  }

  // HEADER WHEN ANY OTHERS REQUESTS
  public setJsonHeader() {
    this.client.defaults.headers.post["Content-Type"] = "application/json";
    this.client.defaults.headers.post["Accept"] = "application/json";
  }

  public uploadFile(file: File, pet_id: string) {
    return new Promise(
      async (
        resolve: (value: {
          code?: number;
          error: boolean;
          data: unknown;
        }) => void,
        reject
      ) => {
        const ext = file?.name.split(".").pop();
        const newName = `image-${pet_id}.${ext}`;
        const formData = new FormData();
        formData.append("file", file, newName);
        try {
          const response = await this.client.post("file", formData);
          resolve({
            code: response.status,
            error: response.status < 200 || response.status >= 300,
            data: response.data,
          });
        } catch (error: unknown) {
          console.error(error);
          const { response } = error as AxiosError;
          resolve({
            code: response?.status,
            error: true,
            data: response?.data,
          });
        }
      }
    );
  }
}
