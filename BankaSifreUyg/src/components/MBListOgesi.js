import { StyleSheet, Text, View,Image,Pressable,ScrollView,TextInput } from 'react-native'
import React, {useState} from 'react'
import {Swipeable,GestureHandlerRootView} from 'react-native-gesture-handler'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const MBListOgesi = ({resimmi, resim, bankaad,sifre,bId, silfonk, sifredegisfonk , bankadegisfonk , bankalar, sifreidsi}) => {

    const silmefonk = silfonk;
    const sifredegis = sifredegisfonk
    const bankadegis = bankadegisfonk

    const [bankalarbas, setBankalarbas] = useState(false)
    const [editmod, setEditmod] = useState(false)

    const [bankaresim, setBankaresim] = useState(resim)
    const [bankaadi, setBankaadi] = useState(bankaad)

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

    renderLeftActions = (progress, dragX) => {
        const trans = dragX.interpolate({
          inputRange: [0, 50, 100, 101],
          outputRange: [-20, 0, 0, 1],
        });
        return (
          <Pressable style={({pressed}) => [{
            backgroundColor: pressed ?  "#f1f1f1": '#f9f9f9'
            },styles.silbuton]} onPress={()=>silmefonk(sifreidsi)} >
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
          <Pressable style={({pressed}) => [{
            backgroundColor: pressed ?  "#f1f1f1": '#f9f9f9'
            },styles.silbuton,{marginRight: 10,}]} onPress={()=>editmodac()} >
            <View style={styles.silbutonresimdiv}>
            <Image
              source={require('../../assets/iconlar/editgreen.png')}
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
                    {resimmi & bankaresim != undefined ? 
                    <Image style={styles.bankaresim} source={bankaresim}/> : 

                    <Text style={styles.bankatext}>{bankaadi}</Text> 
                    
                    
                    }

                    

                </Pressable>
                <View style={[styles.sifredisdiv,{display:textgorunurluk}]}>
                    <Text style={styles.sifretext}>{textboxyazi}</Text>
                    
                </View>
                <View style={[styles.sifredisdiv,{display:textboxgorunurluk}]}>
                    <TextInput 
                    inputMode='numeric'
                    placeholder='Şifreniz'
                    maxLength={6}
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
                  if(i.id != 0)
                  {
                    return(
                    <Pressable style={[styles.bankalarviewbuton]} key={i.id} onPress={()=>bankadegisti(i.id)} >
                    {resimmi & i.resim != undefined ? 
                    <Image style={styles.bankaresim} source={i.resim}/> : 
                    <Text style={styles.bankatext}>{i.isim}</Text> 
                    }
                    </Pressable>)
                  }
                })
            }

            </ScrollView>
        </View>
    </GestureHandlerRootView>
  )
}

export default MBListOgesi

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
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:0,
        borderRightWidth: 0.5,
        borderRightColor: '#000',
        backgroundColor:'#f9f9f9',
        width:'100%',
        height:'100%',
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
    },
    bankaresim:{
        width:'90%',
        height:'100%',
        resizeMode:'center',
      
    },
    sifredisdiv:{
        flex:3,
        justifyContent:'center',
        alignItems:'center',
       
    },
    silbuton:{
      
      borderRadius:15,
      marginLeft:10,
      marginTop: 3,
      
    
      width: wp('20%'),
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
    sifretext:{
      fontSize:30,
     
    },
    bankatext:{
      fontSize:30
    }
})