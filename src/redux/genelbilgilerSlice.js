import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  bankalar: [
      {
        id:0,
        isim:"Seç",
        resim:undefined
      },
      {
        id:1,
        isim:"Akbank",
        resim:require('../../assets/bankalar/Akbank.png')
      },
      {
        id:2,
        isim:"Ziraat",
        resim:require('../../assets/bankalar/Ziraat.png')
      },
      {
        id:3,
        isim:"Halkbank",
        resim:require('../../assets/bankalar/Halkbank.png')
      },
      {
        id:4,
        isim:"VakıfBank",
        resim:require('../../assets/bankalar/Vakif.png')
      },
      {
        id:5,
        isim:"İş Bankası",
        resim:require('../../assets/bankalar/isbankasi.png')
      },
      {
        id:6,
        isim:"Yapı Kredi",
        resim:require('../../assets/bankalar/yapikredi.png')
      },
      {
        id:7,
        isim:"DenizBank",
        resim:require('../../assets/bankalar/denizbank.png')
      },
      {
        id:8,
        isim:"Garanti BBVA",
        resim:require('../../assets/bankalar/garanti.png')
      },
      {
        id:9,
        isim:"ING",
        resim:require('../../assets/bankalar/ingbank.png')
      },
      {
        id:10,
        isim:"QNB FinansBank",
        resim:require('../../assets/bankalar/finansbank.png')
      },
      {
        id:11,
        isim:"Diğer",
        resim:undefined
      }
    ]
}

const genelBilgilerSlice = createSlice({
  name: 'genel',
  initialState,
  reducers: {
  }
});

export const {} = genelBilgilerSlice.actions

export default genelBilgilerSlice.reducer