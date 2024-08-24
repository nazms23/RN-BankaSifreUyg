import { StyleSheet, Text, View, TextInput,Pressable } from 'react-native'
import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useDispatch } from 'react-redux';
import { setSifresor,setParmakizi } from '../redux/ayarlarSlice';

const SifreSor = () => {

    const dispacth = useDispatch()

    const [sifre, setSifre] = useState('')

    useEffect(()=>{
        (async()=>{
            const ayarsifre = await AsyncStorage.getItem('ayarlar').then((v)=>{
                setSifre(JSON.parse(v).girissifre)
            })
        })();

    },[])

    const girisebasti= ()=>{
        sifrekontrol(girisSifresi)
    }


    const sifrekontrol = (t)=>{
        if(t == sifre)
        {
            dispacth(setParmakizi(false))
            dispacth(setSifresor(false))
        }
    }


    const textgirisi = (t)=>{
        setGirisSifresi(t)
        if(t.length == 4)
        {
            sifrekontrol(t)
        }
    }




    const [girisSifresi, setGirisSifresi] = useState('')

  return (
    <View style={styles.disdiv}>
      <Text style={{fontSize:30}}>Şifrenizi Giriniz</Text>
      <TextInput 
        style={styles.input}
        inputMode='numeric'
        placeholder='Şifreniz'
        maxLength={4}

        value={girisSifresi}
        onChangeText={textgirisi}
        secureTextEntry={true}
      />
    <Pressable style={styles.buton} onPress={girisebasti}>
        <Text style={{fontSize:30,color:'white'}}>Giriş</Text>
    </Pressable>
    </View>
  )
}

export default SifreSor

const styles = StyleSheet.create({
    disdiv:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    input:{
        fontSize:30,
        width:'70%',
        height:60,
        textAlign:'center',
        borderWidth:1,
        marginVertical:20
    },
    buton:{
        borderWidth:1,
        borderRadius:10,
        backgroundColor:'#CA3E47',
        width:100,
        justifyContent:'center',
        alignItems:'center',

    }
})