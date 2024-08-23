import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MobilBanka from '../sayfalar/MobilBanka';
import KrediKart from '../sayfalar/KrediKart';
import Ayarlar from '../sayfalar/Ayarlar';


const Stack = createNativeStackNavigator();
const Uyg = () => {
  return (
    <Stack.Navigator 
          initialRouteName='MobilBanka'
          screenOptions={{headerShown:false}}>
          
            <Stack.Screen
            name='MobilBanka'
            component={MobilBanka}
            options={{title:"Mobil Bankacılık"}}
            />
            <Stack.Screen
            name='KrediBanka'
            component={KrediKart}
            options={{title:"Kredi/Banka Kartıı"}}
            />
            <Stack.Screen
            name='Ayarlar'
            component={Ayarlar}
            options={{title:"Ayarlar"}}
            />

        </Stack.Navigator>
  )
}

export default Uyg

const styles = StyleSheet.create({})