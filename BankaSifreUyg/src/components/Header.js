import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = ({flexx,title,ayarlarfonk,resimisimfonk}) => {
  return (
    <SafeAreaView style={[styles.disdiv, {flex:flexx}]}>
      
      <View style={styles.butondiv}>
        <Pressable style={styles.butondis} onPress={resimisimfonk}>
          <Text style={[styles.textler, {borderBottomWidth:1,borderColor:'white'}]}>Logo</Text>
          <Text>Yazı</Text>
        </Pressable>
      </View>

      <View style={styles.yazidiv}>
        <Text>{title}</Text>
      </View>
      
      <View style={styles.butondiv}>
        <Pressable style={styles.butondis} onPress={ayarlarfonk}>
          <Text>Ayarlar</Text>
        </Pressable>
      </View>

    </SafeAreaView>
  )
}

export default Header

const styles = StyleSheet.create({
  disdiv:{
    width:'100%',
    height:'100%',
    backgroundColor:'lightgreen',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },
  yazidiv:{
    flex:3,
    width:"100%",
    height:"100%",
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1
  },
  butondiv:{
    flex:1,
    width:'100%',
    height:'100%',
    borderWidth:1,
    borderRadius:6,
    backgroundColor:'wheat'

  },
  butondis:{
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center'
  },
  textler:{
    width:'95%',
    textAlign:'center'
  }



})