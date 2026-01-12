import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status:false,
    userData:null
    // userData stores logged-in user details so the whole app knows WHO is logged in so that it can show user-specific data,entire app can access it
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action) => {
            state.status=true //log in
            state.userData= action.payload.userData //store user details in userData
        },
        logout:(state,action) => {
            state.status=false
            state.userData=null
        }
    }
})

export default authSlice.reducer;
export const {login,logout}= authSlice.actions;