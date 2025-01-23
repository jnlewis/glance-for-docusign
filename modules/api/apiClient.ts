import axios from 'axios';

const apiClient = async (apiHost: string, accessToken: string) => {
  const instance = axios.create({
    baseURL: apiHost,
  });

  if (accessToken) {
    instance.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  return instance;
};

export default apiClient;
