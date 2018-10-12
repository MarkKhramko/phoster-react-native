import React from 'react';
import { StyleSheet, Text, View , AsyncStorage, FlatList, TouchableOpacity, Image, ImageBackground, Icon } from 'react-native';
import { Actions } from '../actions/Actions'
import { connect } from 'react-redux'
import { HeaderBackButton } from 'react-navigation'
import addImg from '../assets/add_photo.png'
import iconLogOut from '../assets/icon_logout.png'

console.ignoredYellowBox = ['Remote debugger'];

class Notes extends React.Component {
  constructor(props) {
      super(props);
      
      this.state = {
        data: [{ 
          link: "https://iso.500px.com/wp-content/uploads/2016/11/stock-photo-159533631-1500x1000.jpg",
          id: "0",
        },
        {
          link: "https://facebook.github.io/react-native/docs/assets/favicon.png",
          id: "1",
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
      backgroundColor: "crimson"
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

  btnAddNewTask(){
    let {navigate} = this.props.navigation
    return navigate('NewTaskScreen', {})
  }

showImage = (link, id) => {
  const { dispatch } = this.props;
  let {navigate} = this.props.navigation
  
  dispatch(Actions.showSelectImage(link, id))
  return navigate('EditTaskScreen',)
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
        <TouchableOpacity style={styles.opaciti} onPress={() => { navigate('NewTaskScreen',)}}>
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
  header: {
    color: '#f1841e',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 10,
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
  MainContainer: {
    flex: 1,
    margin: 10
  },
  TextStyle:{
    fontSize : 25,
    textAlign: 'center'
  },
  body:{
    fontWeight: "200",
    fontSize: 14,
    padding: 30,
    backgroundColor: 'white',
    marginBottom: 5,
    color: 'black'
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
  const { tasks } = state.tasks;

  return {
    tasks
  };
}

const connectedNotesPage = connect(mapStateToProps)(Notes);
export default connectedNotesPage;


