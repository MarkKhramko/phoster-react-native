import React from 'react';
import { Alert, StyleSheet, Text, TextInput, Button, View , AsyncStorage } from 'react-native';
import { Actions } from '../actions/Actions'
import { connect } from 'react-redux'

class NewTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        title: '',
        body: '',
        done: false,
    };
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "aquamarine",
      elevation: null
    },
  };

  onBtnAddTask(e) {
    e.preventDefault();
    const { title , body , done } = this.state;
    const { dispatch } = this.props;
  
      AsyncStorage.getItem('token').then((response) => {
         console.log('tokeNN',response);
         if (title && body && response) {
          dispatch(Actions.addTask(response, title, body , done))
          .then(
            task => {
              let {navigate} = this.props.navigation
              dispatch(Actions.getTasks(response)).then(
                tasks => {
                  return navigate('NotesScreen', {})
              })
            }
          )} else 
          Alert.alert('Поля не могут быть пустыми')
      });
  }

  render() {
    console.log('PropsAddRequest', this.props.addRequest)
    console.log('PropsAddSucces', this.props.addSuccess)
    
    return (
      <View style={styles.container}>
        <Text style={styles.header}>NOTES</Text>
        <Text>Добавление заметки</Text>
        <TextInput
            style={styles.inputbox}
            placeholder="Название"
            onChangeText={(title) => this.setState({title})}
        />
        <TextInput
            style={styles.inputbox} 
            multiline = {true}
            placeholder="Что вы хотели записать?"
            onChangeText={(body) => this.setState({body})}
        />
        <View style={styles.buttonContainer}>
          <Button
            onPress={this.onBtnAddTask.bind(this)}
            title="Добавить заметку"
            color="#ce452d"
          />
        </View>
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
  const {addRequest, addSuccess } = state.tasks;

  return {
      addRequest,
      addSuccess
  };
}

const connectedNewTaskPage = connect(mapStateToProps)(NewTask);
export default connectedNewTaskPage;
