import { configureStore } from "@reduxjs/toolkit";
import ayarlarSlice from "./ayarlarSlice";
import bilgilerSlice from "./bilgilerSlice";
import genelBilgilerSlice from "./genelbilgilerSlice";

export const store = configureStore({
    reducer:{
        ayar:ayarlarSlice,
        bilgi:bilgilerSlice,
        genel:genelBilgilerSlice
    }
});