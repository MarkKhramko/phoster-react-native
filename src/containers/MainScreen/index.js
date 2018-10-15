import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
  FlatList,
  Image,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Auth from '../../services/Auth';
import Photos from '../../services/Photos';

import addPhotoImg from './add_photo.png';
import iconLogOut from './icon_logout.png';

console.ignoredYellowBox = ['Remote debugger', 'Debugger and device', "Possible", "Unhandled"];

class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isRefreshing: false,
      lastPhotoDate: new Date(),
      photos:[]
    }
  }

  componentWillMount(){
    const token = Auth.getToken();
    if(!token){
      const { navigate } = this.props.navigation;
      navigate('LoginScreen', {});
    }
  }

  componentDidMount() {
    const{ photos }=this.state;
    if(photos.length === 0){
      this._fetchPhotos();
    }
  }

  static navigationOptions = ({navigation}) => ({
    headerStyle: {
      backgroundColor: "#FC4A1A",
      borderBottomWidth: 0
    },
    headerTintColor: '#fff',
    headerTitle: 'Phoster',
    headerTitleStyle: { 
      color: 'white', 
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: 28
    },
    headerLeft: (
      <TouchableOpacity 
        onPress={ async ()=>{
          const didLogout = await Auth.logout();
          if(didLogout){
            const { navigate } = navigation;
            navigate('LoginScreen', {});
          }
        }}>
        <Image source={iconLogOut} style={{width: 18, height: 20, marginLeft:22}}/>
      </TouchableOpacity>
    )
  })

  /* Network */
  _fetchPhotos(){
    const{
      lastPhotoDate
    }=this.state;

    Photos.getPhotos(lastPhotoDate)
    .then((res)=>{
      if(res.data.photos){
        const isRefreshing = false;
        const photos = res.data.photos;
        this.setState({ isRefreshing, photos });
      }
    })
    .catch((err)=> console.log(err));

    const isRefreshing = true;
    this.setState({isRefreshing});
  }

  /* Interactions */
  _handleTakePhotoAction(){
    const { navigate } = this.props.navigation
    navigate('TakePhotoScreen');
  }

  _handlePhotoTap = (photoData) => {
    const { navigate } = this.props.navigation
    
    // pass photoData

    return navigate('ShowPhotoScreen');
  }

  _handleRefresh() {
    this._fetchPhotos();
  }

  _handleFetchMore(){
    const isFetching = true;
    this.setState({ isFetching });
  }

  /* Render */
  _renderFeedPhoto(photoData){

    const photoId = photoData.id;
    const uri = photoData.url;

    return(
      <View style={ styles.imageContainer }>
        <TouchableOpacity onPress={ () => { this._handlePhotoTap(photoData) } }>
          <Image
            source={ { uri } }
            style={ styles.image }
          />
        </TouchableOpacity>
      </View>
    );
  }

  _renderPhotoButton(){
    return(
      <TouchableOpacity 
        onPress={ this._handleTakePhotoAction.bind(this) }
        style={ styles.addPhotoBtn }
      >
        <Image 
          style={ styles.addPhotoIcon }
          source={ addPhotoImg }
        />
      </TouchableOpacity>
    );
  }
 
  render() {
    const { navigate } = this.props.navigation
    const{
      isRefreshing,
      photos
    }=this.state;

    return (
      <View style={ styles.container }>
        <StatusBar
          barStyle="light-content"
        />
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={ isRefreshing }
              onRefresh={ this._handleRefresh.bind(this) }
            />
          }
          data={ photos }
          renderItem={ ({item}) => this._renderFeedPhoto(item) }
          keyExtractor = { (item, index) => index.toString() }
          style={ styles.flatList }
        />
        { this._renderPhotoButton() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  flatList:{
    width: '100%',
  },
  imageContainer:{
    flex: 1,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    shadowOpacity: 0.35,
    shadowRadius: 12
  },
  image:{
    width: 280,
    height: 280,
    borderRadius: 4
  },

  addPhotoBtn:{
    position: "absolute",
    bottom: 0
  },
  addPhotoIcon:{
    width:80,
    height:80,
    borderRadius:30
  }
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreen);