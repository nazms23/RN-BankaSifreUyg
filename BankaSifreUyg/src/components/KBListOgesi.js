import { StyleSheet, Text, View,Image,Pressable,ScrollView,TextInput } from 'react-native'
import React, {useState} from 'react'
import {Swipeable,GestureHandlerRootView} from 'react-native-gesture-handler'
import {setStringAsync} from 'expo-clipboard';


const KBListOgesi = ({resimmi,not, resim, bankaad, kartturu ,sifre,bId, kartbilgileriobj , silfonk, sifredegisfonk , bankadegisfonk , turdegisfonk , bankalar, kartturler , sifreidsi}) => {

    const silmefonk = silfonk;
    const sifredegis = sifredegisfonk
    const bankadegis = bankadegisfonk
    const turdegis = turdegisfonk

    const kartnodegis = kartbilgileriobj.degisfonklar.nodegis
    const karttarihdegis = kartbilgileriobj.degisfonklar.tarihdegis
    const kartcvcdegis = kartbilgileriobj.degisfonklar.cvcdegis
    const kartnotdegis = kartbilgileriobj.degisfonklar.notdegis

    const [bankalarbas, setBankalarbas] = useState(false)
    const [kartturbas, setKartturbas] = useState(false)
    const [kartbilgibas, setKartbilgibas] = useState(false)
    const [editmod, setEditmod] = useState(false)

    const [bankaresim, setBankaresim] = useState(resim)
    const [bankaadi, setBankaadi] = useState(bankaad)

    const [kartturisim, setKartturisim] = useState(kartturu)

    const [kartno, setKartno] = useState(kartbilgileriobj.kartno)
    const [tarih, setTarih] = useState(kartbilgileriobj.tarih)
    const [CVC, setCVC] = useState(kartbilgileriobj.cvc)
    const [kartnot, setKartnot] = useState(kartbilgileriobj.kartnot)


    const [textboxgorunurluk, settextboxgorunurluk] = useState("none")
    const [textgorunurluk, settextgorunurluk] = useState("flex")

    const [textboxyazi, settextboxyazi] = useState(sifre)


    const editmodac = ()=>{
        if(!editmod)
            {
                settextboxgorunurluk('flex')
                settextgorunurluk('none')
            }
            else
            {
                settextboxgorunurluk('none')
                settextgorunurluk('flex')
                setBankalarbas(false)
                setKartturbas(false)
            }
        setEditmod(!editmod)
    }

    const textdegisti = (i) =>{
        settextboxyazi(i)

        sifredegis(sifreidsi,i)
    }

    const bankadegisti = (id) =>{
        setBankaadi(bankalar.find(i=>i.id == id).isim)
        setBankaresim(bankalar.find(i=>i.id == id).resim)
        setBankalarbas(false)
        bankadegis(sifreidsi,id)
    }

    const turdegisti = (id) =>{
        setKartturisim(kartturler.find(i=>i.id == id).isim)
        setKartturbas(false)
        turdegis(sifreidsi,id)
    }

    const kartnotbilgidegisti = (t)=>{
        setKartnot(t)
        kartnotdegis(sifreidsi,t)
    }

    const kartnobilgidegisti = (t)=>{
        setKartno(t)
        kartnodegis(sifreidsi,t)
    }

    const karttarihbilgidegisti = (t)=>{
        if(t.length > 2)
        {
            t = t.slice(0,2)+'/'+t.slice(3)
        }
        setTarih(t)
        karttarihdegis(sifreidsi,t)
    }

    const kartcvcbilgidegisti = (t)=>{
        setCVC(t)
        kartcvcdegis(sifreidsi,t)
    }


    renderLeftActions = (progress, dragX) => {
        const trans = dragX.interpolate({
          inputRange: [0, 50, 100, 101],
          outputRange: [-20, 0, 0, 1],
        });
        return (
          <Pressable style={styles.silbuton} onPress={()=>silmefonk(sifreidsi)} >
            <View style={styles.silbutonresimdiv}>
            <Image
              source={require('../../assets/iconlar/deletered.png')}
              style={styles.silbutonresim}
              />
            </View>
          </Pressable>
         
        );
      };
  
      renderRightActions = (progress, dragX) => {
        const trans = dragX.interpolate({
          inputRange: [0, 50, 100, 101],
          outputRange: [-20, 0, 0, 1],
        });
        return (
          <Pressable style={[styles.silbuton,{backgroundColor:"#f9f9f9", marginRight: 10}]} onPress={()=>editmodac()} >
            <View style={styles.silbutonresimdiv}>
            <Image
              source={require('../../assets/iconlar/editgreen.png')}
              style={styles.silbutonresim}
              />
            </View>
          </Pressable>
         
        );
      };


    const kopyala = async (t)=>{
        await setStringAsync(t)
    }

  return (
    <GestureHandlerRootView>
        <Swipeable renderLeftActions={renderLeftActions} renderRightActions={renderRightActions}>

            <View style={styles.disdiv}>
                <Pressable style={styles.bankadisdiv} onPress={()=> editmod && setBankalarbas(!bankalarbas)} >
                    {resimmi & bankaresim != undefined ? 
                    <Image style={styles.bankaresim} source={bankaresim}/> : 

                    <Text>{bankaadi}</Text> 
                    
                    
                    }
                </Pressable>
                <Pressable style={styles.bankadisdiv} onPress={()=> editmod && setKartturbas(!kartturbas)} >

                    <Text>{kartturisim}</Text> 

                </Pressable>
                <View style={[styles.sifredisdiv,{display:textgorunurluk}]}>
                    <Text>{textboxyazi}</Text>
                </View>
                <View style={[styles.sifredisdiv,{display:textboxgorunurluk}]}>
                    <TextInput 
                    inputMode='numeric'
                    placeholder='Şifreniz'
                    maxLength={4}
                    value={textboxyazi}
                    onChangeText={textdegisti}

                    style={styles.sifreinput}  
                    />
                </View>
                <Pressable style={[styles.bankadisdiv,{flex:1.2,         borderTopRightRadius: 12,
        borderBottomRightRadius: 12, borderRightWidth: 0, borderLeftWidth: 0.5, backgroundColor: '#f1f1f1',   borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,}]} onPress={()=>setKartbilgibas(!kartbilgibas)} >

                    <Text>{'Kart\nBilgileri'}</Text> 

                </Pressable>
            </View>

           

    </Swipeable>
        <View style={[styles.bankalardisdiv,{display: bankalarbas? 'flex':'none'}]}>
            <ScrollView horizontal={true} style={styles.bankalarscrollview}>

            {
                bankalar.map((i)=>{
                    if(i.id != 0)
                    {
                        return(
                        <Pressable style={[styles.bankalarviewbuton]} key={i.id} onPress={()=>bankadegisti(i.id)} >
                        {resimmi & i.resim != undefined ? 
                        <Image style={styles.bankaresim} source={i.resim}/> : 
                        <Text>{i.isim}</Text> 
                        }
                        </Pressable>)
                    }
                })
            }

            </ScrollView>
        </View>

        <View style={[styles.bankalardisdiv,{display: kartturbas? 'flex':'none'}]}>
            <View style={styles.kartturview}>
            {
                kartturler.map((i)=>{
                    return(
                <Pressable style={[styles.bankalarviewbuton]} key={i.id} onPress={()=>turdegisti(i.id)} >

                <Text>{i.isim}</Text> 
                
                </Pressable>
                    )
                })
            }
            </View>
        </View>
        
        <View style={[styles.kartbilgileridisdiv,{display: not ? 'flex' : kartbilgibas?'flex':'none'}]}>

            <View style={styles.kartbilgileritemdiv}>
                <Text style={styles.kartbilgileritext} >Not: </Text>
                <TextInput 
                    style={[styles.kartbilgitextinput, {display:editmod?'flex':'none'}]}
                    inputMode='text'
                    placeholder='Kart ile ilgile notunuz (16)'
                    maxLength={16}
                    value={kartnot}
                    onChangeText={kartnotbilgidegisti}
                />

                <Text style={[styles.kartbilgikisimtext,{display: editmod?'none':'flex'}]}>{kartnot}</Text>
            </View>

            <View style={[styles.kartbilgileritemdiv,{display:kartbilgibas?'flex':'none'}]}>
                <Text style={styles.kartbilgileritext} >No: </Text>
                <TextInput 
                    style={[styles.kartbilgitextinput, {display:editmod?'flex':'none'}]}
                    inputMode='numeric'
                    placeholder='Kart Numaranız'
                    maxLength={16}
                    value={kartno}
                    onChangeText={kartnobilgidegisti}
                />

                <Text style={[styles.kartbilgikisimtext,{display: editmod?'none':'flex'}]}>{kartno}</Text>


                <Pressable style={styles.kopyalabuton} onPress={()=>{kopyala(kartno)}} >
                    <Text>Kopyala</Text>    
                </Pressable>
            </View>

            <View style={[styles.kartbilgileritemdiv,{display:kartbilgibas?'flex':'none'}]}>
                <Text style={styles.kartbilgileritext}>Tarih: </Text>
                <TextInput
                style={[styles.kartbilgitextinput, {display:editmod?'flex':'none'}]}
                inputMode='numeric'
                placeholder='Kart Numaranız'
                maxLength={5}
                value={tarih}
                onChangeText={karttarihbilgidegisti}
                />

                <Text style={[styles.kartbilgikisimtext,{display: editmod?'none':'flex'}]}>{tarih}</Text>

                <Pressable style={styles.kopyalabuton} onPress={()=>{kopyala(tarih)}} >
                    <Text>Kopyala</Text>    
                </Pressable>
            </View>

            <View style={[styles.kartbilgileritemdiv,{display:kartbilgibas?'flex':'none'}]}>
                <Text style={styles.kartbilgileritext}>CVC: </Text>
                <TextInput
                style={[styles.kartbilgitextinput, {display:editmod?'flex':'none'}]}
                inputMode='numeric'
                placeholder="Kart CVC'niz"
                maxLength={3}
                value={CVC}
                onChangeText={kartcvcbilgidegisti}
                />

                <Text style={[styles.kartbilgikisimtext,{display: editmod?'none':'flex'}]}>{CVC}</Text>

                <Pressable style={styles.kopyalabuton} onPress={()=>{kopyala(CVC)}} >
                    <Text>Kopyala</Text>    
                </Pressable>
            </View>

        </View>

    </GestureHandlerRootView>
  )
}

