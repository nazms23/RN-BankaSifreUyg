import { configureStore } from "@reduxjs/toolkit";
import ayarlarSlice from "./ayarlarSlice";

export const store = configureStore({
    reducer:{
        ayar:ayarlarSlice
    }
});