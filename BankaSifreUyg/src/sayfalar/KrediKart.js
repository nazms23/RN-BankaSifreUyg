import { StyleSheet, View,SafeAreaView, ScrollView } from 'react-native'
import React, {useState} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import KBListOgesi from '../components/KBListOgesi'
import KBEkle from '../components/KBEkle'

import {useSelector,useDispatch} from 'react-redux';
import {KBEkleSlice,KBSil,KBSifreDegis,KBBankaDegis,KBTurDegis, KBNoDegis, KBTarihDegis, KBCvcDegis, KBNotDegis} from '../redux/bilgilerSlice'


const KrediKart = ({navigation}) => {
  const dispacth = useDispatch()
  const {logoyazi,not} = useSelector(s=> s.ayar)
  const {kredikart} = useSelector(s=>s.bilgi)

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
  const [kartturu, setKartturu] = useState([
    {
      id:0,
      isim:"Kredi/Banka",
    },
    {
      id:1,
      isim:"Kredi"
    },
    {
      id:2,
      isim:"Banka"
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

    KBSifreEkle: async (bId,sifre,ktur)=>{
      let id = kredikart.length > 0 ? kredikart[kredikart.length-1].id+1 : 1
      dispacth(KBEkleSlice({
        id:id,
        bankaId:bId,
        ktur:ktur,
        sifre:sifre,
        kartnumara:'',
        karttarih:'',
        kartcvc:'',
        kartnot: ''
      }))
    },
    KBSifreSil: (bId)=>{
      dispacth(KBSil(bId))
    },
    KBSifreDegistir: (id,text)=>{
      if(text.length == 4)
      {
        dispacth(KBSifreDegis({id:id,text:text}))
      }
    },
    KBBankaDegistir: (id,bId)=>{
      dispacth(KBBankaDegis({id:id,bId,bId}))
    },
    KBTurDegistir: (id,turId)=>{
      dispacth(KBTurDegis({id:id,turId:turId}))
    },



    KBNoDegistir:(id,no)=>{
      dispacth(KBNoDegis({id:id,no:no}))
    },
    KBTarihDegistir:(id,tarih)=>{
      dispacth(KBTarihDegis({id:id,tarih:tarih}))

    },
    KBCvcDegistir:(id,cvc)=>{
      dispacth(KBCvcDegis({id:id,cvc:cvc}))

    },
    KBNotDegistir:(id,not)=>{
      dispacth(KBNotDegis({id:id,not:not}))
    },
  }

  return (
    <SafeAreaView style={styles.disdiv}>
      <Header flexx={1} title={"Kredi/Banka Kartı"} ayarlarfonk={fonksiyonlar.ayarlargecisfonk}/>
      <View style={styles.contdis}>
        <ScrollView style={styles.contscrollvw}>
        {
          kredikart.map(i => {
            return(
              <KBListOgesi 
                resimmi={logoyazi} key={i.id} not={not} 
                sifreidsi={i.id} resim={bankalar.find(v=> v.id == i.bankaId).resim} 
                bankaad={bankalar.find(v=> v.id == i.bankaId).isim} 
                kartturu={kartturu.find(v=> v.id == i.ktur).isim} 
                sifre={i.sifre} bId={bankalar.find(v=> v.id == i.bankaId).id} 
                kartbilgileriobj={{
                  kartno: i.kartnumara ,
                  tarih: i.karttarih,
                  cvc: i.kartcvc,
                  kartnot: i.kartnot,
                  degisfonklar: {
                    nodegis:fonksiyonlar.KBNoDegistir,
                    tarihdegis:fonksiyonlar.KBTarihDegistir,
                    cvcdegis:fonksiyonlar.KBCvcDegistir,
                    notdegis:fonksiyonlar.KBNotDegistir
                  }
                }}
                silfonk={fonksiyonlar.KBSifreSil} 
                sifredegisfonk={fonksiyonlar.KBSifreDegistir} 
                bankadegisfonk={fonksiyonlar.KBBankaDegistir} 
                turdegisfonk={fonksiyonlar.KBTurDegistir} 
                bankalar={bankalar} 
                kartturler={kartturu} 
                
                />
            )
          })

        }
          <KBEkle resimmi={logoyazi} bankalar={bankalar} eklefonk={fonksiyonlar.KBSifreEkle} karttur={kartturu} />
        </ScrollView>
      </View>

      <Footer flexx={1} mobilfonk={fonksiyonlar.mobilbankgecisfonk} kredifonk={fonksiyonlar.kredikartgecisfonk} />
    </SafeAreaView>
  )
}

export default KrediKart

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