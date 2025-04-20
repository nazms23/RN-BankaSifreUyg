import { StyleSheet, View, Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, {useCallback, useEffect,useState} from 'react'
const Header = React.lazy(()=> import('../components/Header'));
const Footer = React.lazy(()=> import('../components/Footer'));
const MBListOgesi = React.lazy(() => import('../components/MBListOgesi'))
import MbEkle from '../components/MbEkle';
import Yukleniyor from '../components/Yukleniyor'

import {useSelector,useDispatch} from 'react-redux';
import {MBEkleSlice,MBSil,MBSifreDegis,MBBankaDegis,OncekiSayfaDegis} from '../redux/bilgilerSlice'
import { LegendList } from '@legendapp/list'



const MobilBanka = ({navigation}) => {
  const dispacth = useDispatch()
  
  const {logoyazi} = useSelector(s=> s.ayar)

  const {mobilbanka} = useSelector(s=>s.bilgi)

  const {bankalar} = useSelector(s=> s.genel)
 
  let scrollView1;

  const fonksiyonlar = {
    mobilbankgecisfonk: ()=>{
      /* navigation.navigate('MobilBanka')
      dispacth(OncekiSayfaDegis('MobilBanka')) */
    },
    kredikartgecisfonk: useCallback(()=>{
      dispacth(OncekiSayfaDegis('KrediBanka'))
      setYukle(false);
      navigation.navigate('KrediBanka')
    }),
    ayarlargecisfonk: useCallback(()=>{
      navigation.navigate('Ayarlar')
    }),
 
    MBSifreEkle: useCallback(async (bId,sifre)=>{
      let id = mobilbanka.length > 0 ? mobilbanka[mobilbanka.length-1].id+1 : 1
      dispacth(MBEkleSlice({id:id,bankaId:bId,sifre:sifre}))
    }),
    MBSifreSil: (bId)=>{
      dispacth(MBSil(bId))
    },
    MBSifreDegistir: (id,text)=>{
      if(text.length == 6)
      {
        dispacth(MBSifreDegis({id:id,text:text}))
      }

    },
    MBBankaDegistir: (id,bId)=>{
      dispacth(MBBankaDegis({id:id,bId:bId}))
    },


    scrolenasagit:()=>{
      scrollView1.scrollToEnd({animated: true})
    }
  }

  const [yukle, setYukle] = useState(false)
  const [isKlavye, setIsKlavye] = useState(false)

  useEffect(()=>{
    setYukle(true)
    Keyboard.addListener('keyboardDidShow',()=> setIsKlavye(true))
    Keyboard.addListener('keyboardDidHide',()=> setIsKlavye(false))
  },[])
  
  return (
    <SafeAreaView style={styles.disdiv}>
      
        <Header flexx={1} title={"Mobil Bankacılık"} ayarlarfonk={fonksiyonlar.ayarlargecisfonk}/>
        <View style={styles.contdis}>
        {
          !yukle && <Yukleniyor/> 
        }

        {
        yukle &&
        <LegendList
          style={{width:'96.5%',height:'auto'}}
          data={mobilbanka}
          renderItem={({item})=>
            <MBListOgesi
              resimmi={logoyazi} 
              key={item.id} 
              sifreidsi={item.id} 
              resim={bankalar.find(v=> v.id == item.bankaId)?.resim} 
              bankaad={bankalar.find(v=> v.id == item.bankaId)?.isim} 
              sifre={item.sifre} bId={bankalar.find(v=> v.id == item.bankaId)?.id} 
              silfonk={fonksiyonlar.MBSifreSil} sifredegisfonk={fonksiyonlar.MBSifreDegistir} 
              bankadegisfonk={fonksiyonlar.MBBankaDegistir} 
              bankalar={bankalar} 
            />
          }
          estimatedItemSize={10}
          ListFooterComponent={<MbEkle scroolfonk={fonksiyonlar.scrolenasagit} resimmi={logoyazi} bankalar={bankalar} eklefonk={fonksiyonlar.MBSifreEkle} />}
          keyExtractor={item=>item.id}
          ref={ref => {scrollView1 = ref}}
        />
        }
        </View>
        {!isKlavye && <Footer flexx={1} hangisi={1} mobilfonk={fonksiyonlar.mobilbankgecisfonk} kredifonk={fonksiyonlar.kredikartgecisfonk} />}
    
    </SafeAreaView>
  )
}

export default MobilBanka

const styles = StyleSheet.create({
  disdiv:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  contdis:{
    width:'100%',
    height:'0%',
    justifyContent:'flex-start',
    alignItems:'center',
    flexDirection:'column',
    flex:10,
    paddingTop: 20,

    backgroundColor:'#E7E9EA',
  },
  contscrollvw:{
    width:'100%',
    height:"100%",
  }
})