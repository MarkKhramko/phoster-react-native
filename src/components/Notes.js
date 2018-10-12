import React from 'react';
import { Alert, StyleSheet, Text, TextInput, Button, View , AsyncStorage, FlatList, CheckBox, RefreshControl, TouchableOpacity } from 'react-native';
import { Actions } from '../actions/Actions'
import { connect } from 'react-redux'

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
            link: "https://iso.500px.com/wp-content/uploads/2016/11/stock-photo-159533631-1500x1000.jpg",
            id: "1",
          }],
          refreshing: false
          }       
    }

    componentDidMount() {
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

  static navigationOptions = {
    headerTitle: 'Мои заметки',
    headerStyle: {
      backgroundColor: "crimson"
    },
    headerTitleStyle: { 
      color: 'white', 
      alignSelf: 'center',
      textAlign: 'center'
    }
  };

  btnAddNewTask(){
    let {navigate} = this.props.navigation
    return navigate('NewTaskScreen', {})
  }

 editTask = (title, body, done, id) => {
    const { dispatch } = this.props;
    let {navigate} = this.props.navigation

    dispatch(Actions.editSelectTask(title, body, done, id))
    return navigate('EditTaskScreen',)
}

_onRefresh() {
  this.setState({refreshing: true});
  this.componentDidMount()
}
 
  render() {
    let data = this.state.data
    console.log('thisISData', data)
    console.log(data)

    /* const {params} = this.props.navigation.state.params
    console.log(params)
    if (data !== params){
      this.componentDidMount()
    } */

    return (
      <View style={styles.container}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          data={data}
          renderItem={({item}) =>
            <View>
              <View style={{flexDirection: "row"}}>
                <Text style={styles.title}>{item.title} </Text>
                  <CheckBox style={{marginLeft: 70}}
                    value={item.done}
                    onChange={this.pushCheckbox.bind(this, item.title, item.body, item.done, item.id)}
                  />
               </View>   
              <Text style={styles.body}>{item.body} </Text>

            <View style={{flexDirection: "row"}}>
            <View>
        </View>
        <View style={{marginLeft: 30 , marginBottom: 30}}>
        </View>
        </View>
        </View> 
        }
        keyExtractor = {(item, index) => index.toString()}
        />
        <TouchableOpacity style={styles.btn}
          onPress={this.btnAddNewTask.bind(this)}>
          <Text style={styles.plus}>+</Text>
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
  title:{
    fontWeight: "800",
    fontSize: 18,
    color: 'black',
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
    position:'absolute',
    width:60,height:60,
    backgroundColor:'green',
    borderRadius:30,
    bottom:10,right:10,
    alignItems:'center',
    justifyContent:'center'
  },
  plus:{
    color:'white',
    fontSize:25
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


