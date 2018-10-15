import React from 'react';
import { connect } from 'react-redux';
import { 
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { HeaderBackButton } from "react-navigation";

import GradientBackground from '../../components/GradientBackground';
import RoundedButton from '../../components/RoundedButton';

import { Auth } from '../../services/Auth';

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      password: '',
    };
  }

   static navigationOptions = {
    headerStyle: {
      backgroundColor: "#F79D33",
      borderBottomWidth: 0,
      elevation: null,
    },
    headerTintColor: '#fff'
  };

  _handleRegisterAction() {
    const { nickname, password } = this.state;
    const { navigate } = this.props.navigation;

    if(!!nickname && !!password) {
      console.log("Регистрирую", nickname, password);
      Auth
      .register(nickname, password)
      .then((response)=>{
        if(!!response.data.token){
          navigate('MainScreen', {})
        }
      })
      .catch((error)=>{
        console.log(error);
        Alert.alert('Данный пользователь уже существует или введен неправильный ник!')
      });
    } 
    else{
      Alert.alert('Заполните телефон и пароль!');
    }
  }

  render() {
    return (
      <GradientBackground style={styles.container}>
        <Text style={styles.hintTitle}>
          Для регистрации необходимо ввести ваш сотовый телефон.
        </Text>
        <TextInput
          style={styles.inputField}
          placeholder="+7-999-999-99-99"
          onChangeText={(nickname) => this.setState({nickname})}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Пароль"
          secureTextEntry
          onChangeText={(password) => this.setState({password})}
        />
        <RoundedButton
          width="74%"
          onPress={this._handleRegisterAction.bind(this)}
          title="Зарегистрироваться"
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

  hintTitle:{
    flexWrap: 'wrap',
    width: '90%',
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
  },

  inputField:{
    width: '90%',
    height: 42,
    marginTop: 30,
    borderRadius: 21,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 18,
    backgroundColor: '#fff',
    color: '#333'
  },

  buttonContainer: {
    marginTop: 7,
    marginBottom: 5,
  }
});

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps
)(RegisterScreen);