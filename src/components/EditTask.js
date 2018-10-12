import React from 'react';
import { connect } from 'react-redux'
import { Alert, StyleSheet, Text, TextInput, Button, View , AsyncStorage } from 'react-native';
import { Actions } from '../actions/Actions'
import UndoRedo from '../containers/UndoRedo'
import { HeaderBackButton } from 'react-navigation'
import { ActionCreators as UndoActionCreators } from 'redux-undo';

class EditTask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        title: this.props.title,
        body: this.props.body,
        done: this.props.done,
        id: this.props.id,
        taskChanged: false,
    };
  }

  componentDidMount(){
    this.props.navigation.setParams({ isBack: this.onBackBtnClick });
  }


  static navigationOptions = ({navigation}) => ({
    headerLeft: (<HeaderBackButton onPress={navigation.getParam('isBack')}/>),
    headerStyle: {
      backgroundColor: "aquamarine",
      elevation: null
    },
  });

  changeTaskTitle = (title) => {
    const { dispatch } = this.props;

    dispatch(Actions.changeTaskTitle(title))
    this.state.taskChanged = true;
  }

  changeTaskBody = (body) => {
    const { dispatch } = this.props;

    dispatch(Actions.changeTaskBody(body)) 
    this.state.taskChanged = true;
  }


  onBtnSaveTask() {
    let { title, body, id, done } = this.props
    const { dispatch } = this.props;
  
    console.log(title, body, id, done , 'PROPS SAVE TASK')
      AsyncStorage.getItem('token').then((response) => {
        Actions.editTask(title, body, id, done, response)
        .then(
            task => {
              let {navigate} = this.props.navigation
              dispatch(Actions.getTasks(response)).then(
                tasks => {
                  //UndoActionCreators.clearHistory()
                  return navigate('NotesScreen', {})
              })
          })
      });
  }

  onBackBtnClick = () =>{
    let {navigate} = this.props.navigation
  
    if (this.state.taskChanged){
      Alert.alert(
        'Сохранить изменения?',
        '',
        [
          {text: 'Cancel', onPress: () => navigate('NotesScreen'), style: 'cancel'},
          {text: 'OK', onPress: () => this.onBtnSaveTask()},
        ],
        { cancelable: false }
      )
    } else {
      return navigate('NotesScreen')
    }  
  }  

  render() {
    let { title, body, id, done } = this.props

    return (
      <View style={styles.container}>
        <Text style={styles.header}>NOTES</Text>
        <Text>Редактирование заметки</Text>
        <TextInput
            style={styles.inputbox}
            placeholder="Название"
            defaultValue= {title}
            onChangeText={(title) => this.changeTaskTitle(title)}
        />
        <TextInput
            style={styles.inputbox} 
            multiline = {true}
            defaultValue= {body}
            placeholder="Что вы хотели записать?"
            onChangeText={(body) => this.changeTaskBody(body)}
        />
        <View style={styles.buttonContainer}>
          <Button
            onPress={this.onBtnSaveTask.bind(this)}
            title="Cохранить"
            color="coral"
          />
        </View>
        <UndoRedo />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'aquamarine',
  },
  header: {
    color: '#f1841e',
    fontWeight: 'bold',
    fontSize: 30,
    paddingTop: 50,
    marginBottom: 110,
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
});

function mapStateToProps(state) {
  const { title, body, id, done } = state.tasks;
  return {
    title,
    body,
    id,
    done
  };
}

const connectedEditTask = connect(mapStateToProps)(EditTask);
export default connectedEditTask;
