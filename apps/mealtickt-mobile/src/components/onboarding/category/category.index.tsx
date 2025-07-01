import { Text, View } from 'react-native';
import React from 'react';
import { styles } from './category.styles';
import { useSelectCategory } from './use-select-category.ts';
import Chip from 'components/global/chip/chip.index';
import { CategoryProps } from './category.props';

const SelectCategory: React.FC<CategoryProps> = ({ onChange, label, defaultValue, data }) => {
	const { allergies, selectedAllergies, selectAllergy, deSelectAllergy } = useSelectCategory({
		onChange,
		defaultValue,
		data,
	});

	return (
		<View style={styles.container}>
			<Text style={styles.allergiesText}>{label}</Text>
			<View style={styles.allergiesContainer}>
				{allergies && allergies.map((allergy, idx) => (
					<Chip key={idx} item={allergy} isSelected={selectedAllergies.includes(allergy.id)}
						  onSelect={(id) => selectAllergy(id as string)}
						  onClose={(id) => deSelectAllergy(id as string)} />
				))}
			</View>
		</View>
	);
};

// any allergies we should know about
export default SelectCategory;

