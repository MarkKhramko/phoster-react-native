import React from 'react';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import App from './src/containers/App';
import configureStore from './src/store/configureStore';

const store = configureStore()

const rnredux = () => (
  <Provider store={store}> 
    <App />
  </Provider>
)

export default rnredux

AppRegistry.registerComponent('rnredux', () => rnredux)