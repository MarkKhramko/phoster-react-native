import React from 'react';
import { StyleSheet, Text, View , TouchableOpacity, Image, Form } from 'react-native';
import { Camera, Permissions } from 'expo';
import { connect } from 'react-redux'
import flip from '../assets/flip_camera.png'
import flash from '../assets/flash_enable.png'
import photo from '../assets/take_photo.png'

class TakePhoto extends React.Component {
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
      backgroundColor: "#FC4A1A"
    },
    headerTitleStyle: { 
      color: 'white', 
      alignSelf: 'center',
      textAlign: 'center',
      marginLeft: 85,
      fontSize: 28
    }
  })

  takePicture = () => {
    if (this.camera) {
        this.camera.takePictureAsync()
            .then(data => this.props.navigation.goBack())
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    let { type, flashMode} = this;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ height: 360 }} {...{type, flashMode}}>
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
              flex: 1,
              right: 0,
              left: 0,
              bottom: 0,
              position: 'absolute',
              alignItems: 'center',
              paddingBottom: 17
            }}
            onPress={() => { this.takePicture }}>
            <Image
              style={{width: 160, height: 160}}
              source={photo}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              left: 0,
              bottom: 0,
              position: 'absolute',
              alignItems: 'center',
              paddingBottom: 36
            }}
            onPress={() => {
              this.setState({
                type: this.state.type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back,
              });
            }}>
            <Image
              style={{width: 100, height: 100}}
              source={flash}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              right: 0,
              bottom: 0,
              position: 'absolute',
              alignItems: 'center',
              paddingBottom: 36
            }}
            onPress={() => {
              this.setState({
                type: this.state.type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back,
              });
            }}>
            <Image
              style={{width: 100, height: 100}}
              source={flip}
            />
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
  const {addRequest, addSuccess } = state.photos;

  return {
      addRequest,
      addSuccess
  };
}

const connectedTakePhoto = connect(mapStateToProps)(TakePhoto);
export default connectedTakePhoto;
