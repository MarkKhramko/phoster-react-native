import React from 'react';
import {
  Button,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import { LinearGradient } from 'expo';
import GradientBackground from '../../components/GradientBackground';
import RoundedButton from '../../components/RoundedButton';
import logo from '../../../assets/images/logo.png';

class WelcomeScreen extends React.Component {

  componentDidMount(){
    let {navigate} = this.props.navigation
    return navigate('LoginScreen', {})
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#F79D33",
      borderBottomWidth: 0,
      elevation: null,
    },
    headerTintColor: '#fff'
  };


  render() {
    const { navigate } = this.props.navigation

    return (
      <GradientBackground style={ styles.container }>
        <Image
          style={ styles.logo }
          source={logo}
        />
        <Text style={styles.title}>
          Phoster
        </Text>
        <Text style={styles.text}>
          Приложение для мгновенного обмена фотографиями с незнакомцами со всего света.
        </Text>
        <RoundedButton
          width="74%"
          onPress={() => navigate('LoginScreen', {})}
          title="Войти"
        />
      </GradientBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  logo:{
    width: 150,
    height: 150,
    marginTop: 85
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

export default WelcomeScreen;