import { StyleSheet, Text,Image, View,Pressable,ActivityIndicator,Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, {useState,useEffect} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Gorunum from '../ayarsayfa/Gorunum';
import Guvenlik from '../ayarsayfa/Guvenlik';
import Bilgilendirme from '../ayarsayfa/Bilgilendirme';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useSelector,useDispatch} from 'react-redux';
import {setLogoyazi,setNot} from '../redux/ayarlarSlice';


const Ayarlar = ({navigation}) => {
  const dispacth = useDispatch()
  const {oncekisayfa} = useSelector(s=> s.bilgi)


  // Kullanılan tüm fonksiyonlar
  const fonksiyonlar = {
    //Mobil bankacılık sayfasına geçiş
    mobilbankgecisfonk: ()=>{
      navigation.navigate('MobilBanka')
    },
    //Kart bilgileri sayfasına geçiş
    kredikartgecisfonk: ()=>{
      navigation.navigate('KrediBanka')
    },
    //Ayarlar sayfasına geçiş
    ayarlargecisfonk: ()=>{
      navigation.navigate(oncekisayfa)
    },
    //Değişen ayarların kaydedilmesi
    //-> Ayarlardaki sistemle mobilbankacılık ve kart bilgileri kısmının sistemi aynı değil
    Ayardegisti:async ()=>{
      await AsyncStorage.setItem('ayarlar',JSON.stringify(ayarlarstate))
    },

    //Parmak izi seçme butonuna basıldığında çalışan fonk
    AyarParmakizisecfonk: async ()=>{
      ayarlarstate.parmaksor = !ayarlarstate.parmaksor
      ayarlarstate.sifresor = false
      //Hem parmak izi hemde şifre olsun istemiyorum ondan şifresoru kapatıyorum

      await fonksiyonlar.Ayardegisti();
    },
    //Şifre seçme butonuna basıldığında çalışan fonk
    AyarSifresec: async ()=>{
      ayarlarstate.parmaksor = false
      //Hem parmak izi hemde şifre olsun istemiyorum ondan parmak izini kapatıyorum
      ayarlarstate.sifresor = !ayarlarstate.sifresor

      await fonksiyonlar.Ayardegisti();
    },

    //Şifre değişirken çalışan fonk
    AyarSifreDegis:async (t) =>{
      //4 rakam olduğunda kaydediyor sadece
      if(t.length == 4)
      {
        ayarlarstate.girissifre = t
        await fonksiyonlar.Ayardegisti();
      }
    },

    //Logo veya yazıya tıklandığında çalışan fonk
    Logoyazidegis: async(d) =>{
      /*
        Logoya tıklandığında
        d-> true

        Yazıya tıklandığında
        d-> false
      */
      ayarlarstate.logoyazi = d
      dispacth(setLogoyazi(d))
      await fonksiyonlar.Ayardegisti();
    },

    //Not seçme butonuna basıldığında çalışan fonk
    Notgordegis: async(d) =>{
      ayarlarstate.not = d
      dispacth(setNot(d))
      await fonksiyonlar.Ayardegisti();
    }

  }

  //Ayarların navigasyonunu sağlayan kısım
  const [bolumler, Setbolumler] = useState(1)
  /*
  !1 güvenlik
  !2 görünüm
  !3 bilgilendirme
  */

  //Ayarlar yüklenirken yükleniyor sayfası var
  const [yukleniyor, setYukleniyor] = useState(true)

  //Telefonun parmak izi destekleyip desteklemediği
  const [parmakizivarmi, setParmakizivarmi] = useState(false)

  //Ayarlar bilgisi
  const [ayarlarstate, setAyarlarstate] = useState(undefined)


  const {nsifresor,nparmakizi,girissifre,not,logoyazi} = useSelector(s=> s.ayar)

  const [isKlavye, setIsKlavye] = useState(false)
  useEffect(()=>{
    (async ()=>{
      //Telefonun parmak izi destekleyip desteklemediği kontrolü
      const parmak = await LocalAuthentication.hasHardwareAsync();
      setParmakizivarmi(parmak)

      //Ayarların reduxtan gelen bilgilerle doldurulması
      setAyarlarstate({
        sifresor:nsifresor,
        girissifre:girissifre,
        parmaksor:nparmakizi,
        not:not,
        logoyazi:logoyazi
      })

      //Yükleniyor sayfasının kapanması
      setYukleniyor(false);

    Keyboard.addListener('keyboardDidShow',()=> setIsKlavye(true))
    Keyboard.addListener('keyboardDidHide',()=> setIsKlavye(false))
    })();
  },[]);
  


  return (
    <SafeAreaView style={styles.disdiv}>
      <Header flexx={1} title={"Ayarlar"} logoyazi={false} ayarlarfonk={fonksiyonlar.ayarlargecisfonk} />
      <View style={styles.secenekler}>

      <Pressable style={({pressed}) => [{
        backgroundColor: pressed ?  "#f1f1f1": '#f9f9f9'
        },styles.secenekitem]} onPress={()=>{Setbolumler(1)}}>
        <Image
          source={require('../../assets/iconlar/secureblue.png')}
          style={styles.butresim


              
          }
        />
        <Text style={styles.secenektext}>
          Güvenlik
        </Text>
      </Pressable>

      <Pressable style={({pressed}) => [{
        backgroundColor: pressed ?  "#f1f1f1": '#f9f9f9'
        },styles.secenekitem]} onPress={()=>{Setbolumler(2)}}>
      <Image
          source={require('../../assets/iconlar/viewpink.png')}
          style={styles.butresim


              
          }
        />
        <Text style={styles.secenektext}>
          Görünüm
        </Text>
      </Pressable>

      <Pressable style={({pressed}) => [{
        backgroundColor: pressed ?  "#f1f1f1": '#f9f9f9'
        },styles.secenekitem, {marginRight: 0}]} onPress={()=>{Setbolumler(3)}}>
        <Image
          source={require('../../assets/iconlar/infomint.png')}
          style={styles.butresim


              
          }
        />
        <Text style={styles.secenektext}>
          Bilgilendirme
        </Text>
      </Pressable>
      
      
      </View>


      <View style={styles.contdis}>

        <View style={[styles.yukleniyor,{display:yukleniyor ? 'flex':'none'}]}>
        <ActivityIndicator size="large" color={'white'}/>
        </View>

        {
          ayarlarstate != undefined && 
          bolumler == 1 ?
            <Guvenlik style={{display: yukleniyor? 'none': 'flex'}} fonksiyonlar={fonksiyonlar} gbilgiler={
            {
              sifresor:ayarlarstate.sifresor,
              girisSifresi:ayarlarstate.girissifre,
              parmakizi:ayarlarstate.parmaksor,
              parmakizivarmi:parmakizivarmi
            }
          }/>
          :
          bolumler == 2?
          <Gorunum hersey={{
            not:ayarlarstate.not,
            logoyazi:ayarlarstate.logoyazi,
            lysec:fonksiyonlar.Logoyazidegis,
            ndegis:fonksiyonlar.Notgordegis
          }}/>
          :
          <Bilgilendirme/>
          
          
        }
        
        

      </View>

      {!isKlavye && <Footer flexx={1} mobilfonk={fonksiyonlar.mobilbankgecisfonk} kredifonk={fonksiyonlar.kredikartgecisfonk} />}
      

    </SafeAreaView>
  )
}

