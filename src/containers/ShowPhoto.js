import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import { MapView } from 'expo';
import like_disable from '../assets/like_disable.png'
import like_enable from '../assets/like_enable.png'

class ShowPhoto extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      like: false
    };
  }

  static navigationOptions = ({navigation}) => ({
    title:"showImage",
    header: null
  });

  pushLike = () => {
    let { like } = this.state.like
    console.log("123")
    if (this.state.like == true) {
      this.setState({ like, like: false })
    }
    else
      this.setState({ like, like: true })
  }
  

  render() {
    let { link, id } = this.props
    console.log(id, link)
    console.log(this.state.like)

    return (
      <View style={styles.container}>
        <View style={{}}>
          <TouchableOpacity onPress={() => { console.log("dasd") }}>
            <Image
              style={{width: 360, height: 360}}
              source={{uri: link}}
            />
          </TouchableOpacity>
          <View style={styles.line}/>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.1522,
              longitudeDelta: 0.0521,
            }}
          >
            <MapView.Marker
              coordinate={{latitude: 38.73538,
              longitude: -122.4324,}}
              title={"Маркер"}
              description={"Место снимка"}
            />
          </MapView>
          <TouchableOpacity style={styles.opaciti} onPress={() => { this.pushLike() }}>
            {this.state.like == true  && (
              <Image 
              style={styles.btn}
              source={like_enable}
            />
            )}
            {this.state.like == false && (
              <Image 
              style={styles.btn}
              source={like_disable} 
            />
            )}
            
          </TouchableOpacity>  
      </View> 
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
    paddingTop: 50,
    marginBottom: 110,
    shadowColor: '#f8983f',
  },
  line: {
    borderBottomColor: '#E91926',
    borderBottomWidth: 2
  },
  opaciti:{
    position: "absolute",
    bottom: 0,
    marginLeft: 140
  },
  btn:{
    width:80,
    height:80,
    borderRadius:30
  },
});

function mapStateToProps(state) {
  const { link, id } = state.photos;
  return {
    link,
    id,
  };
}

const connectedShowPhoto = connect(mapStateToProps)(ShowPhoto);
export default connectedShowPhoto;
