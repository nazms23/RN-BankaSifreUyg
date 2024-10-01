import { StyleSheet, Text, View, Image,TextInput, Pressable, ScrollView,Alert } from 'react-native'
import React, {useState} from 'react'
import Animated, {BounceIn, FadeIn, FadeInLeft, FadingTransition, withRepeat}from 'react-native-reanimated';

const KBEkle = ({resimmi, bankalar,eklefonk,karttur}) => {

    const eklemefonk = eklefonk;

    const [eklebas, setEklebas] = useState(false)

    const [bankalarbas, setBankalarbas] = useState(false)

    const [kartturbas, setKartturbas] = useState(false)


    const [defisim, setDefisim] = useState(bankalar[0].isim)
    const [defresim, setDefresim] = useState(bankalar[0].resim)

    const [defkartturisim, setDefkartturisim] = useState(karttur[0].isim)

    const [kartturId, setKartturId] = useState(0)

    const [bankaId, setBankaId] = useState(0)
    const [sifre, setSifre] = useState("")

    const bankaustubas = (id) =>{
        setDefisim(bankalar.find(i => i.id == id).isim)
        setDefresim(bankalar.find(i => i.id == id).resim)
        setBankaId(id)
        setBankalarbas(false)
    }
    const kartturustubas = (id) =>{
        setDefkartturisim(karttur.find(i => i.id == id).isim)
        setKartturId(id)
        setKartturbas(false)
    }


  return (
    <View style={[styles.disdiv]}>
        <Pressable style={[styles.artibuton]} onPress={()=>{
            setEklebas(!eklebas)
            setBankalarbas(false)
            setKartturbas(false)
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

                <Text>{defisim}</Text> 
                }
            </Pressable>

            <Pressable style={[styles.bankadisdiv,{marginLeft:2}]} onPress={()=>setKartturbas(!kartturbas)}>

                <Text>{defkartturisim}</Text> 

            </Pressable>

            <View style={styles.sifredisdiv}>
                <TextInput 
                    style={styles.sifreinput}  
                    inputMode='numeric'
                    placeholder='Şifreniz'
                    maxLength={4}

                    value={sifre}
                    onChangeText={setSifre}
                />
            </View>
            <Pressable style={styles.eklebuton} onPress={async ()=>{
                if(sifre != "")
                {
                    if(bankaId == 0)
                    {
                        Alert.alert('Başarısız', 'Banka Seçmelisiniz.', [
                            {text: 'Tamam', onPress: () => {return}},
                            ]);
                        return;
                    }
                    await eklemefonk(bankaId,sifre,kartturId)
                    setSifre("")
                    setEklebas(false)
                    setKartturbas(false)
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
            <ScrollView horizontal={true} style={styles.bankalarscrollview}>

            {
                bankalar.map((i)=>{
                    if(i.id != 0)
                    {
                        return(
                        <Pressable style={[styles.bankalarviewbuton]} key={i.id} onPress={()=>bankaustubas(i.id)} >
                        {resimmi & i.resim != undefined ? 
                        <Image style={styles.bankaresim} source={i.resim}/> : 
                        <Text>{i.isim}</Text> 
                        }
                        </Pressable>)
                    }
                })
            }

            </ScrollView>
            <Animated.View  entering={FadeInLeft.delay(300)} style={styles.right}>
                
                <Image
                    source={require('../../assets/iconlar/right2.png')}
                    style={styles.rightresim


                        
                    }
                />
            </Animated.View>
        </View>
        <View style={[styles.bankalardisdiv,{display: kartturbas? 'flex':'none'}]}>
            <View style={styles.kartturview}>

            {
                karttur.map((i)=>{
                    return(
                <Pressable style={[styles.bankalarviewbuton]} key={i.id} onPress={()=>kartturustubas(i.id)} >

                <Text>{i.isim}</Text> 
                
                </Pressable>
                    )
                })
            }

            </View>
        </View>
    </View>
  )
}

export default KBEkle

const styles = StyleSheet.create({
    disdiv:{
        width:'100%',
        
    },
    artibuton:{
        width:80,
        
        backgroundColor:'#f9f9f9',
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
    resizeMode:'center'
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
kartturview:{
    width:'100%',
    flexDirection:'row'
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
        backgroundColor:'#f9f9f9',
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:12,
},
sifreinput:{
    paddingLeft: 15,
    width:'90%',
    height:'80%',
    borderWidth:0.5,
    fontSize: 20,
    backgroundColor:'#f9f9f9',
    borderRadius:6
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
resimdiv:{
    width: '100%',
    padding: 15,
},
resimdiv2:{
    width: '100%',
    padding: 15,
},
artibutresim:{
    width: '100%',
    height: '100%',
    
},


})