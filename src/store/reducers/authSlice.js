import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name:'auth',
    initialState:{
        isLoggedin:false,
        uid:null,
        email:null
    },
    reducers:{
        login(state,action){
            state.isLoggedin = true;
            state.uid=action.payload.uid;
            state.email=action.payload.email;
        }
    }
});



export const authActions = authSlice.actions;
export default authSlice;