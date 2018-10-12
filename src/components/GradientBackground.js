import React from 'react';
import { LinearGradient } from 'expo';

export default class GradientBackground extends React.Component {
  render() {
  	const{
  		style,
  		children
  	}=this.props;

    return (
      <LinearGradient
        colors={['#F79D33', '#FC4A1A']}
        style={ style }
      >
      	{children}
      </LinearGradient>
    );
  }
}