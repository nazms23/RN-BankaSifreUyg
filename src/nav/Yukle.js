import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Yukleniyor from '../sayfalar/Yukleniyor';

const Stack = createNativeStackNavigator();

const Yukle = () => {
  return (
    <Stack.Navigator 
        initialRouteName='Yukleniyor'
        screenOptions={{headerShown:false}}>

          <Stack.Screen
          name='Yukleniyor'
          component={Yukleniyor}
          options={{title:"Yükleme Ekranı"}}
          />

    </Stack.Navigator>
  )
}

export default Yukle