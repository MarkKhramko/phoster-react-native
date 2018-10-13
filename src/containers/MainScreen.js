import React from 'react';
import { 
  StyleSheet, 
  View, 
  AsyncStorage,
  FlatList,
  TouchableOpacity,
  Image,
  Text
} from 'react-native';
import { Actions } from '../actions/Actions'
import { connect } from 'react-redux'

import { Auth } from '../services/Auth'

import addImg from '../assets/add_photo.png'
import iconLogOut from '../assets/icon_logout.png'

console.ignoredYellowBox = ['Remote debugger', 'Debugger and device'];

class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
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
      ],
      refreshing: false
    }
  }

  componentDidMount() {
    this._fetchPhotos();
  }

  static navigationOptions = ({navigation}) => ({
    headerStyle: {
      backgroundColor: "#F79D33",
      borderBottomWidth: 0,
      elevation: null,
    },
    headerTintColor: '#fff',

    headerTitle: 'Лента',
    headerTitleStyle: { 
      color: 'white', 
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: 28
    },
    headerLeft: (
      <TouchableOpacity onPress={ ()=>{
        Auth.logout();
        const { navigate } = navigation;
        navigate('LoginScreen', {});
      } }>
        <Image source={iconLogOut} style={{width: 18, height: 20, marginLeft:22}}/>
      </TouchableOpacity>
    )
  })

  _fetchPhotos = () => {


    const { dispatch } = this.props;

    AsyncStorage.getItem('token').then((response) => {
      dispatch(Actions.getTasks(response))
      .then(
        tasks => {
          console.log(tasks, 'maybe tasks')
      this.state.data = this.props.tasks
      this.setState({refreshing: false})
      this.forceUpdate()
      })
    })
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

// _onRefresh() {
//   this.setState({refreshing: true});
//   this.componentDidMount()
// }
 
  render() {
    const { navigate } = this.props.navigation
    let data = this.state.data
    console.log('thisISData', data)

    return (
      <View style={styles.container}>
        <FlatList
          // refreshControl={
          //   <RefreshControl
          //     refreshing={this.state.refreshing}
          //     onRefresh={this._onRefresh.bind(this)}
          //   />
          // }
          data={data}
          renderItem={({item}) =>
            <View style={{ marginTop: 20}}>
              <TouchableOpacity onPress={() => { this.showImage(item.link, item.id) }}>
                <Image
                  style={{width: 320, height: 320, borderRadius: 10}}
                  source={{uri: item.link}}
                />
              </TouchableOpacity>
            </View> 
        }
        keyExtractor = {(item, index) => index.toString()}
        />
        <TouchableOpacity 
          onPress={ this._handleTakePhotoAction.bind(this) }
          style={styles.opacity}
        >
          <Image 
            style={styles.btn}
            source={addImg}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
  },
  btn:{
    width:80,
    height:80,
    borderRadius:30
  },
  opacity:{
    position: "absolute",
    bottom: 0
  }
});

function mapStateToProps(state) {
  const { photos } = state.photos;

  return {
    photos
  };
}

export default connect(mapStateToProps)(MainScreen);


