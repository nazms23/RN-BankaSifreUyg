import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Footer = ({flexx,mobilfonk,kredifonk}) => {
  return (
    <View style={[styles.disdiv, {flex:flexx}]}>
      <Pressable style={[styles.butondiv]} onPress={mobilfonk}>
        <Text style={styles.butontext}>
          Mobil Bankacılık
        </Text>
      </Pressable>

      <Pressable style={[styles.butondiv]} onPress={kredifonk}>
      <Text style={styles.butontext}>
        Kredi/Banka Kartı
      </Text>
      </Pressable>    
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
  disdiv:{
    width:'100%',
    height:'100%',
    backgroundColor:'lightgreen',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },
  butondiv:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width:"100%",
    height:'100%',
    backgroundColor:'crimson',
    borderRadius:5,
    marginHorizontal:3
  },
  butontext:{

  }
})