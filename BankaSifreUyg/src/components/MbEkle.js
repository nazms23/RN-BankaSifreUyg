import { StyleSheet, Text, View, Image,TextInput, Pressable, Alert,FlatList } from 'react-native'
import React, {useState} from 'react'
import Animated, {BounceIn, FadeIn, FadeInLeft, FadingTransition, withRepeat}from 'react-native-reanimated';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const MbEkle = ({scroolfonk,resimmi, bankalar,eklefonk}) => {

    const eklemefonk = eklefonk;
    const scroolfonks = scroolfonk;

    const [eklebas, setEklebas] = useState(false)

    const [bankalarbas, setBankalarbas] = useState(false)


    const [defisim, setDefisim] = useState(bankalar[0].isim)
    const [defresim, setDefresim] = useState(bankalar[0].resim)

    const [bankaId, setBankaId] = useState(0)
    const [sifre, setSifre] = useState("")

    const bankaustubas = (id) =>{
        setDefisim(bankalar.find(i => i.id == id).isim)
        setDefresim(bankalar.find(i => i.id == id).resim)
        setBankaId(id)
        setBankalarbas(false)
    }



  return (
    <View style={[styles.disdiv]}>
        <Pressable style={({pressed}) => [{
        backgroundColor: pressed ?  "#f1f1f1": '#f9f9f9'
        },styles.artibuton]} onPress={()=>{
            scroolfonks()
            setEklebas(!eklebas)
            setBankalarbas(false)
            }}>
         
          <View style={styles.resimdiv}>

          <Image
              source={require('../../assets/iconlar/add2.png')}
              style={styles.artibutresim}
              />
       
          </View>
          
        </Pressable>
        <View style={[styles.eklemedis, {display: eklebas? 'flex': 'none'}]} >
            <Pressable style={[styles.bankadisdiv]} onPress={()=>setBankalarbas(!bankalarbas)}>
                
                {resimmi & defresim != undefined ? 
                <Image style={styles.bankaresim} source={defresim}/> : 

                <Text style={styles.bankatext}>{defisim}</Text> 
                }
            </Pressable>

            <View style={styles.sifredisdiv}>
                <TextInput    
                    style={styles.sifreinput}
                
                    inputMode='numeric'
                    placeholder=' Şifrenizi girin'
                    maxLength={6}

                    value={sifre}
                    onChangeText={setSifre}
                />
            </View>
            <Pressable style={({pressed}) => [{
        backgroundColor: pressed ?  "#f1f1f1": '#f9f9f9'
        },styles.eklebuton,{borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,}]} onPress={()=>{
                if(sifre != "")
                {
                    if(bankaId == 0)
                    {
                        Alert.alert('Başarısız', 'Banka Seçmelisiniz.', [
                            {text: 'Tamam', onPress: () => {return}},
                            ]);
                        return;
                    }
                    eklemefonk(bankaId,sifre)
                    setSifre("")
                    setEklebas(false)
                    setBankalarbas(false)
                }else
                {
                    Alert.alert('Başarısız', 'Şifre kısmı boş bırakılamaz.', [
                        {text: 'Tamam', onPress: () => {return}},
                      ]);
                }
                }}>
                    <View style={styles.resimdiv2}>

                        <Image
                            source={require('../../assets/iconlar/addgreen.png')}
                            style={styles.artibutresim}
                        />

                    </View>

            </Pressable>
        </View>
        <View style={[styles.bankalardisdiv,{display: bankalarbas? 'flex':'none'}]}>
            <FlatList
            data={bankalar}
            renderItem={({item})=>item.isim != 'Seç' && (
                <Pressable style={[styles.bankalarviewbuton]} key={item.id} onPress={()=>bankaustubas(item.id)} >
                {resimmi & item.resim != undefined ? 
                <Image style={styles.bankaresim} source={item.resim}/> : 
                <Text style={styles.bankatext}>{item.isim}</Text> 
                }
                </Pressable>)}
            horizontal={true}
            keyExtractor={item=>item.id}
            />
            <Animated.View
                entering={FadeInLeft.delay(500, -1)}
                style={styles.right}
            >
                
                <Image
                    source={require('../../assets/iconlar/right2.png')}
                    style={styles.rightresim


                        
                    }
                />
            </Animated.View>
            <View>
                
                

          
                

            </View>
        </View>
    </View>
  )
}

export default MbEkle

const styles = StyleSheet.create({
    disdiv:{
        width:'100%',
        
    },
    artibuton:{
        width:80,
        
 
        elevation: 2,
        height:80,
        marginVertical:2,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginLeft: 10,
        marginTop: 20,
        marginBottom: 10,
        
    },
    resimdiv:{
        width: '100%',
        padding: 15,
    },
    artibutresim:{
        width: '100%',
        height: '100%',
        
    },
    eklemedis:{
        width:"96.5%",
        backgroundColor:'#f9f9f9',
        height:80,
        marginVertical:2,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 12,
    },
    bankadisdiv:{
        flex:2,
        justifyContent:'center',
        alignItems:'center',
        borderRightWidth: 0.5,
        width:'100%',
        height:'100%',
        backgroundColor:'#ffff',
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        borderColor: 'black',
     
        
    },
    bankalardisdiv:{
        width:'96.5%',
        backgroundColor:'#f9f9f9',
        height: 'auto',
        marginLeft: 10,
        marginTop: 5,
        padding: 10,
        borderRadius: 12,
        
    },
    bankaresim:{
        width:'95%',
        height:'95%',
        resizeMode:'center',
    
    },
    sifredisdiv:{
        flex:5,
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        backgroundColor:'#ffff',
        height:'100%',
    },
    bankalarscrollview:{
        width:'100%'
        
    },
    bankalarviewbuton:{
        width:140,
        height:80,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:0.5,
        marginHorizontal:4,
        backgroundColor:'white',
        borderRadius:6
    },
    eklebuton:{
        flex:1.5,

        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:12,
     
    },
    resimdiv2:{
        width: wp('17%'),
        height: hp('7%'),
        padding: 5
    },
    sifreinput:{
        paddingLeft: 15,
        width:'90%',
        height:'80%',
        borderWidth:0.5,
        fontSize: 20,
        backgroundColor:'#f9f9f9',
        borderRadius: 6,
    
    },
    bankatext:{
        fontSize: 30
    },
    right:{
        width: 30,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        top: '25%',
        right: '2%',
      
    },
    rightresim:{
        width: '100%',
        height: '100%',
    },

})