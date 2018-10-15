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

		return(
			<TouchableOpacity
				style={ [{width:buttonWidth}, styles.button] }
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
	button:{
		height: 42,
	    marginTop: 30,
	    borderRadius: 21,
	    paddingLeft: 20,
	    paddingRight: 20,
	    backgroundColor: '#fff',

	    shadowColor: '#fff',
	    shadowOpacity: 0.5,
		shadowRadius: 12
	},

	title:{
		width: '100%',
		textAlign: 'center',
		color: '#333',
		fontSize: 20,
		lineHeight: 42
	}
});