import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import {jwtDecode} from "jwt-decode";
import {server_url} from "../../utils/consts";
import Cookies from "universal-cookie";

const cookies = new Cookies()

export const getToken = createAsyncThunk("security/getCookies",
    async () => {
        return localStorage.getItem('token');
    }
)

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (payload, thunkAPI) => {
        try {
            const res = await axios.post(
                `${server_url}/user/registration`,
                payload
            )
            let token = res.data.token
            let decoded = jwtDecode(token)
            cookies.set('token', token, {path: '/', expires: new Date(Date.now() + decoded.exp)})
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const authUser = createAsyncThunk(
    'auth/authUser',
    async (payload, thunkAPI) => {
        try {
            const res = await axios.post(
                `${server_url}/user/login`,
                payload
            )
            let token = res.data.token
            let decoded = jwtDecode(token)
            cookies.set('token', token, {path: '/', expires: new Date(Date.now() + decoded.exp)})
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const getCurUser = createAsyncThunk(
    'auth/getCurUser',
    async (token, thunkAPI) => {
        try {
            const decoded = jwtDecode(token)
            const res = await axios.get(
                `${server_url}/user/${decoded.id}`,
            )
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        loading: false,
        error: "",
        success: false,
        curStoreId: null
    },
    reducers: {
        initCurStore: (state) => {
            state.token = cookies.get('token')
        },
        setCurStore: (state, action) => {
            state.curStoreId = action.payload
        },
        logout: (state) => {
            cookies.set('token', 'none', {path: '/', expires: new Date(Date.now() + 1)})
            state.user = null
            state.token = null
            state.loading = false
            state.success = false
            state.error = ""
            state.curStoreId = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.token = action.payload.token
                state.loading = false
                state.success = true
                state.error = ""
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.user = null
                state.token = null
                state.loading = false
                state.success = false
                state.error = action.payload
            })
            .addCase(authUser.pending, (state) => {
                state.loading = true
            })
            .addCase(authUser.fulfilled, (state, action) => {
                state.token = action.payload.token
                state.loading = false
                state.success = true
                state.error = ""
            })
            .addCase(authUser.rejected, (state, action) => {
                state.user = null
                state.token = null
                state.loading = false
                state.success = false
                state.error = action.payload
            })
            .addCase(getCurUser.pending, (state) => {
                state.loading = true
            })
            .addCase(getCurUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.loading = false
                state.success = true
                state.error = ""
            })
            .addCase(getCurUser.rejected, (state, action) => {
                state.user = null
                state.token = null
                state.loading = false
                state.success = false
                state.error = action.payload
            })
    }
});

export const selectToken = (state) => state.auth.token

export const selectUser = (state) => state.auth.user

export const selectUserError = (state) => state.auth.error

export const selectCurStore = (state) => state.auth.curStoreId

export const authReducer = authSlice.reducer

export const {logout, initCurStore, setCurStore} = authSlice.actions