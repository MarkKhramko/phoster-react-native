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
    let { like } = this.state.like
    console.log("123")
    if (this.state.like == true) {
      this.setState({ like, like: false })
    }
    else
      this.setState({ like, like: true })
  }

  _renderMapView(){
    const initialRegion = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.1522,
      longitudeDelta: 0.0521,
    };

    const coordinate = {
      latitude: 38.73538,
      longitude: -122.4324
    };

    return(
      <MapView
        style={ styles.mapView }
        initialRegion={ initialRegion }
      >
        <MapView.Marker
          coordinate={ coordinate }
          title={ "Маркер" }
          description={ "Место снимка" }
        />
      </MapView>
    );
  }
  
  _renderLikeButton(){
    const{
      isLiked
    }=this.state;

    return(
      <TouchableOpacity 
        style={ styles.btn }
        onPress={() => { this._handleLikeAction() }}
      >
        <Image 
          style={ styles.icon }
          source={ this.state.like === true ? like_enable : like_disable }
        />
      </TouchableOpacity>
    );
  }

  render() {
    const{ 
      chosenPhoto
    }=this.props

    const uri = chosenPhoto.url;

    return (
      <View style={ styles.container }>
        <View style={ styles.innerContainer }>
          <TouchableOpacity onPress={() => { console.log("dasd") }}>
            <Image
              style={ styles.imagePreview }
              source={ {uri} }
            />
          </TouchableOpacity>
          <View style={ styles.line }/>
          { this._renderMapView() }
          { this._renderLikeButton() } 
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