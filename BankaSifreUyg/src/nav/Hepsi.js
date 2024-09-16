import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native'
import React,{useState, useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import { setSifresor,setParmakizi,setnSifresor,setnParmakizi,setGirissifre,setLogoyazi,setNot } from '../redux/ayarlarSlice';
import {setKredikart,setMobilbanka} from '../redux/bilgilerSlice';
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
            //? AYARLAR SIFIRLAMA
        })();*/
        (async()=>{
            /*const ayarlar = await AsyncStorage.getItem('ayarlar').then(async (veri)=>{
                if(veri != null || veri == '')
                {
                    const ayar = JSON.parse(veri)
                    dispacth(setSifresor(ayar.sifresor))
                    dispacth(setParmakizi(ayar.parmaksor))
                    dispacth(setnSifresor(ayar.sifresor))
                    dispacth(setnParmakizi(ayar.parmaksor))
                    dispacth(setGirissifre(ayar.girissifre))
                    dispacth(setLogoyazi(ayar.logoyazi))
                    dispacth(setNot(ayar.not))
                    setYukleniyor(false)
                }
                else
                {
                    await AsyncStorage.setItem('ayarlar', JSON.stringify({
                        sifresor:false,
                        girissifre:'1111',
                        parmaksor:false,
                        not:false,
                        logoyazi:true

                    }))
                    setYukleniyor(false)
                }
            })*/


            const [ayarlar,mobilbanka,kredikart] = await Promise.all([
                AsyncStorage.getItem('ayarlar'),AsyncStorage.getItem('mobilbanka'),AsyncStorage.getItem('kredikart')
            ])


            if(ayarlar != null || ayarlar == '')
            {
                const ayar = JSON.parse(ayarlar)
                dispacth(setSifresor(ayar.sifresor))
                dispacth(setParmakizi(ayar.parmaksor))
                dispacth(setnSifresor(ayar.sifresor))
                dispacth(setnParmakizi(ayar.parmaksor))
                dispacth(setGirissifre(ayar.girissifre))
                dispacth(setLogoyazi(ayar.logoyazi))
                dispacth(setNot(ayar.not))
            }
            else
            {
                await AsyncStorage.setItem('ayarlar', JSON.stringify({
                    sifresor:false,
                    girissifre:'1111',
                    parmaksor:false,
                    not:false,
                    logoyazi:true

                }))
            }

            if(mobilbanka != null || mobilbanka == '')
            {
                const mob = JSON.parse(mobilbanka)
                dispacth(setMobilbanka(mob.sifreler))
            }
            else
            {
                await AsyncStorage.setItem('mobilbanka',JSON.stringify({sifreler:[]}))
            }

            if(kredikart != null || kredikart == '')
            {
                const kre = JSON.parse(kredikart)
                dispacth(setKredikart(kre.sifreler))
            }
            else
            {
                await AsyncStorage.setItem('kredikart',JSON.stringify({sifreler:[]}))
            }
            
            setYukleniyor(false)
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