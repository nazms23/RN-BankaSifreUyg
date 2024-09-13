import { StyleSheet, Text, View, ScrollView, Pressable, Image, TextInput } from 'react-native'
import React,{useState,useEffect} from 'react'

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
    <ScrollView style={styles.contdis}>
        <View style={styles.itemdisdiv} >
            <Text style={[styles.yazilar, styles.sifresoryazi]} >Uygulama Açılışında Şifre</Text>

            <Pressable style={[styles.butonlar]} onPress={()=> fonks.Sifresec()}>
                <Image 
                    source={sifresor ? require('../../assets/iconlar/checkdolu.png'):require('../../assets/iconlar/checkbos.png')} 
                    resizeMode='center'
                    style={[styles.resimler,styles.sifresorresim]}
                />
            </Pressable>
        </View>

        <View style={[styles.itemdisdiv, {display: sifresor? 'flex':'none'}]} > 
            <Text style={[styles.yazilar, styles.sifresoryazi]} >Uygulamaya Giriş Şifreniz</Text>
            <TextInput 
                style={styles.inputlar}

                inputMode='numeric'
                placeholder='Şifreniz'
                maxLength={4}

                value={girisSifresi.toString()}
                onChangeText={fonks.Sifredegis}
            />
        </View>

        <View style={[styles.itemdisdiv,{display: parmakizivarmi? 'flex':'none'}]} >

        <Text style={[styles.yazilar, styles.sifresoryazi]} >Parmak İziyle Giriş</Text>

        <Pressable style={[styles.butonlar]} onPress={fonks.Parmakizisec}>
        <Image 
            source={parmakizi ? require('../../assets/iconlar/checkdolu.png'):require('../../assets/iconlar/checkbos.png')} 
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
        width:'100%',
        height:'100%',
        flex:1,
      },
    



    itemdisdiv:{
        backgroundColor:'#f0679e',
        width:'100%',
        height:60,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:10
      },
    
    
    
    
      resimler:{
        width:'100%',
        height:'100%',
        flex:1
    
      },
      yazilar:{
        marginLeft:5,
        width:'100%',
        height:'100%',
        textAlign:'center',
        textAlignVertical:'center',
        flex:1
      },
      butonlar:{
        width:'100%',
        height:'100%',
        flex:1
    
      },
      inputlar:{
        borderWidth:1,
        flex:1,
        width:'100%',
        height:'100%'
      }
})