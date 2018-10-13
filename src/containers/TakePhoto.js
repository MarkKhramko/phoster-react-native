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
    headerStyle: {
      backgroundColor: "#F79D33",
      borderBottomWidth: 0,
      elevation: null,
    },
    headerTintColor: '#fff',

    headerTitle: 'Фото',
    headerTitleStyle: { 
      color: 'white', 
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: 28
    }
  })

  _takePicture = () => {
    console.log('Check');
    if (this.camera) {
      this.camera
      .takePictureAsync()
      .then((data) =>{
        console.log({data});
        this.props.navigation.goBack()
      });
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    let { type, flashMode} = this;

    if (hasCameraPermission === null) {
      return <View />;
    } 
    else if (hasCameraPermission === false) {
      return <Text>Разрешите доступ к камере в настройках телефона.</Text>;
    } 
    else {
      return (
        <View style={ styles.container }>
          <Camera 
            style={ styles.camera }
            {...{type, flashMode}}
            ref={(cam)=>{ this.camera = cam; }}
          >
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
            onPress={() => { this._takePicture() }}>
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
    flex: 1
  },

  camera: { 
    height: 360 
  }
});

function mapStateToProps(state) {
  const {addRequest, addSuccess } = state.photos;

  return {
    addRequest,
    addSuccess
  };
}

export default connect(mapStateToProps)(TakePhoto);
