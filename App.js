import { Text } from 'react-native';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';
import Hepsi from './src/nav/Hepsi';

export default function App() {
  return (
    <Provider store={store}>
      <Hepsi/>
    </Provider>
  );
}
