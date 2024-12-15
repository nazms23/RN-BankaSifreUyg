import { StyleSheet, View, ScrollView,Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, {useState,useEffect} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import KBListOgesi from '../components/KBListOgesi'
import KBEkle from '../components/KBEkle'
import Yukleniyor from '../components/Yukleniyor'

import {useSelector,useDispatch} from 'react-redux';
import {KBEkleSlice,KBSil,KBSifreDegis,KBBankaDegis,KBTurDegis, KBNoDegis, KBTarihDegis, KBCvcDegis, KBNotDegis,OncekiSayfaDegis} from '../redux/bilgilerSlice'



const KrediKart = ({navigation}) => {
  const dispacth = useDispatch()
  const {logoyazi,not} = useSelector(s=> s.ayar)
  const {kredikart} = useSelector(s=>s.bilgi)

  // Banka ve kart türleri
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
      id:-1,
      isim:"Kart Tür Seç",
    },
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
      dispacth(OncekiSayfaDegis('MobilBanka'))
      navigation.navigate('MobilBanka')
    },
    kredikartgecisfonk: ()=>{
      dispacth(OncekiSayfaDegis('KrediBanka'))
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

    scrolenasagit:()=>{
      this.scrollView.scrollToEnd({animated: true})
    }
  }




  const [yukle, setYukle] = useState(false)
  const [isKlavye, setIsKlavye] = useState(false)
  useEffect(()=>{
    setYukle(true)

    Keyboard.addListener('keyboardDidShow',()=> setIsKlavye(true))
    Keyboard.addListener('keyboardDidHide',()=> setIsKlavye(false))
  },[])



  return (
    <SafeAreaView style={styles.disdiv}>
      <Header flexx={1} title={"Kredi/Banka Kartı"} ayarlarfonk={fonksiyonlar.ayarlargecisfonk}/>
      <View style={styles.contdis}>
        {
          !yukle && <Yukleniyor/> 
        }
        <ScrollView style={[styles.contscrollvw,{display:yukle ? 'flex':'none'}]} ref={ref => {this.scrollView = ref}}>
        {
          yukle &&kredikart.map(i => {
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
          <KBEkle scroolfonk={fonksiyonlar.scrolenasagit} resimmi={logoyazi} bankalar={bankalar} eklefonk={fonksiyonlar.KBSifreEkle} karttur={kartturu} />
        </ScrollView>
      </View>

      {!isKlavye && <Footer flexx={1} hangisi={2} mobilfonk={fonksiyonlar.mobilbankgecisfonk} kredifonk={fonksiyonlar.kredikartgecisfonk} />}
      
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
    backgroundColor:'#E7E9EA',
    paddingTop: 20,
  },
  contscrollvw:{
    width:'100%',
    height:"100%",
  }
})