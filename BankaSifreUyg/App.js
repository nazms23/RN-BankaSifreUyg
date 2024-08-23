import {Provider} from 'react-redux';
import { store } from './src/redux/store';
import Hepsi from './src/nav/Hepsi';


export default function App() {

  return (
    <Provider store={store}>

      <Hepsi/>

    </Provider>
  );
}