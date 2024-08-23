import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    sifresor:false,
    parmakizi:false
}


export const ayarlarSlice = createSlice({
    name:'ayarlar',
    initialState,
    reducers:{
        setSifresor: (state,action)=>{
            state.sifresor = action.payload
        },
        setParmakizi: (state,action)=>{
            state.parmakizi = action.payload
        }
    }
})

export const {setSifresor,setParmakizi } = ayarlarSlice.actions
export default ayarlarSlice.reducer;