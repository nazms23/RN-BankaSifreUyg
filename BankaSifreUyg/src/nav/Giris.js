import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {useSelector} from 'react-redux';


import SifreSor from '../sayfalar/SifreSor';
import Parmakizi from '../sayfalar/Parmakizi';


const Stack = createNativeStackNavigator();

const Giris = () => {

    

    const {parmakizi} = useSelector(s=> s.ayar)

    return (
    <Stack.Navigator
        initialRouteName={parmakizi ? 'Parmakizi' : 'Sifre'}
        screenOptions={{headerShown:false}}>
            <Stack.Screen
            name='Sifre'
            component={SifreSor}
            options={{title:"Şifre Ekranı"}}
            />
            <Stack.Screen
            name='Parmakizi'
            component={Parmakizi}
            options={{title:"Parmak İzi"}}
            />
    </Stack.Navigator>
  )
}

export default Giris

const styles = StyleSheet.create({})