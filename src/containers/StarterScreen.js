import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, Button} from 'react-native';
import { LinearGradient } from 'expo';

class StarterScreen extends React.Component {

  static navigationOptions = {
    header: null,
    elevation: null
  };


  render() {
    const { navigate } = this.props.navigation

    return (
      <View>
      <LinearGradient
        colors={['#F79D33', '#FC4A1A']}
        style={{ padding: 15, alignItems: 'center', height: 650 }}>
        <Button
          style={styles.login}
          onPress={() => { navigate('AuthScreen',)}}
          title="Войти"
       />
      </LinearGradient>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  header: {
    color: '#f1841e',
    fontWeight: 'bold',
    fontSize: 30,
    paddingTop: 50,
    marginBottom: 110,
    shadowColor: '#f8983f',
  },
  line: {
    borderBottomColor: '#E91926',
    borderBottomWidth: 2
  },
  opaciti:{
    position: "absolute",
    bottom: 0,
    marginLeft: 140
  },
  login:{
    width:80,
    height:80,
    borderRadius: 21,
    backgroundColor: 'white'
  }
});

export default StarterScreen;
