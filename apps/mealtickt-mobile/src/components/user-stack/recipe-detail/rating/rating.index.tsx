import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { styles } from './rating.styles';
import { useRating } from './use-rating.ts';
import StarRating from 'react-native-star-rating-widget';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const RecipeRating = ({recipe_id}:{recipe_id:string}) => {
	const { rating, updateRatting, getStar } = useRating(recipe_id);

	return (
		<View style={styles.headerContainer}>
			<Text style={styles.heading}>rate recipe</Text>
			<View style={styles.ratingContainer}>
				<Pressable onPress={() => updateRatting(0)}><Text style={styles.text}>hate it</Text></Pressable>
				<StarRating
					enableHalfStar={false}
					rating={rating}
					onChange={updateRatting}
					maxStars={5}
					starSize={hp('2.5%')}
					StarIconComponent={({ type }) => <Image style={styles.stars} source={getStar(type)} />}
				/>
				<Pressable onPress={() => updateRatting(5)}><Text style={styles.text}>love it</Text></Pressable>
			</View>
		</View>
	);
};

export default RecipeRating;
