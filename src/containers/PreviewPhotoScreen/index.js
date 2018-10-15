import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PhotosActions from '../../actions/photos';
import {
  Image,
  StyleSheet,
  View
} from 'react-native';
import BrightButton from '../../components/BrightButton';
import PhotosService from '../../services/Photos';

class PreviewPhotoScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  static navigationOptions = ({navigation}) => ({
    headerStyle: {
      backgroundColor: "#FC4A1A",
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

  _handleSendAction(){
    const{ photoToSend }=this.props;

    PhotosService.sendPhoto(photoToSend)
    .then((res)=>{
      console.log({
        res, 
        data:res.data,
        body:res.body
      });

      const isLoading = false;
      this.setState({ isLoading });
    })
    .catch((err)=> console.log(err));

    const isLoading = true;
    this.setState({isLoading});
  }

  render() {
    const{
      photoToSend
    }=this.props;

    const source = {
      isStatic:true,
      uri:photoToSend.uri
    };

    return(
      <View style={ styles.container }>
        <Image
          source={ source }
          style={ styles.preview }
        />
        <BrightButton
          width="74%"
          onPress={this._handleSendAction.bind(this)}
          title="Отправить"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },

  preview: { 
    width: '100%',
    height: 360
  },
});

function mapStateToProps(state) {
  return {
    photoToSend: state.photos.photoToSend
  };
}

function mapDispatchToProps(dispatch) {
  return {
    photosActions: bindActionCreators(PhotosActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreviewPhotoScreen);