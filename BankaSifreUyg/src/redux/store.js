import { configureStore } from "@reduxjs/toolkit";
import ayarlarSlice from "./ayarlarSlice";
import bilgilerSlice from "./bilgilerSlice";

export const store = configureStore({
    reducer:{
        ayar:ayarlarSlice,
        bilgi:bilgilerSlice
    }
});