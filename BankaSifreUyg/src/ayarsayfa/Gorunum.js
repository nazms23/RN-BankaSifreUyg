import { StyleSheet, Text, View,ScrollView,Pressable,TextInput,Image } from 'react-native'
import React,{useState} from 'react'

const Gorunum = ({hersey}) => {

  const fonks ={
    lysec: hersey.lysec,
    ndegis:hersey.ndegis,
    logosec: ()=>{
      fonks.lysec(true)
    },
    yazisec: ()=>{
      fonks.lysec(false)
    },
    notgorunsun: ()=>{
      fonks.ndegis(!notgorunumu)
      setNotgorunumu(!notgorunumu)
    }
  }

  const [notgorunumu, setNotgorunumu] = useState(hersey.not)


  return (
    <ScrollView style={styles.contdis}>

      <View style={styles.itemdisdiv}>
        <Text style={styles.yazilar}>Banka Görünümü</Text>
        <Pressable style={styles.butonlaryazi} onPress={()=>{fonks.logosec()}} >
            <Text style={styles.yazilar}>Logo</Text>
        </Pressable>
        <Pressable style={styles.butonlaryazi} onPress={()=>{fonks.yazisec()}}>
            <Text style={styles.yazilar}>Yazı</Text>
        </Pressable>
      </View>

      <View style={styles.itemdisdiv}>
        <Text style={styles.yazilar}>Kartlarda Not Görünsün Mü</Text>
        <Pressable style={[styles.butonlar]} onPress={()=> fonks.notgorunsun()}>
                <Image 
                    source={notgorunumu ? require('../../assets/iconlar/checkdolu.png'):require('../../assets/iconlar/checkbos.png')} 
                    resizeMode='center'
                    style={[styles.resimler,styles.sifresorresim]}
                />
            </Pressable>
      </View>

    </ScrollView>
  )
}

export default Gorunum

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
      flex:1,
      fontSize:17
    },
    butonlar:{
      width:'100%',
      height:'100%',
      flex:1
  
    },
    butonlaryazi:{
      width:'100%',
      height:'100%',
      flex:1,
      backgroundColor:'#6e61ad',
      borderRadius:15
  
    },
    inputlar:{
      borderWidth:1,
      flex:1,
      width:'100%',
      height:'100%'
    }
})