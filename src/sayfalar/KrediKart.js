import { StyleSheet, View,Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import React, {useState,useEffect, useCallback} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import KBListOgesi from '../components/KBListOgesi'
import KBEkle from '../components/KBEkle'
import Yukleniyor from '../components/Yukleniyor'

import {useSelector,useDispatch} from 'react-redux';
import {KBEkleSlice,KBSil,KBSifreDegis,KBBankaDegis,KBTurDegis, KBNoDegis, KBTarihDegis, KBCvcDegis, KBNotDegis,OncekiSayfaDegis} from '../redux/bilgilerSlice'

import { LegendList } from '@legendapp/list'

const KrediKart = ({navigation}) => {
  const dispacth = useDispatch()
  const {logoyazi,not} = useSelector(s=> s.ayar)
  const {kredikart} = useSelector(s=>s.bilgi)

  // Banka ve kart türleri
  const {bankalar} = useSelector(s=> s.genel)

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

  let scrollView1;
  const fonksiyonlar = {
    mobilbankgecisfonk: useCallback(()=>{
      dispacth(OncekiSayfaDegis('MobilBanka'))
      navigation.navigate('MobilBanka')
    }),
    kredikartgecisfonk: ()=>{
      /* dispacth(OncekiSayfaDegis('KrediBanka'))
      navigation.navigate('KrediBanka') */
    },
    ayarlargecisfonk: useCallback(()=>{
      navigation.navigate('Ayarlar')
    }),

    KBSifreEkle: useCallback(async (bId,sifre,ktur)=>{
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
    }),
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
      scrollView1.scrollToEnd({animated: true})
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

        {
          yukle &&
          <LegendList
            style={{width:'96.5%',height:'auto'}}
            data={kredikart}
            renderItem={({item})=>
              <KBListOgesi 
                resimmi={logoyazi} key={item.id} not={not} 
                sifreidsi={item.id} resim={bankalar.find(v=> v.id == item.bankaId).resim} 
                bankaad={bankalar.find(v=> v.id == item.bankaId).isim} 
                kartturu={kartturu.find(v=> v.id == item.ktur).isim} 
                sifre={item.sifre} bId={bankalar.find(v=> v.id == item.bankaId).id} 
                kartbilgileriobj={{
                  kartno: item.kartnumara ,
                  tarih: item.karttarih,
                  cvc: item.kartcvc,
                  kartnot: item.kartnot,
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
                
                />}
            estimatedItemSize={10}
            ListFooterComponent={<KBEkle scroolfonk={fonksiyonlar.scrolenasagit} resimmi={logoyazi} bankalar={bankalar} eklefonk={fonksiyonlar.KBSifreEkle} karttur={kartturu} />}
            keyExtractor={item=>item.id}
            ref={ref => {scrollView1 = ref}}

          />
        } 
        
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