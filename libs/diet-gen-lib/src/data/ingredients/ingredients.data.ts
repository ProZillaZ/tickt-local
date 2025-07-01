import proteinSources from './protein-sources.data';
import carbSources from './carb-sources.data';
import fatSources from './fat-sources.data';
import veggieSources from './veggie-sources.data';
import { Ingredient } from '../../models/ingredients/ingredient';

/**
 * Combined ingredients data from all source files.
 */
export const ingredients: Ingredient[] = [
	...proteinSources,
	...carbSources,
	...fatSources,
	...veggieSources
];

export default ingredients;