import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import * as LocalAuthentication from 'expo-local-authentication';

import {useDispatch } from 'react-redux';
import { setSifresor,setParmakizi } from '../redux/ayarlarSlice';

const Parmakizi = () => {

    const dispacth = useDispatch()

    const [isbiometricsupport, setIsbiometricsupport] = useState(false)

    useEffect(()=>{
        (async ()=>{
            const compatible = await LocalAuthentication.hasHardwareAsync(); //telefon destekliyomu diye bakıyo
            setIsbiometricsupport(compatible)

            parmakizidogrulama()
        })();
    },[]);

    const desteklemiyorfonk = ()=>{
        console.log("desteklemiyor")

    }

    const parmakizidogrulama = async ()=>{
        const dogrulanabiliyomu = await LocalAuthentication.hasHardwareAsync();

        if(!dogrulanabiliyomu)
        {
            return desteklemiyorfonk();
        }else
        {
            console.log("Destekleniyo")
            const parmakdogrula = await LocalAuthentication.authenticateAsync({
                promptMessage:"Parmak İzinizi Doğrulayın",
                
            }).then((sonuc)=>{
                if(sonuc)
                {
                    console.log("Doğrulandı")
                    dispacth(setParmakizi(false))
                    dispacth(setSifresor(false))
                }
                else
                {
                    console.log("Doğrulanmadı")
                }
            })

            
        }
    }

  return (
    <View style={styles.disdiv}>
      <Text style={{fontSize:26}} >Parmak İzinizi Doğrulayın</Text>
      
    </View>
  )
}

export default Parmakizi

const styles = StyleSheet.create({
    disdiv:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})