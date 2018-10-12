import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, Button} from 'react-native';
import { LinearGradient } from 'expo';
import logo from '../assets/logo.png'

class StarterScreen extends React.Component {

  componentDidMount(){
    let {navigate} = this.props.navigation
    return navigate('LoginScreen', {})
  }

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
          <Image
            style={{width: 150, height: 150, marginTop: 85}}
            source={logo}
          />
          <Text style={styles.title}>Phoster</Text>
          <Text style={styles.text}>Приложение для мгновенного обмена фотографиями со случайными людьми</Text>
          <TouchableOpacity onPress={() => { navigate('AuthScreen',)}}>
            <View style={styles.login}>
              <Text style={{fontSize: 18, marginTop: 7, color: "#333333"}}>Войти</Text>
            </View>
          </TouchableOpacity>
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
  login:{
    marginTop: '30%',
    paddingLeft: 80,
    paddingRight: 80,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'white',
  },
  opaciti:{
    position: "absolute",
    bottom: 0
  },
  text: {
    marginTop: '15%',
    fontSize: 18,
    color: "white",
    fontWeight: '500',
    textAlign:'center',
    marginLeft: 20,
    marginRight: 20
  },
  title: {
    fontSize: 36,
    color: "white",
    fontWeight: 'bold',
    textAlign:'center',
    marginLeft: 20,
    marginRight: 20
  }
});

export default StarterScreen;
