import { StyleSheet, Text, View,SafeAreaView, Image,Pressable, TextInput } from 'react-native'
import React, {useState,useEffect} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Ayarlar = ({navigation}) => {
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
    Ayardegisti:async ()=>{
      await AsyncStorage.setItem('ayarlar',JSON.stringify(ayarlarstate))
    },
    AyarParmakizisecfonk: async ()=>{
      ayarlarstate.parmaksor = !parmakizi
      ayarlarstate.sifresor = false
      setParmakizi(!parmakizi)
      setSifresor(false)

      await fonksiyonlar.Ayardegisti();
    },
    AyarSifreDegis:async (t) =>{
      t.length!=0 ? setGirisSifresi(parseInt(t)) : setGirisSifresi(t)
      if(t.length == 4)
      {
        ayarlarstate.girissifre = t
        setNormalsifre(t)
        await fonksiyonlar.Ayardegisti();
      }
    },
    AyarSifresec: async ()=>{
      ayarlarstate.parmaksor = false
      ayarlarstate.sifresor = !sifresor
      setParmakizi(false)
      setSifresor(!sifresor)

      await fonksiyonlar.Ayardegisti();
    }
  }




  const [sifresor, setSifresor] = useState(true)

  const [girisSifresi, setGirisSifresi] = useState(1111)

  const [normalsifre, setNormalsifre] = useState(1111)


  const [parmakizi, setParmakizi] = useState(false)

  const [ayarlarstate, setAyarlarstate] = useState({
    sifresor:false,
    girissifre:1111,
    parmaksor:false})



  const [parmakizivarmi, setParmakizivarmi] = useState(false)

  useEffect(()=>{
    (async ()=>{
      const parmak = await LocalAuthentication.hasHardwareAsync();
      setParmakizivarmi(parmak)

      const ayarlar = await AsyncStorage.getItem('ayarlar').then(async (veri)=>{
        if(veri != null || veri == '')
        {
          const ayar = JSON.parse(veri)
          setSifresor(ayar.sifresor)
          setGirisSifresi(ayar.girissifre)
          setNormalsifre(ayar.girissifre)
          setParmakizi(ayar.parmaksor)
          setAyarlarstate(ayar)


        }
      })

    })();
  },[]);

  


  return (
    <SafeAreaView style={styles.disdiv}>
      <Header flexx={1} title={"Ayarlar"} logoyazi={false} ayarlarfonk={fonksiyonlar.ayarlargecisfonk} />

      <View style={styles.contdis}>

        <View style={styles.itemdisdiv} >

          <Text style={[styles.yazilar, styles.sifresoryazi]} >Uygulama Açılışında Şifre</Text>

          <Pressable style={[styles.butonlar]} onPress={()=> !parmakizi && fonksiyonlar.AyarSifresec()}>
            <Image 
              source={sifresor ? require('../../assets/iconlar/checkdolu.png'):require('../../assets/iconlar/checkbos.png')} 
              resizeMode='center'
              style={[styles.resimler,styles.sifresorresim]}
            />
          </Pressable>
          
        </View>

        <View style={[styles.itemdisdiv, {display: sifresor? 'flex':'none'}]} > 

          <Text style={[styles.yazilar, styles.sifresoryazi]} >Uygulamaya Giriş Şifreniz</Text>

          <TextInput 
            style={styles.inputlar}

            inputMode='numeric'
            placeholder='Şifreniz'
            maxLength={4}

            value={girisSifresi.toString()}
            onChangeText={fonksiyonlar.AyarSifreDegis}
          
          />
          
        </View>

        <View style={[styles.itemdisdiv,{display: parmakizivarmi? 'flex':'none'}]} >

          <Text style={[styles.yazilar, styles.sifresoryazi]} >Parmak İziyle Giriş</Text>

          <Pressable style={[styles.butonlar]} onPress={fonksiyonlar.AyarParmakizisecfonk}>
            <Image 
              source={parmakizi ? require('../../assets/iconlar/checkdolu.png'):require('../../assets/iconlar/checkbos.png')} 
              resizeMode='center'
              style={[styles.resimler,styles.sifresorresim]}
            />
          </Pressable>
          
        </View>


      </View>

      <Footer flexx={1} mobilfonk={fonksiyonlar.mobilbankgecisfonk} kredifonk={fonksiyonlar.kredikartgecisfonk} />

    </SafeAreaView>
  )
}

export default Ayarlar

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
    backgroundColor:'lightred'
  },
  itemdisdiv:{
    backgroundColor:'#f0679e',
    width:'100%',
    height:60,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginVertical:10
  },
  resimler:{
    width:'100%',
    height:'100%',
    flex:1

  },
  yazilar:{
    marginLeft:5,
    width:'100%',
    height:'100%',
    textAlign:'center',
    textAlignVertical:'center',
    flex:1
  },
  butonlar:{
    width:'100%',
    height:'100%',
    flex:1

  },
  inputlar:{
    borderWidth:1,
    flex:1,
    width:'100%',
    height:'100%'
  }

})