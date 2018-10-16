import React from 'react'
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet
} from 'react-native';
import { Header } from 'react-navigation';

export default class KeyboardAvoiding extends React.Component {
  render() {
    const{
      style,
      children
    }=this.props;

    return (
       <KeyboardAvoidingView
        keyboardVerticalOffset = { Header.HEIGHT }
        style={ style }
        behavior="padding"
        enabled
      >
        <ScrollView 
          key="scrollable"
          style={ styles.scrollView }
          contentContainerStyle={ styles.contentContainerStyle }
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView:{
    flex: 1,
    width: '100%'
  },
  contentContainerStyle:{
    alignItems: 'center'
  }
});