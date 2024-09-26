import { StyleSheet, Text, View, TextInput,Pressable,Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
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
        else if(t.length == 0)
        {
            Alert.alert('Başarısız', 'Şifre kısmı boş bırakılamaz.', [
                {text: 'Tamam', onPress: () => {return} },
              ]);
        }
        else if(t.length < 4)
        {
            Alert.alert('Başarısız', 'Şifre kısmı 4 rakamdan az olamaz.', [
                {text: 'Tamam', onPress: () => {return}},
              ]);
        }
        else if(t != sifre)
        {
            Alert.alert('Başarısız', 'Şifre yanlış.', [
                {text: 'Tamam', onPress: () => {return}},
              ]);
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
    <SafeAreaView style={styles.disdiv}>
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
    </SafeAreaView>
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