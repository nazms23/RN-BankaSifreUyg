import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'

const Yukleniyor = () => {
  return (
    <View style={styles.disdiv}>
      <ActivityIndicator size="large" color={'white'}/>
    </View>
  )
}

export default Yukleniyor

const styles = StyleSheet.create({
    disdiv:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'tomato'
    }
})