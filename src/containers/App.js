import React from 'react';
import {createStackNavigator} from 'react-navigation'

// Photos
import TakePhoto from './TakePhoto'
import MainScreen from './MainScreen'
import ShowPhoto from './ShowPhoto'

// Auth
import Login from '../containers/Login'
import Register from '../containers/Register'

const App = createStackNavigator({
  AuthScreen: { screen: Login },
  RegisterScreen: { screen: Register },

  MainScreen: { screen: MainScreen },
  TakePhotoScreen: { screen: TakePhoto },
  ShowPhotoScreen: { screen: ShowPhoto },
});

export default App;