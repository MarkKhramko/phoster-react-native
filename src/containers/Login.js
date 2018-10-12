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
import { Actions } from '../actions/Actions'
import { Service } from '../services/Service'

import RoundedButton from '../components/RoundedButton'


class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      password: '',
    };
  }

  static navigationOptions = {
    header: null,
    elevation: null
  };

  _handleLoginAction() {
    let {navigate} = this.props.navigation
    return navigate('MainScreen', {})
    const { nickname, password } = this.state;
    const { dispatch } = this.props;

    if (nickname && password) {
      dispatch(Actions.login(nickname, password))
      .then(task => {
        let {navigate} = this.props.navigation
        return navigate('NotesScreen', {})
      })
    } else {
      Alert.alert('Поля не могут быть пустыми')} 
  }
  
  render() {
    const {navigate} = this.props.navigation;
    const {loggedIn}  = this.props;

    return (
      <View style={styles.container}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#E91926'
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

export default connect(mapStateToProps)(Login);