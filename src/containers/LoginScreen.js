import React from 'react'
import { connect } from 'react-redux'
import { 
  Alert,
  Flatlist,
  StyleSheet,
  Text,
  TextInput,
  View,
  AsyncStorage
} from 'react-native'
import { LinearGradient } from 'expo'

import { Auth } from '../services/Auth'

import GradientBackground from '../components/GradientBackground'
import RoundedButton from '../components/RoundedButton'


class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      password: ''
    };
  }

  componentWillMount(){
    const token = Auth.getToken();
    if(!!token){
      const { navigate } = this.props.navigation;
      navigate('MainScreen', {});
    }
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#F79D33",
      borderBottomWidth: 0,
      elevation: null,
    },
    headerTintColor: '#fff'
  };

  _handleLoginAction() {
    const { nickname, password } = this.state;
    const { navigate } = this.props.navigation;

    if(!!nickname && !!password) {
      console.log("Авторизую", nickname, password);
      Auth
      .login(nickname, password)
      .then((response)=>{
        console.log(response);
        if(!!response.data.token){
          
          navigate('MainScreen', {})
        }
      })
      .catch((error)=>{
        console.log(error);
        Alert.alert('Введен неправильный пароль или ник!')
      });
    } else {
      Alert.alert('Заполните телефон и пароль');
    }
  }
  
  render() {
    const {navigate} = this.props.navigation;

    return (
      <GradientBackground style={styles.container}>
        <Text style={styles.hintTitle}>
          Для входа необходимо ввести ваш сотовый телефон.
        </Text>
        <TextInput
          style={styles.inputField}
          underlineColorAndroid='transparent'
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
          width="60%"
          onPress={this._handleLoginAction.bind(this)}
          title="Войти"
        />

        <RoundedButton
          width="74%"
          onPress={() => navigate('RegisterScreen', {})}
          title="Зарегестрироваться"
        />
      </GradientBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
 const { loggedIn, logout } = state.auth;
  return {
   loggedIn,
   logout
  };
}

export default connect(mapStateToProps)(LoginScreen);