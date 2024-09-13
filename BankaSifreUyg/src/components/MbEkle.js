import { StyleSheet, Text, View, Image,TextInput, Pressable, ScrollView, Alert } from 'react-native'
import React, {useState} from 'react'

const MbEkle = ({resimmi, bankalar,eklefonk}) => {

    const eklemefonk = eklefonk;

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
        <Pressable style={[styles.artibuton]} onPress={()=>{
            setEklebas(!eklebas)
            setBankalarbas(false)
            }}>
            <Text style={{fontSize:30}}>+</Text>
        </Pressable>
        <View style={[styles.eklemedis, {display: eklebas? 'flex': 'none'}]} >
            <Pressable style={[styles.bankadisdiv]} onPress={()=>setBankalarbas(!bankalarbas)}>
                
                {resimmi & defresim != undefined ? 
                <Image style={styles.bankaresim} source={defresim}/> : 

                <Text>{defisim}</Text> 
                }
            </Pressable>

            <View style={styles.sifredisdiv}>
                <TextInput 
                    style={styles.sifreinput}  
                    inputMode='numeric'
                    placeholder='Şifreniz'
                    maxLength={6}

                    value={sifre}
                    onChangeText={setSifre}
                />
            </View>
            <Pressable style={styles.eklebuton} onPress={()=>{
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
                }else
                {
                    Alert.alert('Başarısız', 'Şifre kısmı boş bırakılamaz.', [
                        {text: 'Tamam', onPress: () => {return}},
                      ]);
                }
                }}>
                <Text>Ekle</Text>
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