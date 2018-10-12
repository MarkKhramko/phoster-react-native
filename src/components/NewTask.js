import React from 'react';
import { Alert, StyleSheet, Text, TextInput, Button, View , TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import { connect } from 'react-redux'

class NewTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Фото',
    headerStyle: {
      backgroundColor: "crimson"
    },
    headerTitleStyle: { 
      color: 'white', 
      alignSelf: 'center',
      textAlign: 'center',
      marginLeft: 85,
      fontSize: 28
    }
  })

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ height: 360 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
            </View>
          </Camera>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              this.setState({
                type: this.state.type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back,
              });
            }}>
            <Text
              style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
              {' '}Flip{' '}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
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
  const {addRequest, addSuccess } = state.tasks;

  return {
      addRequest,
      addSuccess
  };
}

const connectedNewTaskPage = connect(mapStateToProps)(NewTask);
export default connectedNewTaskPage;
