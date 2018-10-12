import React from 'react'
import { Provider } from 'react-redux'
import App from './src/containers/App'
import configureStore from './src/store/configureStore'
import { AppRegistry } from 'react-native'

const store = configureStore()

const rnredux = () => (
  <Provider store={store}> 
    <App />
  </Provider>
)

export default rnredux

AppRegistry.registerComponent('rnredux', () => rnredux)