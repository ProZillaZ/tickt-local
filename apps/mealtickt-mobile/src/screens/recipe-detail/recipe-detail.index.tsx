import { View, Text, Image, ScrollView } from 'react-native';
import { styles } from './recipe-detail.styles';
import BackButton from 'components/global/back/back.index';
import { RecipeInfo, RecipeRating } from 'components/user-stack/recipe-detail';
import { meals } from 'app/constants/constants.ts';
import Toggle from 'components/global/toggle/toggle.index';
import { useRecipe } from './use-recipe-detail.ts';
import { isTablet } from 'utils/helpers.ts';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from 'app/components/bottom-navigation/stack/stack.props.ts';

type RecipeDetailScreenRouteProp = RouteProp<RootStackParamList, 'recipe-detail'>;

type Props = {
    route: RecipeDetailScreenRouteProp;
};
const RecipeDetailScreen = ({ route }: Props) => {
    const { recipe } = route.params;
    const { selectedToggleOption, toggleOptions, handleToggle, activeToggle, handleBack } =
        useRecipe(recipe);

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollview}>
                <Image style={styles.image} source={recipe.image} />
                <BackButton style={styles.backButton} onPress={handleBack} />
                <RecipeInfo {...recipe} />
                <Text style={styles.heading}>recipe details</Text>
                <Toggle
                    itemStyles={styles.itemStyle}
                    style={styles.toggle}
                    options={toggleOptions}
                    value={selectedToggleOption}
                    onPress={handleToggle}
                    itemWidthOffset={isTablet ? 1.2 : 1.7}
                />
                {activeToggle()}
                <RecipeRating recipe_id={''} />
            </ScrollView>
        </View>
    );
};

export default RecipeDetailScreen;
