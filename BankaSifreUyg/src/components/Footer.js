import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const Footer = ({hangisi,flexx,mobilfonk,kredifonk}) => {
  return (
    <View style={[styles.disdiv, {flex:flexx}]}>
      <Pressable style={({pressed}) => [{
        backgroundColor: pressed ?  "#f9f9f9": '#f1f1f1'
        }
        ,styles.butondiv, styles.buton1,
        {
          backgroundColor: hangisi == 1 ? "#fff" : '#f1f1f1'
        }
        
        ]} onPress={mobilfonk}>
        <Text style={styles.butontext}>
          Mobil Bankacılık
        </Text>
      </Pressable>

      <Pressable  style={({pressed}) => [{
        backgroundColor: pressed ?  "#f9f9f9": '#f1f1f1'
        },styles.butondiv, styles.buton2,
        {
          backgroundColor: hangisi == 2 ? "#fff" : '#f1f1f1'
        }]} onPress={kredifonk}>
      <Text style={styles.butontext}>
        Kredi/Banka Kartı
      </Text>
      </Pressable>    
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
  disdiv:{
    width:'100%',
    height:'100%',
    backgroundColor:'#E7E9EA',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    padding: 10,
    paddingTop: 20,
    paddingBottom: 40,

  },
  butondiv:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width:"100%",
    height: hp(9),
 
    borderRadius:5,
    marginHorizontal:3,
    margin: 10,
    elevation: 0.50,
    
  },
  buton1:{
    marginRight: 10,
  },
  buton2:{
    marginLeft: 10,
  
  },

})