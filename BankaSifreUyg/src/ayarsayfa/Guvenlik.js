import { StyleSheet, Text, View, ScrollView, Pressable, Image, TextInput } from 'react-native'
import React,{useState,useEffect} from 'react'
import Animated, {BounceIn, FadeIn, FadeInLeft, FadeInUp, FadeOutUp, FadingTransition, withRepeat}from 'react-native-reanimated';
const Guvenlik = ({fonksiyonlar, gbilgiler}) => {

    const fonks = {
        assec:fonksiyonlar.AyarSifresec,
        asdeg:fonksiyonlar.AyarSifreDegis,
        apisec:fonksiyonlar.AyarParmakizisecfonk,
        Sifresec: ()=>{
            setParmakizi(false)
            setSifresor(!sifresor)
            fonks.assec()
        },
        Sifredegis: (t)=>{
            setGirisSifresi(t)
            fonks.asdeg(t)
        },
        Parmakizisec: ()=>{
            setParmakizi(!parmakizi)
            setSifresor(false)
            fonks.apisec()
        }
    }
    
    const [sifresor, setSifresor] = useState(gbilgiler.sifresor)
    
    const [girisSifresi, setGirisSifresi] = useState(gbilgiler.girisSifresi)
    const [parmakizi, setParmakizi] = useState(gbilgiler.parmakizi)
    const [parmakizivarmi, setParmakizivarmi] = useState(gbilgiler.parmakizivarmi)




  return (
    <ScrollView contentContainerStyle={styles.contdis}>
     
          <View style={[styles.itemdisdiv, style={   justifyContent:'space-around'}]} >
              <Text style={[styles.yazilar, styles.sifresoryazi]} >Uygulama Açılışında Şifre</Text>

              <Pressable style={[styles.butonlar]} onPress={()=> fonks.Sifresec()}>
                  <Image 
                      source={sifresor ? require('../../assets/iconlar/checkgreen.png'):require('../../assets/iconlar/checkbos4.png')} 
                      resizeMode='center'
                      style={[styles.resimler,styles.sifresorresim]}
                  />
              </Pressable>
          </View>
      
    
       
        

        <Animated.View entering={FadeInUp}  style={[styles.itemdisdiv, {display: sifresor? 'flex':'none'}]} > 
            <Text style={[styles.yazilar, styles.sifresoryazi]} >Uygulamaya Giriş Şifreniz</Text>
            <TextInput 
                style={styles.inputlar}

                inputMode='numeric'
                placeholder='Şifreniz'
                maxLength={4}

                value={girisSifresi.toString()}
                onChangeText={fonks.Sifredegis}
            />
        </Animated.View>

        <View style={[styles.itemdisdiv,{display: parmakizivarmi? 'flex':'none'}]} >

        <Text style={[styles.yazilar, styles.sifresoryazi]} >Parmak İziyle Giriş</Text>

        <Pressable style={[styles.butonlar]} onPress={fonks.Parmakizisec}>
        <Image 
            source={parmakizi ? require('../../assets/iconlar/checkgreen.png'):require('../../assets/iconlar/checkbos4.png')} 
            resizeMode='center'
            style={[styles.resimler,styles.sifresorresim]}
        />
        </Pressable>

        </View>

    </ScrollView>
  )
}

export default Guvenlik

const styles = StyleSheet.create({
    contdis:{
      
        width:'96.5%',
        height:'100%',
        flex:1,
       
       
      },
      itemdisdiv:{
        backgroundColor:'#f9f9f9',
        width:'99%',
        height:60,
        flexDirection:'row',
        display:'flex',
        borderRadius: 6,

        justifyContent: 'space-around',
        alignItems:'center',
        marginVertical:30,
        elevation: 1,
      },
      
    
    
    
      resimler:{
        width:'100%',
        height:'100%',
        flex:2
    
      },
      yazilar:{
        marginLeft:5,
        width:'100%',
        height:'100%',
        textAlign:'center',
        textAlignVertical:'center',
        flex: 1,
      },
      butonlar:{
        width:'60%',
        height:'60%',
        flex: 0.6,
     
      },
      inputlar:{
        borderWidth:0.5,
        backgroundColor: '#f2f2f2',
        borderRadius: 6,
        width:'100%',
        height:'100%',
        textAlign: 'center',
        
        fontSize: 30,
      }
})