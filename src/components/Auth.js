import React from 'react';
import { connect } from 'react-redux'
import { Alert, StyleSheet, Text, TextInput, Button, View , AsyncStorage } from 'react-native';
import { Actions } from '../actions/Actions'
import { Service } from '../services/Service';



class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "aquamarine",
      elevation: null,
    },
  };

  onBtnAuth() {
    
    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (email && password) {
     dispatch(Actions.login(email, password))
     .then(
      task => {
        let {navigate} = this.props.navigation
        return navigate('NotesScreen', {})
      })
    } else {
      Alert.alert('Поля не могут быть пустыми')} 
  }
  
  render() {
    let {navigate} = this.props.navigation
    let {loggedIn}  = this.props
    console.log('logged', loggedIn)

    return (
      <View style={styles.container}>
        <Text style={styles.header}>NOTES</Text>
        <Text>Авторизация</Text>
        <TextInput
          style={styles.inputbox}
          placeholder="Email"
          onChangeText={(email) => this.setState({email})}
        />
        <TextInput
          style={styles.inputbox}
          placeholder="Пароль"
          secureTextEntry
          onChangeText={(password) => this.setState({password})}
        />
        <View style={styles.buttonContainer}>
          <Button
            onPress={this.onBtnAuth.bind(this)}
            title="Войти"
            color="#6383a8"
          />
        </View>
        <View style={{marginBottom: 1}}>
          <Button
            onPress={() => navigate('RegisterScreen', {})}
            title="Зарегестрироваться"
            color="#f1841e"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'aquamarine',
  },
  header: {
    color: '#f1841e',
    fontWeight: 'bold',
    fontSize: 30,
    paddingTop: 50,
    marginBottom: 110,
    shadowColor: '#f8983f',
  },
  inputbox: {
    padding: 5,
    width: 200,
  },
  buttonContainer: {
    marginTop: 7,
    marginBottom: 5,
  },
});

 
function mapStateToProps(state) {
 const { loggedIn, logout } = state.auth;
  return {
   loggedIn,
   logout
  };
}

const connectedLoginPage = connect(mapStateToProps)(Auth);
export default connectedLoginPage;