import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Actions } from '../actions/Actions'
import { Text, View, Button, AsyncStorage } from 'react-native';

class CustomNavigator extends Component {
    constructor(props) {
        super(props);
      }

    onBtnExit = () => {
        const {dispatch} = this.props
        dispatch(Actions.logout())
        let {navigate} = this.props.navigation
        return navigate('AuthScreen', {})
    }

  render () {

    return (
        <View style={{ marginTop: 100, marginRight: 10, marginLeft:10 }}>
            <View style= {{ alignItems: 'center', justifyContent: 'center', marginBottom: 10}}>
                <Text style={{ color: 'black', fontSize: 20 }}>Hello {this.props.email} </Text>
            </View>
            <Button
                onPress={this.onBtnExit.bind(this)}
                title="Выйти"
                color="#6383a8"
                disabled={this.props.email == ''}
            />
        </View>
    );
  }
}

function mapStateToProps(state) {
    const { loggedIn, logout, email } = state.auth;
    const { addSuccess } = state.tasks
    console.log(loggedIn, 'loggedIn')
    console.log(logout, 'logout')
    console.log(email, 'email')
  
     return {
      logout,
      loggedIn,
      addSuccess,
      email
     };
   }
  
connectCustomNavigator = connect(mapStateToProps)(CustomNavigator)

export default connectCustomNavigator;