import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

const Yukleniyor = () => {
  return (
    <SafeAreaView style={styles.disdiv}>
      <ActivityIndicator size="large" color={'white'}/>
    </SafeAreaView>
  )
}

export default Yukleniyor

const styles = StyleSheet.create({
    disdiv:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'tomato',
        width:'100%',
        height:'100%'
    }
})