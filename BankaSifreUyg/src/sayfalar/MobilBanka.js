import { StyleSheet, Text, View,SafeAreaView, ScrollView } from 'react-native'
import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MBListOgesi from '../components/MBListOgesi'
import MbEkle from '../components/MbEkle'

const MobilBanka = ({navigation}) => {
  
  const [resimmi, setResimmi] = useState(false)
  
  
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
    }

  }




  
  
  return (
    <SafeAreaView style={styles.disdiv}>
        <Header flexx={1} title={"Mobil Bankacılık"} ayarlarfonk={fonksiyonlar.ayarlargecisfonk} resimisimfonk={fonksiyonlar.MBresimyazigecisfonk}/>
        <View style={styles.contdis}>
          <ScrollView style={styles.contscrollvw}>
          <MBListOgesi resimmi={resimmi}/>
          <MBListOgesi resimmi={resimmi}/>
          <MBListOgesi resimmi={resimmi}/>
          <MBListOgesi resimmi={resimmi}/>
          <MbEkle resimmi={resimmi}/>
          </ScrollView>
        </View>
      
      
      
      
    <StatusBar style='auto'/>

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