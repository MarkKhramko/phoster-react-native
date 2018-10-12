import React from 'react';
import {createStackNavigator} from 'react-navigation'

// Photos
import TakePhoto from './TakePhoto'
import MainScreen from './MainScreen'
import ShowPhoto from './ShowPhoto'

// Auth
import StarterScreen from './StarterScreen'
import Login from './Login'
import Register from './Register'

const App = createStackNavigator({
  StarterScreen: { screen: StarterScreen},
  AuthScreen: { screen: Login },
  RegisterScreen: { screen: Register },
  MainScreen: { screen: MainScreen },
  TakePhotoScreen: { screen: TakePhoto },
  ShowPhotoScreen: { screen: ShowPhoto },
});

export default App;