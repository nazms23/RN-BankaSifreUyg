import { Pressable, SafeAreaView, Image,StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const Header = ({flexx,title,ayarlarfonk}) => {
  return (
    <SafeAreaView style={[styles.disdiv, {flex:flexx}]}>
  
      <View style={[styles.yazidiv, {flex: 4}]}>
        <Text style={styles.yazi}>{title}</Text>
      </View>
      
    
      <Pressable style={({pressed}) => [{
        backgroundColor: pressed ?  "#f9f9f9": '#f1f1f1'
        },styles.butondis]} onPress={ayarlarfonk}>
        <View style={styles.setbutdis}>
          <Image
          source={require('../../assets/iconlar/setting2.png')}
          style={styles.setbut }
          />
        </View>
      
     
    
      </Pressable>
   

    </SafeAreaView>
  )
}

export default Header

const styles = StyleSheet.create({
  disdiv:{
    width:'100%',
    height: '100%',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    backgroundColor: '#E7E9EA',
    paddingTop: 10,
    paddingBottom:15,
  },
  yazidiv:{
    width:"100%",
    height: hp('8%'),
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#FFFFFF',
    borderRadius:12,
   
    marginLeft: 10,
    marginRight: 10,

    
 
    
    elevation: 4
        

  },
  butondis:{
    flex:0.9,
    width: '100%',
    height: hp('8%'),
    borderRadius: 12,

    marginLeft: 20,
    marginRight: 10,
    justifyContent:'center',
    alignItems:'center',
    elevation: 4
    
  },
  textler:{
    width:'95%',
    textAlign:'center'
  },
  yazi:{
    fontSize:20,
    
  },
  setbutdis:{
    width: '100%',

    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  setbut:{
    width: wp(10),
    height: hp(5)
  }
  



})