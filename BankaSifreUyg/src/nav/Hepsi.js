import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native'
import React,{useState, useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import { setSifresor,setParmakizi } from '../redux/ayarlarSlice';
import Uyg from './Uyg'
import Giris from './Giris'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Yukle from './Yukle';

const Hepsi = () => {
    const dispacth = useDispatch()
    const [yukleniyor, setYukleniyor] = useState(true)

    useEffect(()=>{
        /*(async()=>{
            await AsyncStorage.setItem('ayarlar','')
        })();*/
        (async()=>{
            const ayarlar = await AsyncStorage.getItem('ayarlar').then(async (veri)=>{
                if(veri != null || veri == '')
                {
                    const ayar = JSON.parse(veri)
                    dispacth(setSifresor(ayar.sifresor))
                    dispacth(setParmakizi(ayar.parmaksor))
                    setYukleniyor(false)
                }
                else
                {
                    await AsyncStorage.setItem('ayarlar', JSON.stringify({
                        sifresor:false,
                        girissifre:'1111',
                        parmaksor:false

                    }))
                    setYukleniyor(false)
                }
            })
        })();

    },[])

    const {sifresor,parmakizi} = useSelector(s=> s.ayar)

  return (
    <NavigationContainer>
        {
            !yukleniyor ?
            sifresor | parmakizi ?  
            <Giris />
            :
            <Uyg />
            :
            <Yukle />
        }
    </NavigationContainer>
  )
}

export default Hepsi

const styles = StyleSheet.create({})