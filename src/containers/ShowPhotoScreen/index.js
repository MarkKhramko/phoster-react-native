import React from 'react';
import { connect } from 'react-redux';
import { 
  Image,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import { 
  MapView 
} from 'expo';
import like_disable from './like_disable.png';
import like_enable from './like_enable.png';

class ShowPhotoScreen extends React.Component {

  static navigationOptions = ({navigation}) => ({
     headerTransparent: true,
     headerBackTitle: null,
     headerTintColor: '#fff'
  });

  constructor(props) {
    super(props);

    this.state = {
      isLiked: props.chosenPhoto.isLiked
    };
  }

  _handleLikeAction(){
    let { isLiked } = this.state;
    isLiked = !isLiked;
    this.setState({ isLiked });
  }

  _renderMapView(coords){
    const latitude = coords.latitude;
    const longitude = coords.longitude;
    const hasCoordinates = latitude !== null && longitude !== null;

    const initialRegion = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.1522,
      longitudeDelta: 0.0521,
    };

    const coordinate = {
      latitude: coords.latitude,
      longitude: coords.longitude
    };

    return(
      <MapView
        style={ styles.mapView }
        initialRegion={ hasCoordinates ? initialRegion : null }
      >
        { hasCoordinates ? 
          <MapView.Marker
            coordinate={ coordinate }
            title={ "Маркер" }
            description={ "Место снимка" }
          />
          : 
          ""
        }
      </MapView>
    );
  }
  
  _renderLikeButton(isLiked){
    return(
      <TouchableOpacity 
        style={ styles.btn }
        onPress={ () => { this._handleLikeAction() } }
      >
        <Image 
          style={ styles.icon }
          source={ this.state.isLiked === true ? like_enable : like_disable }
        />
      </TouchableOpacity>
    );
  }

  render() {
    const{ 
      chosenPhoto
    }=this.props;
    const{
      isLiked
    }=this.state;

    const uri = chosenPhoto.url;
    const coords = {
      latitude: chosenPhoto.latitude,
      longitude: chosenPhoto.longitude
    };

    return (
      <View style={ styles.container }>
        <View style={ styles.innerContainer }>
          <TouchableOpacity onPress={() => {}}>
            <Image
              style={ styles.imagePreview }
              source={ {uri} }
            />
          </TouchableOpacity>
          <View style={ styles.line }/>
          { this._renderMapView(coords) }
          { this._renderLikeButton(isLiked) } 
        </View> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FC4A1A',
  },
  innerContainer:{
    paddingTop: 20
  },
  imagePreview:{
    width: 360,
    height: 360
  },
  line: {
    borderBottomColor: '#E91926',
    borderBottomWidth: 2
  },
  mapView:{
    flex: 1
  },
  btn:{
    position: "absolute",
    bottom: 0,
    marginLeft: 140
  },
  icon:{
    width:80,
    height:80,
    borderRadius:30
  },
});

function mapStateToProps(state) {
  return {
    chosenPhoto: state.photos.chosenPhoto
  };
}

export default connect(
  mapStateToProps
)(ShowPhotoScreen);