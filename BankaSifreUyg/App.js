import { NavigationContainer } from '@react-navigation/native';
import MobilBanka from './src/sayfalar/MobilBanka';
import KrediKart from './src/sayfalar/KrediKart';
import Ayarlar from './src/sayfalar/Ayarlar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}