import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const config= {headers:{token: localStorage.getItem('token')}}

export const getAllPostss = createAsyncThunk('post/getAllPostss', async(_,{rejectWithValue})=>{
    try {
        const {data} = await axios.get('/api/posts/', config)
        return data
    } catch (error) {
        return rejectWithValue(error.response.data.message.error)
    }
})

export const AddPost = createAsyncThunk('post/AddPost', async(newPost,{rejectWithValue,dispatch})=>{
    try {
        const {data} = await axios.post('/api/posts/', newPost,config)
        dispatch(getAllPostss())
        return data
    } catch (error) {
       return rejectWithValue(error.response.data.message.error)
    }
})



const PostSlice = createSlice({
    name:'post',
    initialState:{
        isLoading:false,
        posts:[],
        Message:null,
        Errors: null
    },
    extraReducers:{
        [AddPost.pending]: (state)=>{
            state.isLoading = true
        },
        [AddPost.fulfilled]: (state,{type,payload})=>{
            state.isLoading = false

           state.Message = payload.msg
        },
        [AddPost.rejected]:(state,{type,payload})=>{
            state.Errors = payload
        },
        [getAllPostss.pending]: (state)=>{
            state.isLoading = true
        },
        [getAllPostss.fulfilled]: (state,{type,payload})=>{
            state.isLoading = false

           state.posts = payload
        },
        [getAllPostss.rejected]:(state,{type,payload})=>{
            state.Errors = payload
        }
    }
})

export default PostSlice.reducer