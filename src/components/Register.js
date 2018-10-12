import React from 'react';
import { connect } from 'react-redux'
import { Alert, StyleSheet, Text, TextInput, Button, View } from 'react-native';
import { Actions } from '../actions/Actions'

class Register extends React.Component {
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
      elevation: null
    },
  };

  onBtnRegister() {
    let {navigate} = this.props.navigation
    const { email, password } = this.state;
    console.log(email, password); 
    if (email && password) {
       Actions.register(email, password)
       .then(
        user => {
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
    //console.log(this.props.registeredSuccess)

    //if (this.props.registeredSuccess){
      //return navigate('AuthScreen', {}) 
    //}

    let {navigate} = this.props.navigation
    return (
      <View style={styles.container}>
        <Text style={styles.header}>NOTES</Text>
        <Text>Регистрация</Text>
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
            onPress={this.onBtnRegister.bind(this)}
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
  const { registeredSuccess} = state.register;

  return {
      registeredSuccess,
  };
}

const connectedRegisterPage = connect(mapStateToProps)(Register);
export default connectedRegisterPage;
