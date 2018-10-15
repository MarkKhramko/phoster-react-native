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
import { Auth } from '../../services/Auth';

import addPhotoImg from './add_photo.png';
import iconLogOut from './icon_logout.png';

console.ignoredYellowBox = ['Remote debugger', 'Debugger and device', "Possible", "Unhandled"];

class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isRefreshing: true,

      data: [
        { 
          link: "https://iso.500px.com/wp-content/uploads/2016/11/stock-photo-159533631-1500x1000.jpg",
          id: "0",
        },
        {
          link: "https://wpp.azureedge.net/sites/default/files/styles/gallery_main_image/public/hviofv7y64ywr2sk1ju5.jpg?itok=915b_CWI",
          id: "1",
        },
        {
          link: "https://icdn3.digitaltrends.com/image/photographer-ted-hesser-viral-eclipse-photo-of-the-century.jpg",
          id: "2",
        }
      ]
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
    this._fetchPhotos();
  }

  static navigationOptions = ({navigation}) => ({
    headerStyle: {
      backgroundColor: "#FF4335",
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

  _fetchPhotos(){

  }

  _handleTakePhotoAction(){
    const { navigate } = this.props.navigation
    navigate('TakePhotoScreen');
  }

  showImage = (link, id) => {
    const { dispatch } = this.props;
    let {navigate} = this.props.navigation
    
    dispatch(Actions.showSelectImage(link, id))
    return navigate('ShowPhotoScreen',)
  }

  _handleRefresh() {
    const isRefreshing = true;
    this.setState({ isRefreshing });
  }

  _handleFetchMore(){
    const isFetching = true;
    this.setState({ isFetching });
  }

  /* Render */
  _renderFeedPhoto(photoData){

    const photoId = photoData.id;
    const uri = photoData.link;

    return(
      <View style={ styles.imageContainer }>
        <TouchableOpacity onPress={ () => { this.showImage(uri, photoId) } }>
          <Image
            style={ styles.image } 
            source={ { uri } }
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
      data
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
          data={data}
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