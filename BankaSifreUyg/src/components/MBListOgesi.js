import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const MBListOgesi = ({resimmi}) => {
  return (
    <View style={styles.disdiv}>
        <View style={styles.bankadisdiv}>
            {resimmi ? 
            <Image style={styles.bankaresim} source={require('../../assets/bankalar/Akbank.png')}/> : 

            <Text>Akbank</Text> 
            
            
            }

            

        </View>
        <View style={styles.sifredisdiv}>
            <Text>123456</Text>
        </View>
    </View>
  )
}

export default MBListOgesi

const styles = StyleSheet.create({
    disdiv:{
        width:"100%",
        backgroundColor:'lightblue',
        height:50,
        marginVertical:2,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    bankadisdiv:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1
    },
    bankaresim:{
        width:'100%',
        height:'100%',
        resizeMode:'stretch'
    },
    sifredisdiv:{
        flex:5,
        justifyContent:'center',
        alignItems:'center'
    }
})