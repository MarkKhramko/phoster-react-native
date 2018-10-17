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
  Location,
  Permissions
} from 'expo';
import flip from './flip_camera.png'
import flash from './flash_enable.png'
import photo from './take_photo.png'

class TakePhotoScreen extends React.Component {

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

  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: false,
      hasLocationPermission: false,
      cameraType: Camera.Constants.Type.back,
      flashMode: Camera.Constants.FlashMode.off
    };
  }

  async componentWillMount() {
    const cameraPermissions = await Permissions.askAsync(Permissions.CAMERA);
    const locationPermissions = await Permissions.askAsync(Permissions.LOCATION);

    const hasCameraPermission = cameraPermissions.status === 'granted';
    const hasLocationPermission = locationPermissions.status === 'granted';
    this.setState({
      hasCameraPermission,
      hasLocationPermission
    });
  }

  async _takePicture(){
    const{ hasLocationPermission }=this.state;
    const cam = this.camera;

    if (!!cam) {

      let location = null;
      if(hasLocationPermission){
        location = await Location.getCurrentPositionAsync({enableHighAccuracy: false});
      }

      console.log({location1:location});

      cam.takePictureAsync()
      .then((data) => this._processPhoto(data, location))
      .catch((err)=> console.error(err));
    }
  }

  _processPhoto(photoData, location){
    const{
      photosActions,
      navigation
    }=this.props;

    console.log({location2:location});

    let data = {...photoData };

    if(location !== null){
      data = {
        ...data,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      };
    }

    photosActions.setPhotoToSend(data);
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
    }=this.state;

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