import { View, Text } from 'react-native';
import React from 'react';
import { styles } from './tags.styles';
import { SelectedTagProps } from './tags.props';
import Chip from 'components/global/chip/chip.index';

const SelectedTags: React.FC<SelectedTagProps> = ({ data, onClear }) => {
	return (
		<View style={styles.container}>
			{
				data?.map((item: { [key: string]: string | number }, idx: number) => (
					<Chip isSelected={true} item={item} key={idx} onClose={onClear} />
				))
			}
		</View>
	);
};

export default SelectedTags;
