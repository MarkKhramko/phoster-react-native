import React from 'react';
import {createStackNavigator} from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation'
import CustomDrawer from '../containers/CustomDrawer'

import Auth from '../components/Auth'
import Register from '../components/Register'
import NewTask from '../components/NewTask'
import Notes from '../components/Notes'
import EditTask from '../components/EditTask'

const TASKS = createStackNavigator({
  NotesScreen: { screen: Notes },
  NewTaskScreen: { screen: NewTask },
  EditTaskScreen: { screen: EditTask },
})

const AuthStack = createStackNavigator({
  AuthScreen: { screen: Auth },
  RegisterScreen: { screen: Register },
})

const Navigation = createDrawerNavigator({
  AuthStack,
  TASKS,
},
{
  contentComponent: CustomDrawer, 
  drawerPosition: 'left',
  drawerWidth: 200,
  contentOptions: {
    activeTintColor: 'orange',
  },
})


export default Navigation;