export default Ayarlar

const styles = StyleSheet.create({
  disdiv:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#E7E9EA',
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
  },


  contdis:{
    width:'100%',
    height:'100%',
    justifyContent:'flex-start',
    alignItems:'center',
    flex:10,
    backgroundColor:'#E7E9EA',
   
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
    width:'96.5%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
    flex:2,
    backgroundColor:'#E7E9EA',
    borderBottomWidth: 0.5,
    paddingBottom: 5,
    paddingTop: 5,
    flexDirection:'row',


  },
  secenekitem:{
    
    width: '100%',
    height: 'auto',
    justifyContent:'center',
    alignItems:'center',
    display: 'flex',
    flex: 1,
    marginRight: 10,
    flexDirection: 'column',

    borderRadius:12,
    
   
    paddingTop: 10,
    paddingBottom: 10,
    elevation: 3,
    

  },
  secenektext:{
    color:'black',
    fontSize:17,

    
  },
  butresim:{
    width:'30%',
    height: '40%',
  },





  itemdisdiv:{
    backgroundColor:'#E7E9EA',
    width:'100%',
    height:'auto',
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
    height:'auto',
    flex:1,
    backgroundColor: 'gray',
  },
  inputlar:{
    borderWidth:1,
    flex:1,
    width:'100%',
    height:'100%'
  }

})