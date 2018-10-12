import React from 'react';
import { connect } from 'react-redux'
import { 
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { HeaderBackButton } from "react-navigation"
import { Actions } from '../actions/Actions'

import RoundedButton from '../components/RoundedButton'

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      password: '',
    };
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#E91926",
      borderBottomWidth: 0,
      elevation: null,
    },
    headerTintColor: '#ffffff'
  };

  _handleRegisterAction() {
    let {navigate} = this.props.navigation
    const { nick, password } = this.state;
    console.log(nick, password); 

    if (nick && password) {
       Actions.register(nick, password)
       .then(user => {
            if (typeof (user) !== 'undefined') {
              let {navigate} = this.props.navigation
              return navigate('AuthScreen', {})
            }
        }
    );
    } else
      Alert.alert('Поля не могут быть пустыми')
  }

  render() {
    const {navigate} = this.props.navigation;
    const {loggedIn}  = this.props;

    return (
      <View style={styles.container}>
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
  const { registeredSuccess} = state.register;

  return {
      registeredSuccess,
  };
}

export default connect(mapStateToProps)(Register);
