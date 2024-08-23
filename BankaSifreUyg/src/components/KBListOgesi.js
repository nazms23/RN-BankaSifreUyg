import { StyleSheet, Text, View,Image,Pressable,ScrollView,TextInput } from 'react-native'
import React, {useState} from 'react'
import {Swipeable,GestureHandlerRootView} from 'react-native-gesture-handler'


const KBListOgesi = ({resimmi, resim, bankaad, kartturu ,sifre,bId, silfonk, sifredegisfonk , bankadegisfonk , turdegisfonk , bankalar, kartturler , sifreidsi}) => {

    const silmefonk = silfonk;
    const sifredegis = sifredegisfonk
    const bankadegis = bankadegisfonk
    const turdegis = turdegisfonk

    const [bankalarbas, setBankalarbas] = useState(false)
    const [kartturbas, setKartturbas] = useState(false)
    const [editmod, setEditmod] = useState(false)

    const [bankaresim, setBankaresim] = useState(resim)
    const [bankaadi, setBankaadi] = useState(bankaad)

    const [kartturisim, setKartturisim] = useState(kartturu)


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

        bankadegis(sifreidsi,id)
    }

    const turdegisti = (id) =>{
        setKartturisim(kartturler.find(i=>i.id == id).isim)

        turdegis(sifreidsi,id)
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
})