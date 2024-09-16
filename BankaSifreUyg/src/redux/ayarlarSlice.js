import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    sifresor:false, //uygulamanın girişte şifre sorma sayfasını kontrol eden şey
    parmakizi:false, //uygulamanın girişte parmak izi sayfasını kontrol eden şey
    girissifre:'1111', //uygulama giriş şifresi (4 hane)
    not:false, //kart bilgileri kısmında notun sürekli gözüküp gözükmeyeceği
    logoyazi:true, //bankaların logosunun mu yoksa isminin mi gözükmesi
    nsifresor:false, //genel şifre sorma ayarı 
    nparmakizi:false //genel parmak izi ayarı
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