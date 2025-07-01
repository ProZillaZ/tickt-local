import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { ToggleProps } from './toggle.props';
import { useToggle } from './use-toggle.ts';
import { styles } from './toggle.styles';

const Toggle: React.FC<ToggleProps> = ({ options, onPress, value, style, itemStyles, itemWidthOffset = 1.6 }) => {
	const { selected, handleSelect } = useToggle({ onPress, value });

	return (
		<View style={[styles.container, style]}>
			{
				options?.map((item, id) => (
					<Pressable
						style={[styles.itemContainer, { width: `${(100 / options.length) - itemWidthOffset}%` }, id == selected && styles.itemContainerActive, itemStyles]}
						key={id} onPress={() => handleSelect(id)}>
						<Text style={[styles.item, id == selected && styles.itemActive]}>{item}</Text>
					</Pressable>
				))
			}
		</View>
	);
};

export default Toggle;
