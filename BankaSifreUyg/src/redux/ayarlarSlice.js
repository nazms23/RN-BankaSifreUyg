import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    sifresor:false,
    parmakizi:false,
    girissifre:'1111',
    not:false,
    logoyazi:true,
    nsifresor:false,
    nparmakizi:false
}

//sifresor ======= uygulamanın girişte şifre sorma sayfasını kontrol eden şey

//nsifresor ====== genel şifre sorma ayarı 

//parmak izi için de aynısı geçerli

export const ayarlarSlice = createSlice({
    name:'ayarlar',
    initialState,
    reducers:{
        setSifresor: (state,action)=>{
            state.sifresor = action.payload
        },
        setParmakizi: (state,action)=>{
            state.parmakizi = action.payload
        },
        setnSifresor: (state,action)=>{
            state.nsifresor = action.payload
        },
        setnParmakizi: (state,action)=>{
            state.nparmakizi = action.payload
        },
        setGirissifre: (state,action)=>{
            state.girissifre = action.payload
        },
        setNot: (state,action)=>{
            state.not = action.payload
        },
        setLogoyazi: (state,action)=>{
            state.logoyazi = action.payload
        }
    }
})

export const {setSifresor,setParmakizi,setnSifresor,setnParmakizi,setGirissifre,setNot,setLogoyazi } = ayarlarSlice.actions
export default ayarlarSlice.reducer;