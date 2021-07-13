import { createSlice } from "@reduxjs/toolkit";

const allFormsSlice = createSlice({
    name:'all',
    initialState:{
        data:[]
    },
    reducers:{
        addForms(state,action){
            state.data = action.payload.data;
        }
    }
});

export const allFormAction = allFormsSlice.actions;
export default allFormsSlice;