import { StyleSheet, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, {useState} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MBListOgesi from '../components/MBListOgesi'
import MbEkle from '../components/MbEkle'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useSelector,useDispatch} from 'react-redux';
import {MBEkleSlice,MBSil,MBSifreDegis,MBBankaDegis} from '../redux/bilgilerSlice'



const MobilBanka = ({navigation}) => {
  const dispacth = useDispatch()
  
  const {logoyazi} = useSelector(s=> s.ayar)

  const {mobilbanka} = useSelector(s=>s.bilgi)

  const [bankalar, setBankalar] = useState([
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
  ])
  
  const fonksiyonlar = {
    mobilbankgecisfonk: ()=>{
      navigation.navigate('MobilBanka')
    },
    kredikartgecisfonk: ()=>{
      navigation.navigate('KrediBanka')
    },
    ayarlargecisfonk: ()=>{
      navigation.navigate('Ayarlar')
    },

    MBSifreEkle: async (bId,sifre)=>{
      let id = mobilbanka.length > 0 ? mobilbanka[mobilbanka.length-1].id+1 : 1
      dispacth(MBEkleSlice({id:id,bankaId:bId,sifre:sifre}))
    },
    MBSifreSil: (bId)=>{
      dispacth(MBSil({bId}))
    },
    MBSifreDegistir: (id,text)=>{
      if(text.length == 6)
      {
        dispacth(MBSifreDegis({id:id,text:text}))
      }

    },
    MBBankaDegistir: (id,bId)=>{
      dispacth(MBBankaDegis({id:id,bId:bId}))
    }
  }
  
  return (
    <SafeAreaView style={styles.disdiv}>
      
        <Header flexx={1} title={"Mobil Bankacılık"} ayarlarfonk={fonksiyonlar.ayarlargecisfonk}/>
        <View style={styles.contdis}>
          <ScrollView style={styles.contscrollvw}>
          {
            mobilbanka != undefined &&
            mobilbanka.map(i => {
              return(
                <MBListOgesi 
                  resimmi={logoyazi} 
                  key={i.id} 
                  sifreidsi={i.id} 
                  resim={bankalar.find(v=> v.id == i.bankaId).resim} 
                  bankaad={bankalar.find(v=> v.id == i.bankaId).isim} 
                  sifre={i.sifre} bId={bankalar.find(v=> v.id == i.bankaId).id} 
                  silfonk={fonksiyonlar.MBSifreSil} sifredegisfonk={fonksiyonlar.MBSifreDegistir} 
                  bankadegisfonk={fonksiyonlar.MBBankaDegistir} 
                  bankalar={bankalar} 
                />
              )
            })
          }
          <MbEkle resimmi={logoyazi} bankalar={bankalar} eklefonk={fonksiyonlar.MBSifreEkle}/>
          </ScrollView>
        </View>
      
      
      
      
    

    <Footer flexx={1} mobilfonk={fonksiyonlar.mobilbankgecisfonk} kredifonk={fonksiyonlar.kredikartgecisfonk} />
    </SafeAreaView>
  )
}

export default MobilBanka

const styles = StyleSheet.create({
  disdiv:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  contdis:{
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
    flex:10,
    backgroundColor:'lightred',
  },
  contscrollvw:{
    width:'100%',
    height:"100%",
  }
})