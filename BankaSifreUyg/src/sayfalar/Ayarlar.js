import { StyleSheet, Text, View,SafeAreaView } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'


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
    }

  }


  return (
    <SafeAreaView style={styles.disdiv}>
      <Header flexx={1} title={"Ayarlar"}/>

      <View style={styles.contdis}>
        <Text>Ayarlar</Text>
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
  }

})