import React from 'react';
import { 
	StyleSheet,
	Text,
	View,
	TouchableOpacity
} from 'react-native';

export default class RoundedButton extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const{
			title,
			onPress,
			width
		}=this.props;

		const buttonWidth = !!width ? width : '40%';
		const buttonStyle = {
			width: buttonWidth,
			height: 42,
		    marginTop: 30,
		    borderRadius: 21,
		    paddingLeft: 20,
		    paddingRight: 20,
		    backgroundColor: '#fff',

		    elevation: 5,
		    shadowColor: '#aa0000',
		    shadowRadius: 8
		};

		return(
			<TouchableOpacity
				style={ buttonStyle }
				onPress={onPress ? onPress.bind(this) : ()=>{}}
			>
				<Text style={ styles.title }>
					{title}
				</Text>
		    </TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
  title:{
  	width: '100%',
  	textAlign: 'center',
  	color: '#333',
  	fontSize: 20,
    lineHeight: 42
  }
});