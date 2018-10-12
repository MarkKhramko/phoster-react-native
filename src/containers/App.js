import React from 'react';
import {createStackNavigator} from 'react-navigation'

import NewTask from '../components/NewTask'
import Notes from '../components/Notes'
import EditTask from '../components/EditTask'

// Auth
import Login from '../containers/Login'
import Register from '../containers/Register'

const App = createStackNavigator({
  AuthScreen: { screen: Login },
  RegisterScreen: { screen: Register },

  NotesScreen: { screen: Notes },
  NewTaskScreen: { screen: NewTask },
  EditTaskScreen: { screen: EditTask },
});

export default App;