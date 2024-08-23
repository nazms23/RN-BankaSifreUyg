import { StyleSheet, Text, View,SafeAreaView, ScrollView } from 'react-native'
import React, {useState,useEffect} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import KBListOgesi from '../components/KBListOgesi'
import KBEkle from '../components/KBEkle'
import AsyncStorage from '@react-native-async-storage/async-storage';


const KrediKart = ({navigation}) => {

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

  const [kbsifreler, setKbsifreler] = useState({sifreler:[]})


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
    KBresimyazigecisfonk: ()=>{
      setResimmi(!resimmi)
    },
    SifreGuncelle: async ()=>{
      await AsyncStorage.setItem('kredikart',JSON.stringify(kbsifreler))
    },
    KBSifreEkle: async (bId,sifre,ktur)=>{
      let id = kbsifreler.sifreler.length > 0 ? kbsifreler.sifreler[kbsifreler.sifreler.length-1].id+1 : 1

      kbsifreler.sifreler.push({id:id,bankaId:bId,ktur:ktur,sifre:sifre})

      setKbsifreler(kbsifreler)

      fonksiyonlar.SifreGuncelle();

      Setyenileme("dsfsdfsdf"+Math.floor(Math.random() * 10) == yenileme ? "dsfsdfsdf"+Math.floor(Math.random() * 10 +20): "dsfsdfsdf"+Math.floor(Math.random() * 10))
      
    },
    KBSifreSil: (bId)=>{
      kbsifreler.sifreler.splice(kbsifreler.sifreler.findIndex(i=>i.id==bId),1)
      setKbsifreler(kbsifreler)

      fonksiyonlar.SifreGuncelle();

      Setyenileme("dsfsdfsdf"+Math.floor(Math.random() * 10) == yenileme ? "dsfsdfsdf"+Math.floor(Math.random() * 10 +20): "dsfsdfsdf"+Math.floor(Math.random() * 10))
    },
    KBSifreDegistir: (id,text)=>{
      kbsifreler.sifreler.find(i=>i.id == id).sifre = text
      setKbsifreler(kbsifreler)

      fonksiyonlar.SifreGuncelle();
    },
    KBBankaDegistir: (id,bId)=>{
      kbsifreler.sifreler.find(i=>i.id == id).bankaId = bId
      setKbsifreler(kbsifreler)

      fonksiyonlar.SifreGuncelle();

    },
    KBTurDegistir: (id,turId)=>{
      kbsifreler.sifreler.find(i=>i.id == id).ktur = turId
      setKbsifreler(kbsifreler)

      fonksiyonlar.SifreGuncelle();

    }
  }

  useEffect(()=>{
    (async()=>{
      const sifreler = await AsyncStorage.getItem('kredikart').then(async (v)=>{
        if(v != null)
        {
          setKbsifreler(JSON.parse(v))
        }
        else
        {
          await AsyncStorage.setItem('kredikart',JSON.stringify({sifreler:[]}))
        }
      })
    })();
  },[])

  return (
    <SafeAreaView style={styles.disdiv}>
      <Header flexx={1} title={"Kredi/Banka Kartı"} logoyazi={true} ayarlarfonk={fonksiyonlar.ayarlargecisfonk} resimisimfonk={fonksiyonlar.KBresimyazigecisfonk}/>
      <View style={styles.contdis}>
        <ScrollView style={styles.contscrollvw}>
        {
          kbsifreler.sifreler.map(i => {
            return(
              <KBListOgesi resimmi={resimmi} key={i.id} sifreidsi={i.id} resim={bankalar.find(v=> v.id == i.bankaId).resim} bankaad={bankalar.find(v=> v.id == i.bankaId).isim} kartturu={kartturu.find(v=> v.id == i.ktur).isim} sifre={i.sifre} bId={bankalar.find(v=> v.id == i.bankaId).id} silfonk={fonksiyonlar.KBSifreSil} sifredegisfonk={fonksiyonlar.KBSifreDegistir} bankadegisfonk={fonksiyonlar.KBBankaDegistir} turdegisfonk={fonksiyonlar.KBTurDegistir} bankalar={bankalar} kartturler={kartturu} />
            )
          })

        }
          <KBEkle resimmi={resimmi} bankalar={bankalar} eklefonk={fonksiyonlar.KBSifreEkle} karttur={kartturu} />
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