export default KBListOgesi

const styles = StyleSheet.create({
    disdiv:{
        width:"96.5%",
        backgroundColor:'#f9f9f9',
        height:80,
        marginVertical:3,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 12,
        elevation: 0.5
    },
    bankadisdiv:{
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:0,
        borderRightWidth: 0.5,
        borderRightColor: '#000',
        backgroundColor:'#f9f9f9',
        width:'100%',
        height:'100%',
        
    },
    bankaresim:{
        width:'90%',
        height:'100%',
        resizeMode:'center'
    },
    sifredisdiv:{
        flex:2,
        justifyContent:'center',
        alignItems:'center'
    },
    silbuton:{
        backgroundColor:"#f9f9f9",
        borderRadius:15,
        marginLeft:10,
        marginTop: 3,
        
      
        width:'15%',
        height: '93%',
        justifyContent:'center',
        alignItems:'center',
    },
    silbutonresim:{
      width:'100%',
      height:'100%',
      resizeMode:'center',
    },
    silbutonresimdiv:{
        width:"60%",
        height:"60%",
    },
    bankalardisdiv:{
        width:'100%',
        backgroundColor:'#bcb8e6',
        height:80,
    },
    bankalarscrollview:{
        width:'100%'
    },
    bankalarviewbuton:{
        width:140,
        height:80,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        marginHorizontal:2,
        backgroundColor:'#f9f9f9',
        borderRadius:5,
    },
    sifreinput:{
        paddingRight: 30,
        paddingLeft: 30,
        height:'90%',
        borderWidth:0.5,
        elevation: 1,
        fontSize:30,
        textAlign: 'center',
        textDecorationLine: 'underline',
        backgroundColor:'#f1f1f1',
        borderRadius:6
    },
    kartturview:{
        width:'100%',
        flexDirection:'row',
        borderBottomRightRadius: 12,
    },
    kartbilgileridisdiv:{
        width:'100%',
        backgroundColor:'#85ffd0',
        
    },
    kartbilgileritemdiv:{
        width:'100%',
        justifyContent:'space-between',
        flexDirection:'row',
        height:40,
        alignItems:'center',
        marginVertical:5,
        
    },
    kartbilgileritext:{
        width:'100%',
        flex:1,
        fontSize:17,
        textAlign:'center'
    },
    kartbilgitextinput:{
        width:'100%',
        flex:3,
        fontSize:17
    },
    kopyalabuton:{
        flex:1,
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#a7eb7a'
    },
    kartbilgikisimtext:{
        width:'100%',
        flex:3,
        fontSize:17,
        textAlign:'center'
    },
    
})
