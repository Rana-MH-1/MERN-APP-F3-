import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const SignUp = createAsyncThunk('user/SignUp', async(newUser,{rejectWithValue})=>{
    try {
        const {data} = await axios.post('/api/auth/register',newUser)
        return data
    } catch (error) {
        return rejectWithValue(error.response.data.message ? error.response.data.message : error.response.data.errors )
    }
})

export const SignIn = createAsyncThunk('user/SignIn', async(user,{rejectWithValue})=>{
    try {
        const {data} = await axios.post('/api/auth/login',user)
        return data
    } catch (error) {
        return rejectWithValue(error.response.data.message ? error.response.data.message : error.response.data.errors )
    }
})

const authSlice = createSlice({
    name:'user',
    initialState:{
        isLoading: false,
        user: JSON.parse(localStorage.getItem('user')),
        msg:null,
        RegisterErrors: null,
        LoginErrors: null,
        token: localStorage.getItem('token'),
        isAuth: Boolean(localStorage.getItem('isAuth')),

    },

    reducers:{
        LogOut: (state)=>{
            localStorage.clear()
            state.user = null
            state.isAuth = false
            state.token = null
        },

        ClearErrors:(state)=>{
            state.LoginErrors= null
            state.RegisterErrors= null
        }

    },
    extraReducers:{
       [SignUp.pending]: (state)=>{
        state.isLoading = true
       },
       [SignUp.fulfilled]:(state,{type,payload})=>{
          state.isLoading = false
          state.msg = payload.msg
       },
       [SignUp.rejected]:(state,{type,payload})=>{
        state.RegisterErrors = payload
       },
       [SignIn.pending]:(state)=>{
        state.isLoading = true
       },
       [SignIn.fulfilled]: (state,{type,payload})=>{
        state.isLoading= false
        state.isAuth = true
        state.token = payload.token
        state.user = payload.isfound
        localStorage.setItem('token', payload.token)
        localStorage.setItem('user', JSON.stringify(payload.isfound))
        localStorage.setItem('isAuth', true)
       },
       [SignIn.rejected]:(state,{type,payload})=>{
        state.LoginErrors = payload
        state.isLoading = false
       }
    }
})

export default authSlice.reducer
export const {LogOut, ClearErrors} = authSlice.actions