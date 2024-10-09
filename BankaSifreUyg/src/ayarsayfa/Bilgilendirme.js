import { Linking, Pressable, StyleSheet,ScrollView, Text, Image, View } from 'react-native'
import React from 'react'

const Bilgilendirme = () => {
  
  //KAAN BUNU ÜŞENDİM IGSDUYFGSUYFGDSFHUYDF sen yap 0 dan tasarımını
  return (
    <ScrollView style={styles.disdiv}>

        
      <Text style={styles.metin}>
      <Text style={[{fontSize: 16, fontWeight: 'bold'}]}>Uygulamamızın amacı,</Text> şifrelerinizi güvenli bir şekilde bir arada tutmaktır. Uygulama, şifreleri kaydetmez veya saklamaz; sadece yönetmenize ve hatırlamanıza yardımcı olur. <Text style={styles.span}> Şifrelerinizin güvenliği tamamen size aittir. Uygulamayı silerseniz, şifreleriniz de silinecektir. </Text>
      </Text>
      <Text  style={styles.metin}>
      <Text style={[{fontSize: 16, fontWeight: 'bold'}]}>Uygulamamız tamamen açık kaynak kodludur.</Text> Uygulamamıza katkıda bulunmak isterseniz, Uygulamamızın GitHub sayfasını ziyaret edebilirsiniz. Uygulamamızı geliştirerek ve bağış yaparak katkıda bulunanlar aşağıda yer alacaktır.</Text
      
    >
      <Text  style={styles.metin}>
      <Text style={[{fontSize: 16, fontWeight: 'bold'}]}>Uygulamamız, kullanıcı deneyimini ön planda tuttuğu için reklamsızdır.</Text>  Uygulamamızı beğendiyseniz ve projelerimizde bize maddi olarak destek olmak için bağışta bulunabilirsiniz.</Text>
      
      <View  style={styles.uyg}>
        <Pressable style={styles.linkbut}  onPress={async()=>{
          await Linking.openURL('https://github.com/nazms23/RN-BankaSifreUyg')
        }}>
        <Image 
            source={require('../../assets/iconlar/github.png')}
            style={styles.iconlar }
          /> 
          <Text  style={styles.metin4}>GitHub</Text>
          
        </Pressable>
        <Pressable style={styles.linkbut}  onPress={async()=>{
          await Linking.openURL('https://github.com/nazms23/RN-BankaSifreUyg')
        }}>
        <Image 
            source={require('../../assets/iconlar/donate.png')}
            style={styles.iconlar }
          /> 
          <Text  style={styles.metin4}>Papara Bağış</Text>
          
        </Pressable>
      </View>
      <View style={styles.katki}>
          <View  style={styles.katkiheader}t>
            <Text  style={styles.metin1}>Katkıda Bulunanlar
        
              
            </Text>
            <Image 
              source={require('../../assets/iconlar/kalp.png')}
              style={[styles.style, {marginLeft: 10,}]}
            /> 
          </View>

     
          <View  style={styles.katkialt2}>
            <View  style={styles.katkitag}>
              <Text style={styles.metin3}> Nazım S.</Text>
              <View style={styles.tagdeger} >

                <View  style={styles.tagalt}>   
                  <Text style={styles.metin2}> Geliştirici</Text>
              
                  <Image 
                  source={require('../../assets/iconlar/devoloper.png')}
                  style={[styles.minico]}
                  /> 
                </View>
              </View>



    
            </View>
          

          </View>
          <View  style={styles.katkialt2}>
            <View  style={styles.katkitag}>
              <Text style={styles.metin3}> Yaşar Kaan V.</Text>
              <View style={styles.tagdeger} >
                <View  style={[styles.tagalt,{borderBottomWidth: 0.5,paddingBottom: 5}]}>   
                  <Text style={styles.metin2}> Bağışçı</Text>
              
                  <Image 
                  source={require('../../assets/iconlar/donater.png')}
                  style={[styles.minico]}
                  /> 
                </View>
                <View  style={[styles.tagalt ,{paddingTop: 5}]}>   
                  <Text style={styles.metin2}> Geliştirici</Text>
              
                  <Image 
                  source={require('../../assets/iconlar/devoloper.png')}
                  style={[styles.minico]}
                  /> 
                </View>
              </View>



    
            </View>
          

          </View>
  
      </View>
  </ScrollView>

  )
}

export default Bilgilendirme

const styles = StyleSheet.create({

  disdiv:{
    width: '96.5%',
    backgroundColor: '#f1f1f1',
    padding: 20,
    borderRadius: 6,
    marginTop: 30,

    
  },
  linkbut:{
    width: 100,
    backgroundColor: '#f2f2f2',
   
    borderRadius: 6,
    justifyContent: 'top',
    alignItems: 'center',
    borderWidth: 0.5,
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
  }, 
  iconlar:{
    
    
  },
  uyg:{
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    height: 'auto',
    padding: 0,
    flexDirection: 'row',

  },
 

  metin:{
    fontSize: 15,  
    lineHeight: 20,
    marginBottom: 5,
  },
  span:{

   
    lineHeight: 20,
   

  },
 
 
  katki:{
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    padding: 20,
    marginTop: 10,


  },
  katkiheader:{
    flexDirection: 'row',
    borderBottomWidth: 0.5,

  },
  metin1:{
    fontSize: 20,
    
  },
  metin2:{
  

  },
  metin3:{
    marginLeft: 5,

  },
  metin8:{
    fontSize: 15,

  },minico:{
    marginLeft: 10,
  },
  katkialt:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
    marginTop: 5,

  },katkialt2:{
   
  },katkitag:{
    backgroundColor:'#f1f1f1',
    marginBottom: 5,
    marginTop: 10,
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 0,
    paddingRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 6,
  },tagalt:{
    flexDirection: 'row',
    alignItems: 'center',
 
    justifyContent: 'space-between'

  },tagdeger:{
    flexDirection: 'column',
    marginRight: 10,

  }
})