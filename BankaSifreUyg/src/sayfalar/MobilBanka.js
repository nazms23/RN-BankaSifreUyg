import { StyleSheet, Text, View,SafeAreaView, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MBListOgesi from '../components/MBListOgesi'
import MbEkle from '../components/MbEkle'
import AsyncStorage from '@react-native-async-storage/async-storage';


const MobilBanka = ({navigation}) => {
  
  const [resimmi, setResimmi] = useState(true)

  const [yenileme, Setyenileme] = useState("")
  

  const [bankalar, setBankalar] = useState([
    {
      id:0,
      isim:"Akbank",
      resim:require('../../assets/bankalar/Akbank.png')
    },
    {
      id:1,
      isim:"Ziraat",
      resim:require('../../assets/bankalar/Ziraat.png')
    },
    {
      id:2,
      isim:"Halkbank",
      resim:require('../../assets/bankalar/Halkbank.png')
    },
    {
      id:3,
      isim:"VakıfBank",
      resim:require('../../assets/bankalar/Vakif.png')
    },
    {
      id:4,
      isim:"İş Bankası",
      resim:require('../../assets/bankalar/isbankasi.png')
    },
    {
      id:5,
      isim:"Yapı Kredi",
      resim:require('../../assets/bankalar/yapikredi.png')
    },
    {
      id:6,
      isim:"DenizBank",
      resim:require('../../assets/bankalar/denizbank.png')
    },
    {
      id:7,
      isim:"Garanti BBVA",
      resim:require('../../assets/bankalar/garanti.png')
    },
    {
      id:8,
      isim:"ING",
      resim:require('../../assets/bankalar/ingbank.png')
    },
    {
      id:9,
      isim:"QNB FinansBank",
      resim:require('../../assets/bankalar/finansbank.png')
    }
  ])

  const [mbsifreler, setMbsifreler] = useState({sifreler:[]})
  
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
    MBresimyazigecisfonk: ()=>{
      setResimmi(!resimmi)
    },
    SifreGuncelle: async ()=>{
      await AsyncStorage.setItem('mobilbanka',JSON.stringify(mbsifreler))
    },
    MBSifreEkle: async (bId,sifre)=>{
      let id = mbsifreler.sifreler.length > 0 ? mbsifreler.sifreler[mbsifreler.sifreler.length-1].id+1 : 1

      mbsifreler.sifreler.push({id:id,bankaId:bId,sifre:sifre})

      setMbsifreler(mbsifreler)
      fonksiyonlar.SifreGuncelle();

      Setyenileme("dsfsdfsdf"+Math.floor(Math.random() * 10) == yenileme ? "dsfsdfsdf"+Math.floor(Math.random() * 10 +20): "dsfsdfsdf"+Math.floor(Math.random() * 10))
      
    },
    MBSifreSil: (bId)=>{
      mbsifreler.sifreler.splice(mbsifreler.sifreler.findIndex(i=>i.id==bId),1)
      setMbsifreler(mbsifreler)

      fonksiyonlar.SifreGuncelle();
      
      Setyenileme("dsfsdfsdf"+Math.floor(Math.random() * 10) == yenileme ? "dsfsdfsdf"+Math.floor(Math.random() * 10 +20): "dsfsdfsdf"+Math.floor(Math.random() * 10))
    },
    MBSifreDegistir: (id,text)=>{
      mbsifreler.sifreler.find(i=>i.id == id).sifre = text
      setMbsifreler(mbsifreler)

      fonksiyonlar.SifreGuncelle();
    },
    MBBankaDegistir: (id,bId)=>{
      mbsifreler.sifreler.find(i=>i.id == id).bankaId = bId
      setMbsifreler(mbsifreler)

      fonksiyonlar.SifreGuncelle();
    }
  }


  useEffect(()=>{
    (async()=>{
      const sifreler = await AsyncStorage.getItem('mobilbanka').then(async (v)=>{
        if(v != null)
        {
          setMbsifreler(JSON.parse(v))
        }
        else
        {
          await AsyncStorage.setItem('mobilbanka',JSON.stringify({sifreler:[]}))
        }
      })
    })();
  },[])
  


  
  
  return (
    <SafeAreaView style={styles.disdiv}>
      
        <Header flexx={1} title={"Mobil Bankacılık"} logoyazi={true}  ayarlarfonk={fonksiyonlar.ayarlargecisfonk} resimisimfonk={fonksiyonlar.MBresimyazigecisfonk}/>
        <View style={styles.contdis}>
          <ScrollView style={styles.contscrollvw}>
          {

            mbsifreler.sifreler.map(i => {
              return(
                <MBListOgesi resimmi={resimmi} key={i.id} sifreidsi={i.id} resim={bankalar.find(v=> v.id == i.bankaId).resim} bankaad={bankalar.find(v=> v.id == i.bankaId).isim} sifre={i.sifre} bId={bankalar.find(v=> v.id == i.bankaId).id} silfonk={fonksiyonlar.MBSifreSil} sifredegisfonk={fonksiyonlar.MBSifreDegistir} bankadegisfonk={fonksiyonlar.MBBankaDegistir} bankalar={bankalar} />
              )
            })
          }
          <MbEkle resimmi={resimmi} bankalar={bankalar} eklefonk={fonksiyonlar.MBSifreEkle}/>
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