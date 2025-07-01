import { Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { TabIconProps } from './icon.props';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { styles } from './icon.styles';
import { BottomRootStackPropsList } from '../bottom.props';

const TabIcon: React.FC<TabIconProps> = ({ focused, name, icon, id }) => {
	const { navigate } = useNavigation<NavigationProp<BottomRootStackPropsList>>();
	return (
		<TouchableOpacity style={styles.container} onPress={() => navigate(name as keyof BottomRootStackPropsList)}>
			<Image source={icon} style={[styles.icon, id == 0 && styles.iconId]} />
			<Text style={[styles.text, focused && styles.activeText]}>{name}</Text>
		</TouchableOpacity>
	);
};

export default TabIcon;
