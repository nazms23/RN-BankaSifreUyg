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
      
    
      
        <Text style={styles.headeryaz}>Banka Görünümü</Text>
        <View style={styles.itemdisdiv3}>
          <Pressable style={({pressed}) => [{
        backgroundColor: pressed ?  "#f9f9f9": '#f1f1f1', borderColor: pressed ?  "green":'transparent'
        }, styles.butonlaryazi]} onPress={()=>{fonks.logosec()}} >
              <Text style={styles.yazilar}>Logo</Text>
          </Pressable>
          <Pressable style={({pressed}) => [{
        backgroundColor: pressed ?  "#f9f9f9": '#f1f1f1', borderColor: pressed ?  "green":'transparent'
        },styles.butonlaryazi2]} onPress={()=>{fonks.yazisec()}}>
              <Text style={styles.yazilar}>Yazı</Text>
          </Pressable>
        </View>

      </View>

      <View style={styles.itemdisdiv4}>
        <Text style={styles.yazilar}>Kredi/Banka Kartı Not Özelliği Görünümü.</Text>
        <Pressable style={[styles.butonlar]} onPress={()=> fonks.notgorunsun()}>
                <Image 
                    source={notgorunumu ? require('../../assets/iconlar/checkgreen.png'):require('../../assets/iconlar/checkbos4.png')} 
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
      width:'96.5%',
      height: 'auto',
      flex: 1,
      backgroundColor: '#E7E9EA',
      display: 'flex',
      flexDirection: 'column',
    

    },
    
  
  itemdisdiv:{
      backgroundColor:'#f9f9f9',
      width:'100%',
      height: 'auto',
      flexDirection:'column',
      backgroundColor: '#f9f9f9',
      alignItems:'center',
      justifyContent: 'center',
      marginVertical:30,
      elevation: 1,
      borderRadius: 6,
    },
    itemdisdiv2:{
      backgroundColor:'#f9f9f9',
      borderRadius: 6,
      marginTop: 10,
      
      
      marginBottom: 20,
      width:'100%',
      height: 'auto',
      
    
      flexDirection:'row',
      justifyContent:'space-around',
      

      elevation: 1,
      
    },
    itemdisdiv3:{
      backgroundColor:'#f9f9f9',
      borderRadius: 6,
      marginTop: 10,

      marginBottom: 20,
      width:'100%',
      height: 'auto',
      
    
      flexDirection:'row',
      justifyContent:'space-around',
      


      
    },      
      itemdisdiv4:{
      backgroundColor:'#f9f9f9',
      width:'100%',
      height:60,
      flexDirection:'row',
      display:'flex',
      borderRadius: 6,

      justifyContent: 'space-around',
      alignItems:'center',
      marginVertical:10,
      elevation: 1,
    },
  
  
  
  
    resimler:{
      width:'100%',
      height:'100%',
      flex:1
  
    },headeryaz:{
      width:'100%', 
      height:'100%',
      textAlign:'center',
      textAlignVertical:'center',
      flex:1,
      fontSize:18,
      marginTop: 15,

      marginBottom: 10,
    },
    yazilar:{
      marginLeft:5,
        width:'100%',
        height:'100%',
        textAlign:'center',
        textAlignVertical:'center',
        flex: 1,
    },
    butonlar:{
      width:'60%',
      height:'60%',
      flex: 0.6,
   
    },
    butonlaryazi:{
      width:'100%',
      height:'100%',
      flex: 0.3,
     
      borderRadius:15,
      paddingBottom: 30,
      paddingTop: 30,
      paddingRight: 10,
      paddingLeft: 10,
      elevation: 3,
      borderWidth: 1,
  
    },
    butonlaryazi2:{
      width:'100%',
      height:'100%',
      flex: 0.3,
   
      borderRadius:15,
      paddingBottom: 30,
      paddingTop: 30,
      paddingRight: 10,
      paddingLeft: 10,
      elevation: 3,
      borderWidth: 1
    
    },
    inputlar:{
      borderWidth:1,
      flex:1,
      width:'100%',
      height:'100%',
      
    }
})