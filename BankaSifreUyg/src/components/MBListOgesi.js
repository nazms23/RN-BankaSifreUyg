import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const MBListOgesi = ({resimmi, resim, bankaad,sifre}) => {
  return (
    <View style={styles.disdiv}>
        <View style={styles.bankadisdiv}>
            {resimmi ? 
            <Image style={styles.bankaresim} source={resim}/> : 

            <Text>{bankaad}</Text> 
            
            
            }

            

        </View>
        <View style={styles.sifredisdiv}>
            <Text>{sifre}</Text>
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
        borderWidth:1,
        backgroundColor:'white',
        width:'100%',
        height:'100%'
    },
    bankaresim:{
        width:'100%',
        height:'100%',
        resizeMode:'center'
    },
    sifredisdiv:{
        flex:5,
        justifyContent:'center',
        alignItems:'center'
    }
})