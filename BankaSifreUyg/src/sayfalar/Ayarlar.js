import { StyleSheet, Text, View,SafeAreaView, Image,Pressable, TextInput,ActivityIndicator } from 'react-native'
import React, {useState,useEffect} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Gorunum from '../ayarsayfa/Gorunum';
import Guvenlik from '../ayarsayfa/Guvenlik';
import { reloadAppAsync } from 'expo';

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
      ayarlarstate.parmaksor = !ayarlarstate.parmaksor
      ayarlarstate.sifresor = false
      
      await fonksiyonlar.Ayardegisti();
    },
    AyarSifreDegis:async (t) =>{
      if(t.length == 4)
      {
        ayarlarstate.girissifre = t
        await fonksiyonlar.Ayardegisti();
      }
    },
    AyarSifresec: async ()=>{
      ayarlarstate.parmaksor = false
      ayarlarstate.sifresor = !ayarlarstate.sifresor

      await fonksiyonlar.Ayardegisti();
    }
  }

  const [yukleniyor, setYukleniyor] = useState(true)


  const [parmakizivarmi, setParmakizivarmi] = useState(false)

  const [ayarlarstate, setAyarlarstate] = useState(undefined)


  useEffect(()=>{
    (async ()=>{
      const parmak = await LocalAuthentication.hasHardwareAsync();
      setParmakizivarmi(parmak)

      const ayarlar = await AsyncStorage.getItem('ayarlar').then(async (veri)=>{
        if(veri != null || veri == '')
        {
          const ayar = JSON.parse(veri)
          setAyarlarstate(ayar)
          setYukleniyor(false);
        }
      })

    })();
  },[]);
  


  return (
    <SafeAreaView style={styles.disdiv}>
      <Header flexx={1} title={"Ayarlar"} logoyazi={false} ayarlarfonk={fonksiyonlar.ayarlargecisfonk} />
      <View style={styles.secenekler}>


      <Pressable style={styles.secenekitem}>
        <Text style={styles.secenektext}>
          Görünüm
        </Text>
      </Pressable>

      <Pressable style={styles.secenekitem}>
        <Text style={styles.secenektext}>
          Güvenlik
        </Text>
      </Pressable>
      
      </View>


      <View style={styles.contdis}>

        <View style={[styles.yukleniyor,{display:yukleniyor ? 'flex':'none'}]}>
        <ActivityIndicator size="large" color={'white'}/>
        </View>
        {
          ayarlarstate != undefined && 
          <Guvenlik style={{display: yukleniyor? 'none': 'flex'}} fonksiyonlar={fonksiyonlar} gbilgiler={
            {
              sifresor:ayarlarstate.sifresor,
              girisSifresi:ayarlarstate.girissifre,
              parmakizi:ayarlarstate.parmaksor,
              parmakizivarmi:parmakizivarmi
            }
          }/>
        }
        

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
    justifyContent:'flex-start',
    alignItems:'center',
    flex:10,
    backgroundColor:'lightred'
  },


  yukleniyor:{
    width:'100%',
    height:'100%',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'tomato'
  },




  secenekler:{
    width:'100%',
    height:'100%',
    justifyContent:'flex-start',
    alignItems:'center',
    flex:1,
    backgroundColor:'lightred',
    borderWidth:2,
    flexDirection:'row'
  },
  secenekitem:{
    backgroundColor:'#3b84a1',
    width:'30%',
    height:'90%',
    justifyContent:'center',
    alignItems:'center',
    marginVertical:10,
    borderRadius:20,
    marginRight:10
  },
  secenektext:{
    color:'white',
    fontSize:17
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