import TwitterAPI from '@/utilities/api';
import { createAsyncThunk } from '@reduxjs/toolkit'
import { loginBody, registerBody } from '@/schema/authSchema';

export const login = createAsyncThunk(
    'auth/login',
    async (data: loginBody, { rejectWithValue }) => {
        try {
            const response = await TwitterAPI.post('/auth/login', data)

            return Promise.resolve(response.data);

        } catch (error: any) {
            return rejectWithValue(error)
        }
    },
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await TwitterAPI.post('/auth/logout');
            return Promise.resolve( response.data);
        } catch (error: any) {
            return rejectWithValue(error)
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
            return rejectWithValue(error)
        }
    },
)