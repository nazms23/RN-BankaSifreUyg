import { StyleSheet,View, Text,FlatList,Image,Pressable } from 'react-native'
import Animated, {FadeInLeft}from 'react-native-reanimated';
import React from 'react'

const BankaList = ({bankalarbas,bankalar,bankaustubas,resimmi}) => {
  return (
    <View style={[styles.bankalardisdiv,{display: bankalarbas? 'flex':'none'}]}>
        <FlatList
        data={bankalar}
        renderItem={({item})=>item.isim != 'Seç' && (
            <Pressable style={[styles.bankalarviewbuton]} key={item.id} onPress={()=>bankaustubas(item.id)} >
            {resimmi & item.resim != undefined ? 
            <Image style={styles.bankaresim} source={item.resim}/> : 
            <Text style={styles.bankatext}>{item.isim}</Text> 
            }
            </Pressable>)}
        horizontal={true}
        keyExtractor={item=>item.id}
        />
        <Animated.View
            entering={FadeInLeft.delay(500, -1)}
            style={styles.right}
        >
            <Image
                source={require('../../assets/iconlar/right2.png')}
                style={styles.rightresim}
            />
        </Animated.View>
    </View>
  )
}

export default BankaList

const styles = StyleSheet.create({
    bankalardisdiv:{
        width:'96.5%',
        backgroundColor:'#f9f9f9',
        height: 'auto',
        marginLeft: 10,
        marginTop: 5,
        padding: 10,
        borderRadius: 12, 
    },
    bankalarviewbuton:{
        width:140,
        height:80,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:0.5,
        marginHorizontal:4,
        backgroundColor:'white',
        borderRadius:6
    },
    bankaresim:{
        width:'95%',
        height:'95%',
        resizeMode:'center',
    },
    bankatext:{
        fontSize: 30
    },
    rightresim:{
        width: '100%',
        height: '100%',
    },
    right:{
        width: 30,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        top: '25%',
        right: '2%',
    }

})