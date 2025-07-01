import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

import { styles } from './header.styles';
import { HeaderProps, defaultHeaderProps } from './header.props';

const Header: React.FC<HeaderProps> = ({
   onCrossPress,
   visible = defaultHeaderProps.visible,
   currentIndex = defaultHeaderProps.currentIndex || 0,
   logo = defaultHeaderProps.logo,
   crossIcon = defaultHeaderProps.crossIcon,
}) => {
	if (!visible) return null;

	return (
		<View style={styles.headerContainer}>
			<Image style={styles.logo} source={logo} />

			{currentIndex > 0 && (
				<TouchableOpacity onPress={onCrossPress}>
					<Image style={styles.crossbtn} source={crossIcon} />
				</TouchableOpacity>
			)}
		</View>
	);
};

export default Header;
