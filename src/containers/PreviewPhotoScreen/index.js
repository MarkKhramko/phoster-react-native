import React from 'react';
import { connect } from 'react-redux';
import {
  Image,
  StyleSheet,
  View
} from 'react-native';

class PreviewPhotoScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static navigationOptions = ({navigation}) => ({
    headerStyle: {
      backgroundColor: "#FF4335",
      borderBottomWidth: 0,
      elevation: null,
    },
    headerTintColor: '#fff',

    headerTitle: 'Просмотр',
    headerTitleStyle: { 
      color: 'white', 
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: 28
    }
  })

  handleSave(){
    console.log('Save');
  }

  render() {
    <View style={ styles.container }>
      <Image
        style={ styles.preview }
      />

    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  preview: { 
    height: 360 
  },
});

function mapStateToProps(state) {
  const{
    addRequest,
    addSuccess
  }=state.photos;

  return {
    addRequest,
    addSuccess
  };
}

export default connect(mapStateToProps)(PreviewPhotoScreen);