import { StyleSheet, Text, View, Image,TextInput, Pressable, ScrollView } from 'react-native'
import React, {useState} from 'react'

const MbEkle = ({resimmi}) => {

    const [eklebas, setEklebas] = useState(true)

    const [bankalarbas, setBankalarbas] = useState(true)

  return (
    <View style={[styles.disdiv]}>
        <Pressable style={[styles.artibuton]} onPress={()=>{
            setEklebas(!eklebas)
            setBankalarbas(false)
            }}>
            <Text style={{fontSize:30}}>+</Text>
        </Pressable>
        <View style={[styles.eklemedis, {display: eklebas? 'flex': 'none'}]} >
            <Pressable style={[styles.bankadisdiv]} onPress={()=>setBankalarbas(!bankalarbas)} >
                
                {resimmi ? 
                <Image style={styles.bankaresim} source={require('../../assets/bankalar/Akbank.png')}/> : 
            
                <Text>Akbank</Text> 
            
            
                }

            
            </Pressable>

            <View style={styles.sifredisdiv}>
                <TextInput 
                    style={styles.sifreinput}  
                    inputMode='numeric'
                    placeholder='Şifreniz'
                    maxLength={10}
                />
            </View>
            <Pressable style={styles.eklebuton}>
                <Text>Ekle</Text>
            </Pressable>
        </View>
        <View style={[styles.bankalardisdiv,{display: bankalarbas? 'flex':'none'}]}>
            <ScrollView horizontal={true} style={styles.bankalarscrollview}>

            <Pressable style={[styles.bankalarviewbuton]} >
                {resimmi ? 
                <Image style={styles.bankaresim} source={require('../../assets/bankalar/Akbank.png')}/> : 
                <Text>Akbank</Text> 
                }
            </Pressable>
            
            <Pressable style={[styles.bankalarviewbuton]} >
                {resimmi ? 
                <Image style={styles.bankaresim} source={require('../../assets/bankalar/Ziraat.jpg')}/> : 
                <Text>Ziraat</Text> 
                }
            </Pressable>

            </ScrollView>
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
        width:50,
        borderWidth:1,
        backgroundColor:'yellow',
        height:50,
        marginVertical:2,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
    },
    eklemedis:{
    width:"100%",
    backgroundColor:'#9790d6',
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
    width:'100%',
    height:'100%',
    backgroundColor:'white',
    borderRadius:5
},
bankalardisdiv:{
    width:'100%',
    backgroundColor:'#bcb8e6',
    height:50
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
    backgroundColor:'wheat',
    height:'100%'
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
eklebuton:{
    flex:1,
    backgroundColor:'#6dd6b1',
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5
},
sifreinput:{
    width:'97%',
    height:'80%',
    borderWidth:1,
}


})