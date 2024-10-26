import { AxiosError } from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import TwitterAPI from '@/utilities/api';
import { loginBody, registerBody } from '@/schema/authSchema';

export const login = createAsyncThunk(
    'auth/login',
    async (data: loginBody, { rejectWithValue }) => {
        try {
            const response = await TwitterAPI.post('/auth/login', data)

            return Promise.resolve(response.data);

        } catch (error: any) {
            if (error instanceof AxiosError) {
                const response = error.response?.data;
                return rejectWithValue(response)
            } else if (error instanceof Error) {
                return rejectWithValue(error.message)
            } else {
                return rejectWithValue(error)
            }
        }
    },
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await TwitterAPI.post('/auth/logout');
            return Promise.resolve(response.data);
        } catch (error: any) {
            if (error instanceof AxiosError) {
                const response = error.response?.data;
                return rejectWithValue(response)
            } else if (error instanceof Error) {
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue({
                    error: true,
                    message: "An error occurred"
                });
            }
        }

    },
)

export const signUp = createAsyncThunk(
    'auth/register',
    async (data: registerBody, { rejectWithValue }) => {
        try {
            const response = await TwitterAPI.post('/auth/register', data)
            return response.data
        } catch (error: any) {

            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data)
            } else if (error instanceof Error) {
                return rejectWithValue(error.message)
            } else {
                return rejectWithValue(error)
            }
        }
    },
)