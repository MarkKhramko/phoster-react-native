import React from 'react';
import { StyleSheet, View , AsyncStorage, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import { Actions } from '../actions/Actions'
import { connect } from 'react-redux'
import addImg from '../assets/add_photo.png'
import iconLogOut from '../assets/icon_logout.png'

console.ignoredYellowBox = ['Remote debugger', 'Debugger and device'];

class MainScreen extends React.Component {
  constructor(props) {
      super(props);
      
      this.state = {
        data: [{ 
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
        }],
        refreshing: false
        }       
  }

  componentDidMount() {
    this.props.navigation.setParams({ isBack: this.onBackBtnClick });
    this.getPhotos();
  }

  getPhotos = () => {
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

  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Лента',
    headerStyle: {
      backgroundColor: "#FC4A1A"
    },
    headerTitleStyle: { 
      color: 'white', 
      alignSelf: 'center',
      textAlign: 'center',
      marginLeft: 85,
      fontSize: 28
    },
    headerLeft: (<Image source={iconLogOut} style={{width: 18, height: 20, marginLeft:22}}/>),
    
  })

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
        <TouchableOpacity style={styles.opaciti} onPress={() => { navigate('TakePhotoScreen',)}}>
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
  opaciti:{
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

const connectedMainScreen = connect(mapStateToProps)(MainScreen);
export default connectedMainScreen;


