import React from 'react';
import {createStackNavigator} from 'react-navigation';

import WelcomeScreen from './WelcomeScreen';
// Auth
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
// Photo take
import TakePhotoScreen from './TakePhotoScreen';
import PreviewPhotoScreen from './PreviewPhotoScreen';
// Feed
import MainScreen from './MainScreen';
import ShowPhotoScreen from './ShowPhotoScreen';

const App = createStackNavigator({
  WelcomeScreen: { screen: WelcomeScreen},
  LoginScreen: { screen: LoginScreen },
  RegisterScreen: { screen: RegisterScreen },
  MainScreen: { screen: MainScreen },
  ShowPhotoScreen: { screen: ShowPhotoScreen },
  TakePhotoScreen: { screen: TakePhotoScreen },
  PreviewPhotoScreen:{ screen:PreviewPhotoScreen }
});

export default App;