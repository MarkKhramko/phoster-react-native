import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PhotosActions from '../../actions/photos';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { 
  Camera,
  Permissions
} from 'expo';
import flip from './flip_camera.png'
import flash from './flash_enable.png'
import photo from './take_photo.png'

class TakePhotoScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: false,
      cameraType: Camera.Constants.Type.back,
      flashMode: Camera.Constants.FlashMode.off
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  static navigationOptions = ({navigation}) => ({
    headerStyle: {
      backgroundColor: "#FC4A1A",
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

  _takePicture(){
    const cam = this.camera;
    console.log('Check');

    if(!!cam) {
      cam.takePictureAsync()
      .then((data) => this._processPhoto(data))
      .catch((err)=> console.error(err));
    }
  }

  _processPhoto(photoData){
    const{
      photosActions,
      navigation
    }=this.props;

    photosActions.setPhotoToSend(photoData);

    navigation.navigate('PreviewPhotoScreen');
  }

  _handleFlashAction(){
    const flashMode = this.state.flashMode === Camera.Constants.FlashMode.off
                  ? Camera.Constants.FlashMode.torch
                  : Camera.Constants.FlashMode.off;
    this.setState({ flashMode });
  }

  _handleFlipAction(){
    const cameraType = this.state.cameraType === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back;
    this.setState({ cameraType });
  }

  render() {
    const { 
      hasCameraPermission,
      cameraType,
      flashMode
    } = this.state;

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
            ref={(cam)=>{ this.camera = cam; }}
            cameraType={ cameraType }
            flashMode={ flashMode }
            style={ styles.camera }
          />
          <TouchableOpacity
            style={ styles.btnTakePhotoScreen }
            onPress={ this._takePicture.bind(this) }>
            <Image
              style={ styles.takePhotoIcon }
              source={photo}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={ styles.btnFlash }
            onPress={ this._handleFlashAction.bind(this) }>
            <Image
              style={ styles.flashIcon }
              source={flash}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={ styles.btnFlip }
            onPress={ this._handleFlipAction.bind(this) }>
            <Image
              style={ styles.flipIcon }
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
  },

  btnTakePhotoScreen:{
    flex: 1,
    right: 0,
    left: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    paddingBottom: 17
  },
  takePhotoIcon:{
    width: 160,
    height: 160
  },

  btnFlash:{
    flex: 1,
    left: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    paddingBottom: 36
  },
  flashIcon:{
    width: 100,
    height: 100
  },

  btnFlip:{
    flex: 1,
    right: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    paddingBottom: 36
  },
  flipIcon:{
    width: 100,
    height: 100
  }
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    photosActions: bindActionCreators(PhotosActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TakePhotoScreen);