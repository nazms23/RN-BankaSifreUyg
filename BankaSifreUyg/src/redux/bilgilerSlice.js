import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  mobilbanka: [],
  kredikart:[]
}

const MBkaydet = async (d) =>{
  await AsyncStorage.setItem('mobilbanka',JSON.stringify({sifreler:d}))
}
const KBkaydet = async (d) =>{
  await AsyncStorage.setItem('kredikart',JSON.stringify({sifreler:d}))
}

const bilgilerSlice = createSlice({
  name: 'bilgiler',
  initialState,
  reducers: {

    //* MOBİL BANKACILIK KISMI

    setMobilbanka: (state,action)=>{
      state.mobilbanka = action.payload
    },
    MBEkleSlice: (state,action)=>{
      state.mobilbanka.push(action.payload)
      MBkaydet(state.mobilbanka)
    },
    MBSil: (state,action)=>{
      state.mobilbanka.splice(state.mobilbanka.findIndex(i=>i.id==action.payload),1)
      MBkaydet(state.mobilbanka)
    },
    MBSifreDegis: (state,action)=>{
      state.mobilbanka.find(i=>i.id == action.payload.id).sifre = action.payload.text
      MBkaydet(state.mobilbanka)
    },
    MBBankaDegis: (state,action)=>{
      state.mobilbanka.find(i=>i.id == action.payload.id).bankaId = action.payload.bId
      MBkaydet(state.mobilbanka)
    },

    //* KREDİ/BANKA KARTI KISMI

    setKredikart: (state,action)=>{
      state.kredikart = action.payload
    },
    KBEkleSlice: (state,action)=>{
      state.kredikart.push(action.payload)
      KBkaydet(state.kredikart)
    },
    KBSil: (state,action)=>{
      state.kredikart.splice(state.kredikart.findIndex(i=>i.id==action.payload),1)
      KBkaydet(state.kredikart)
    },
    KBSifreDegis: (state,action)=>{
      state.kredikart.find(i=>i.id == action.payload.id).sifre = action.payload.text
      KBkaydet(state.kredikart)
    },
    KBBankaDegis: (state,action)=>{
      state.kredikart.find(i=>i.id == action.payload.id).bankaId = action.payload.bId
      KBkaydet(state.kredikart)
    },
    KBTurDegis: (state,action)=>{
      state.kredikart.find(i=>i.id == action.payload.id).ktur = action.payload.turId
      KBkaydet(state.kredikart)
    },
    KBNoDegis: (state,action)=>{
      state.kredikart.find(i=>i.id == action.payload.id).kartnumara = action.payload.no
      KBkaydet(state.kredikart)
    },
    KBTarihDegis: (state,action)=>{
      state.kredikart.find(i=>i.id == action.payload.id).karttarih = action.payload.tarih
      KBkaydet(state.kredikart)
    },
    KBCvcDegis: (state,action)=>{
      state.kredikart.find(i=>i.id == action.payload.id).kartcvc = action.payload.cvc
      KBkaydet(state.kredikart)
    },
    KBNotDegis: (state,action)=>{
      state.kredikart.find(i=>i.id == action.payload.id).kartnot = action.payload.not
      KBkaydet(state.kredikart)
    }
  }
});

export const {setKredikart,setMobilbanka,MBEkleSlice,MBSil,MBSifreDegis,MBBankaDegis,KBEkleSlice,KBSil,KBSifreDegis,KBBankaDegis,KBTurDegis,KBNoDegis,KBTarihDegis,KBCvcDegis,KBNotDegis} = bilgilerSlice.actions

export default bilgilerSlice.reducer