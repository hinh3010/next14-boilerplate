'use client'
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { storage } from './storage-actions';

class AxiosActions {
    private instance: AxiosInstance;
    private _baseURL: string = process.env.BASE_URL || 'http://localhost:3000/api';

    constructor() {
        this.instance = axios.create({
            baseURL: this._baseURL,
            timeout: 300000,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                Pragma: 'no-cache',
                Expires: 0,
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        this.instance.interceptors.request.use(
            (config) => {
                const token = storage.get('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                return config;
            },
            (error) => {
                throw new Error(error);
            },
        );

        this.instance.interceptors.response.use(
            (response: AxiosResponse) => {
                return response.data;
            },
            async (error: any) => {
                if (error.response) {
                    const message: string = error.response.data.message;

                    if (message === 'Token has expired') {
                        const refreshToken = storage.get('refresh-token');
                        if (refreshToken) {
                            try {
                                const response = await axios.post(this._baseURL + '/auth/refresh', { refreshToken });
                                if (response.data) {
                                    const { token, refreshToken } = response.data;
                                    storage.set('token', token);
                                    storage.set('refresh-token', refreshToken);

                                    // Retry the original request
                                    return this.instance.request(error.config);
                                }
                            } catch (error) {
                                storage.remove('token');
                                storage.remove('user-info');
                                storage.remove('refresh-token');
                            }
                        }
                    }
                    throw new Error(message);
                } else if (error.request) {
                    throw new Error('No response received from the server.');
                } else {
                    throw new Error('Request error occurred.');
                }
            },
        );
    }

    public getInstance(): AxiosInstance {
        return this.instance;
    }
}

// Example usage:
export const axiosActions = new AxiosActions().getInstance();
