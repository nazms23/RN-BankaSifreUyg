import { Linking, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Bilgilendirme = () => {
  
  //KAAN BUNU ÜŞENDİM IGSDUYFGSUYFGDSFHUYDF sen yap 0 dan tasarımını
  return (
    <View>
      <Text>Kullanımınız açısından reklamların kötü bir deneyim yaşatabilceğini düşündüğümüzden reklam koymadık. Sırf şifrelerinize bakmak için girdiğiniz bi uygulamadan zırt pırt reklam çıksa not defteri yerine niye bunu tercih edesiniz. Bu yüzden de bağış falan yapmak isterseniz insta: Kaan1iq0 bana yazın iban atam</Text>
      <Text>Tamamen açık kaynak kodlu alın bu github burdan bakın kodlarına. Eklemek istediğiniz bişi varsada ekleyin</Text>
      <Pressable style={{backgroundColor:'gray', width:200}}  onPress={async()=>{
        await Linking.openURL('https://github.com/nazms23/RN-BankaSifreUyg')
      }}>
        <Text style={{color:'lime'}}>BURAYA GİTHUB LOGO KONULCAK BANA TIKLA</Text>
      </Pressable>
      <View>
        <Text>Katkıda bulunanlar</Text>
        <Text>KAAN1İQ0</Text>
        <Text>NAZIM</Text>
        <Text>Gelecekte uygulamayı geliştirmeye yardım edicek olan o yakışıklı/güzel insan</Text>
      </View>
    </View>
  )
}

export default Bilgilendirme

const styles = StyleSheet.create({})