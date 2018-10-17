import React from 'react'
import { connect } from 'react-redux'
import { 
  Alert,
  Flatlist,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Header } from 'react-navigation';
import { LinearGradient } from 'expo';

import Auth from '../../services/Auth';
import GradientBackground from '../../components/GradientBackground';
import KeyboardAvoiding from '../../components/KeyboardAvoiding';
import RoundedButton from '../../components/RoundedButton';


class LoginScreen extends React.Component {

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#F79D33",
      borderBottomWidth: 0,
      elevation: null,
    },
    headerTintColor: '#fff'
  };

  constructor(props) {
    super(props);
    this.state = {
      nickname: 'test',
      password: 'simplepass'
    };
  }

  async componentWillMount(){
    const token = await Auth.getToken();
    if(token !== null){
      const [err, isValid] = await Auth.validateToken(token);
      if(err){
        return console.log("LoginScreen error:", err);
      }

      if(isValid)
        this._handleSuccessfulLogin();
    }
  }

  _handleLoginAction() {
    Keyboard.dismiss();

    const { nickname, password } = this.state;    

    if(!!nickname && !!password) {
      Auth
      .login(nickname, password)
      .then((response)=>{
        if(!!response.data.token)
          this._handleSuccessfulLogin();
      })
      .catch((error)=>{
        console.log(error);
        Alert.alert('Введен неправильный пароль или ник!')
      });
    } else {
      Alert.alert('Заполните телефон и пароль');
    }
  }

  _handleSuccessfulLogin(){
    const { navigate } = this.props.navigation;
    navigate('MainScreen');
  }
  
  render() {
    const {navigate} = this.props.navigation;
    const{
      nickname,
      password
    }=this.state;


    return (
      <GradientBackground style={ styles.container }>
        <KeyboardAvoiding
          style={ styles.innerContainer }
        >
          <Text style={ styles.hintTitle }>
            Для входа необходимо ввести ваш сотовый телефон.
          </Text>
          <TextInput
            style={ styles.inputField }
            underlineColorAndroid='transparent'
            placeholder="+7-999-999-99-99"
            value={ nickname }
            onChangeText={(nickname) => this.setState({nickname})}
          />
          <TextInput
            style={ styles.inputField }
            placeholder="Пароль"
            value={ password }
            secureTextEntry
            onChangeText={(password) => this.setState({password})}
          />
          <RoundedButton
            width="60%"
            onPress={this._handleLoginAction.bind(this)}
            title="Войти"
          />
          <RoundedButton
            width="74%"
            onPress={() => navigate('RegisterScreen', {})}
            title="Зарегестрироваться"
          />
        </KeyboardAvoiding>
      </GradientBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  innerContainer:{
    flex: 1
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
)(LoginScreen);