import React from 'react';
import { 
	StyleSheet,
	Text,
	View,
	TouchableOpacity
} from 'react-native';
import GradientBackground from './GradientBackground';

export default class BrightButton extends React.Component {
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
			<GradientBackground style={ [{width:buttonWidth}, styles.button] }>
				<TouchableOpacity
					style={ styles.innerButton }
					onPress={onPress ? onPress.bind(this) : ()=>{}}
				>
					<Text style={ styles.title }>
						{title}
					</Text>
			    </TouchableOpacity>
			</GradientBackground>
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

	    shadowColor: '#FC4A1A',
	    shadowOpacity: 0.5,
		shadowRadius: 12
	},

	innerButton:{
		width: '100%'
	},

	title:{
		width: '100%',
		textAlign: 'center',
		color: '#fff',
		fontSize: 20,
		lineHeight: 42
	}
});