import { StyleSheet, Text, View,Image,Pressable,ScrollView,TextInput } from 'react-native'
import React, {useState} from 'react'
import {Swipeable,GestureHandlerRootView} from 'react-native-gesture-handler'
import {setStringAsync} from 'expo-clipboard';


const KBListOgesi = ({resimmi, resim, bankaad, kartturu ,sifre,bId, kartbilgileriobj , silfonk, sifredegisfonk , bankadegisfonk , turdegisfonk , bankalar, kartturler , sifreidsi}) => {

    const silmefonk = silfonk;
    const sifredegis = sifredegisfonk
    const bankadegis = bankadegisfonk
    const turdegis = turdegisfonk
    const kartbilgisidegistir = kartbilgileriobj.degisfonk

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

    const kartnobilgidegisti = (t)=>{
        setKartno(t)
        kartbilgisidegistir(sifreidsi,t,tarih,CVC)
    }

    const karttarihbilgidegisti = (t)=>{
        if(t.length > 2)
        {
            t = t.slice(0,2)+'/'+t.slice(3)
        }
        setTarih(t)
        kartbilgisidegistir(sifreidsi,kartno,t,CVC)

    }

    const kartcvcbilgidegisti = (t)=>{
        setCVC(t)
        kartbilgisidegistir(sifreidsi,kartno,tarih,t)

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
              source={require('../../assets/iconlar/delete.png')}
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
          <Pressable style={[styles.silbuton,{backgroundColor:"#89c332"}]} onPress={()=>editmodac()} >
            <View style={styles.silbutonresimdiv}>
            <Image
              source={require('../../assets/iconlar/edit.png')}
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
                    {resimmi ? 
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
                <Pressable style={[styles.bankadisdiv,{flex:1.2}]} onPress={()=>setKartbilgibas(!kartbilgibas)} >

                    <Text>{'Kart\nBilgileri'}</Text> 

                </Pressable>
            </View>

           

    </Swipeable>
        <View style={[styles.bankalardisdiv,{display: bankalarbas? 'flex':'none'}]}>
            <ScrollView horizontal={true} style={styles.bankalarscrollview}>

            {
                bankalar.map((i)=>{
                    return(
                <Pressable style={[styles.bankalarviewbuton]} key={i.id} onPress={()=>bankadegisti(i.id)} >
                {resimmi ? 
                <Image style={styles.bankaresim} source={i.resim}/> : 
                <Text>{i.isim}</Text> 
                }
            </Pressable>
                    )
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
        
        <View style={[styles.kartbilgileridisdiv,{display: kartbilgibas?'flex':'none'}]}>
            <View style={styles.kartbilgileritemdiv}>
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

            <View style={styles.kartbilgileritemdiv}>
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

            <View style={styles.kartbilgileritemdiv}>
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
        width:"100%",
        backgroundColor:'lightblue',
        height:50,
        marginVertical:2,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    bankadisdiv:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        backgroundColor:'white',
        width:'100%',
        height:'100%'
    },
    bankaresim:{
        width:'100%',
        height:'100%',
        resizeMode:'center'
    },
    sifredisdiv:{
        flex:5,
        justifyContent:'center',
        alignItems:'center'
    },
    silbuton:{
      backgroundColor:"crimson",
      borderRadius:15,
      marginTop:10,
      borderColor:'black',
      borderWidth:2,
      width:'15%',
      justifyContent:'center',
      alignItems:'center',
    },
    silbutonresim:{
      width:'100%',
      height:'100%',
      resizeMode:'center',
    },
    silbutonresimdiv:{
      width:"80%",
      height:"80%",
    },
    bankalardisdiv:{
        width:'100%',
        backgroundColor:'#bcb8e6',
        height:50
    },
    bankalarscrollview:{
        width:'100%'
    },
    bankalarviewbuton:{
        width:70,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        marginHorizontal:2,
        backgroundColor:'white',
        borderRadius:5
    },
    sifreinput:{
        width:'50%',
        height:'80%',
        borderWidth:1,
    },
    kartturview:{
        width:'100%',
        flexDirection:'row'
    },
    kartbilgileridisdiv:{
        width:'100%',
        backgroundColor:'#85ffd0'
    },
    kartbilgileritemdiv:{
        width:'100%',
        justifyContent:'space-between',
        flexDirection:'row',
        height:40,
        alignItems:'center',
        marginVertical:5

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
    }
})