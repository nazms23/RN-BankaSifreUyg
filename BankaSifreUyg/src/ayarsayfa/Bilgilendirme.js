import { Linking, Pressable, StyleSheet, Text, Image, View } from 'react-native'
import React from 'react'

const Bilgilendirme = () => {
  
  //KAAN BUNU ÜŞENDİM IGSDUYFGSUYFGDSFHUYDF sen yap 0 dan tasarımını
  return (
    <View style={styles.disdiv}>

      
    <Text style={styles.metin}>
    Uygulamamızın amacı, şifrelerinizi güvenli bir şekilde bir arada tutmaktır. Uygulama, şifreleri kaydetmez veya saklamaz; sadece yönetmenize ve hatırlamanıza yardımcı olur. <Text style={styles.span}> Şifrelerinizin güvenliği tamamen size aittir. Uygulamayı silerseniz, şifreleriniz de silinecektir. </Text>
    </Text>
    <Text  style={styles.metin}>
    Uygulamamız tamamen açık kaynak kodludur. Uygulamamıza katkıda bulunmak isterseniz, Uygulamamızın GitHub sayfasını ziyaret edebilirsiniz. Uygulamamızı geliştirerek ve bağış yaparak katkıda bulunanlar aşağıda yer alacaktır.</Text
    
  >
  <Text  style={styles.metin}>
  Uygulamamız, kullanıcı deneyimini ön planda tuttuğu için reklamsızdır. Uygulamamızı beğendiyseniz ve projelerimizde bize maddi olarak destek olmak için bağışta bulunabilirsiniz.</Text>
   
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
      <Text  style={styles.metin1}>Katkıda bulunanlar</Text>
      <Text style={styles.metin2}> KAAN1İQ0</Text>
      <Text style={styles.metin2}>NAZIM</Text>
      <Text style={styles.metin2}>Gelecekte uygulamayı geliştirmeye yardım edicek olan o yakışıklı/güzel insan</Text>
    </View>
  </View>

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
    margin: 20,
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
    fontSize: 17,  
    lineHeight: 20,
    marginBottom: 10,
  },
  span:{

   
    lineHeight: 20,
   

  },
  katki:{
    backgroundColor: '#f9f9f9',
    borderRadius: 6,

    marginTop: 20,


  }
})