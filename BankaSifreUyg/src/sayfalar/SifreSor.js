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
    const sifresiniunuttu= ()=>{
       
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
      <Text style={styles.text1}>Şifrenizi Giriniz</Text>
      <TextInput 
        style={styles.input}
        inputMode='numeric'
        placeholder='Şifreniz'
        maxLength={4}

        value={girisSifresi}
        onChangeText={textgirisi}
        secureTextEntry={true}
      />
    <Pressable style={({pressed}) => [{
        backgroundColor: pressed ?  "#f1f1f1": '#637C5B'
        },styles.buton]} onPress={girisebasti}>
        <Text style={{fontSize:25,color:'white',}}>Giriş Yap</Text>
    </Pressable>
    <Pressable style={styles.buton2} onPress={sifresiniunuttu}>
        <Text style={{fontSize:15,color:'black', textDecorationLine: 'underline'}}>Şifremi unuttum</Text>
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
    text1:{
        fontSize: 25,
        marginBottom: 20,
    },
    input:{
        paddingRight: 30,
        paddingLeft: 30,
        width:'50%',
        height: 60,
        borderWidth:0.5,
        elevation: 1,
        fontSize:20,
        textAlign: 'center',

        backgroundColor:'#f1f1f1',
        borderRadius:6
    },
    buton:{
        borderWidth:1,
        borderRadius:10,
        padding: 10,
        marginTop: 50,
  
        width: '40%',
        borderColor: '#AEAEAE',
        
        justifyContent:'center',
        alignItems:'center',

    },
    buton2:{
        borderWidth:1,
        borderRadius:10,
        padding: 10,
        bottom: '10%',
        position: 'absolute',
        width: '40%',
        borderColor: '#AEAEAE',
        
        justifyContent:'center',
        alignItems:'center',


    }
})