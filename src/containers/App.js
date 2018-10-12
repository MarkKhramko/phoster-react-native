import React from 'react';
import {createStackNavigator} from 'react-navigation'

// Photos
import TakePhoto from './TakePhoto'
import MainScreen from './MainScreen'
import ShowPhoto from './ShowPhoto'

// Auth
import StarterScreen from './StarterScreen'
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'

const App = createStackNavigator({
  StarterScreen: { screen: StarterScreen},
  LoginScreen: { screen: LoginScreen },
  RegisterScreen: { screen: RegisterScreen },
  MainScreen: { screen: MainScreen },
  TakePhotoScreen: { screen: TakePhoto },
  ShowPhotoScreen: { screen: ShowPhoto },
});

export default App;