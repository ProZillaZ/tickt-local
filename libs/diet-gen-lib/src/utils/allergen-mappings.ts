import { Allergen } from '@tickt-ltd/types/nutrition/enums/allergen.enum';

/**
 * Comprehensive allergen alias mappings for robust ingredient detection
 * Provides extensive mapping of allergen terms and variations
 */
export const ALLERGEN_ALIASES: Record<string, string[]> = {
	[Allergen.GLUTEN]: [
		// Direct terms
		'gluten', 'wheat', 'barley', 'rye', 'spelt', 'kamut', 'triticale',
		// Flour variations
		'flour', 'all-purpose flour', 'whole wheat flour', 'wheat flour', 'bread flour',
		'cake flour', 'pastry flour', 'self-rising flour', 'enriched flour',
		// Wheat products
		'wheat bran', 'wheat germ', 'wheat starch', 'wheat protein', 'vital wheat gluten',
		'seitan', 'wheat berries', 'bulgur', 'farro', 'freekeh',
		// Processed products
		'bread', 'breadcrumbs', 'panko', 'croutons', 'pasta', 'noodles', 'couscous',
		'semolina', 'durum', 'graham', 'matzo', 'communion wafer',
		// Hidden sources
		'soy sauce', 'teriyaki sauce', 'worcestershire sauce', 'malt', 'malt extract',
		'malt flavoring', 'malt vinegar', 'beer', 'ale', 'lager', 'brewer\'s yeast',
		// Barley products
		'barley malt', 'pearl barley', 'barley flour', 'barley grass'
	],

	[Allergen.WHEAT]: [
		'wheat', 'wheat flour', 'whole wheat', 'wheat bran', 'wheat germ',
		'wheat starch', 'wheat protein', 'vital wheat gluten', 'wheat berries',
		'all-purpose flour', 'bread flour', 'cake flour', 'pastry flour',
		'enriched flour', 'unbleached flour', 'bleached flour'
	],

	[Allergen.TREE_NUTS]: [
		// Tree nuts
		'almond', 'almonds', 'almond flour', 'almond milk', 'almond butter', 'almond extract',
		'walnut', 'walnuts', 'walnut pieces', 'walnut oil',
		'pecan', 'pecans', 'pecan pieces',
		'cashew', 'cashews', 'cashew butter', 'cashew cream', 'cashew milk',
		'pistachio', 'pistachios', 'pistachio nuts',
		'hazelnut', 'hazelnuts', 'hazelnut oil', 'hazelnut butter',
		'macadamia', 'macadamia nuts', 'macadamia oil',
		'brazil nut', 'brazil nuts',
		'pine nut', 'pine nuts', 'pignoli', 'pinon',
		'chestnut', 'chestnuts',
		'beechnut', 'beechnuts',
		'butternut', 'butternuts',
		'hickory nut', 'hickory nuts',
		// Coconut (often avoided with tree nut allergies)
		'coconut', 'coconut oil', 'coconut milk', 'coconut flour', 'coconut cream',
		'coconut butter', 'coconut flakes', 'shredded coconut',
		// Cross-contamination warnings
		'may contain tree nuts', 'processed in facility with tree nuts'
	],

	[Allergen.PEANUTS]: [
		'peanut', 'peanuts', 'peanut butter', 'peanut oil', 'peanut flour',
		'groundnut', 'groundnuts', 'goober', 'monkey nut',
		'arachis oil', 'arachis hypogaea',
		'may contain peanuts', 'processed in facility with peanuts'
	],

	[Allergen.DAIRY]: [
		// Milk
		'milk', 'whole milk', 'skim milk', '2% milk', '1% milk', 'low-fat milk',
		'non-fat milk', 'evaporated milk', 'condensed milk', 'powdered milk',
		'milk powder', 'dry milk', 'milk solids',
		// Cream
		'cream', 'heavy cream', 'light cream', 'whipping cream', 'half and half',
		'sour cream', 'crème fraîche',
		// Butter
		'butter', 'unsalted butter', 'salted butter', 'clarified butter', 'ghee',
		// Cheese varieties
		'cheese', 'cheddar', 'mozzarella', 'parmesan', 'swiss', 'provolone',
		'gouda', 'brie', 'camembert', 'feta', 'ricotta', 'cottage cheese',
		'cream cheese', 'mascarpone', 'goat cheese', 'blue cheese',
		// Yogurt
		'yogurt', 'greek yogurt', 'frozen yogurt',
		// Other dairy
		'buttermilk', 'kefir', 'whey', 'whey protein', 'casein', 'lactose',
		'lactalbumin', 'lactoglobulin', 'milk fat', 'anhydrous milkfat'
	],

	[Allergen.EGGS]: [
		'egg', 'eggs', 'egg white', 'egg whites', 'egg yolk', 'egg yolks',
		'whole egg', 'dried egg', 'egg powder', 'egg solids',
		'albumin', 'ovalbumin', 'ovomucin', 'ovomucoid', 'ovotransferrin',
		'lysozyme', 'livetin', 'mayonnaise', 'aioli', 'hollandaise',
		'eggnog', 'meringue', 'marshmallow'
	],

	[Allergen.SOY]: [
		'soy', 'soya', 'soybean', 'soybeans', 'soy flour', 'soy protein',
		'soy sauce', 'shoyu', 'tamari', 'miso', 'tempeh', 'tofu',
		'edamame', 'soy milk', 'soy oil', 'soybean oil', 'lecithin',
		'soy lecithin', 'textured vegetable protein', 'tvp',
		'hydrolyzed soy protein', 'soy protein isolate', 'soy protein concentrate'
	],

	[Allergen.SHELLFISH]: [
		// Crustaceans
		'shrimp', 'prawns', 'crab', 'lobster', 'crawfish', 'crayfish',
		// Mollusks
		'clam', 'clams', 'oyster', 'oysters', 'mussel', 'mussels',
		'scallop', 'scallops', 'abalone', 'squid', 'octopus',
		// Other
		'langostino', 'krill', 'barnacle'
	],

	[Allergen.FISH]: [
		'fish', 'salmon', 'tuna', 'cod', 'bass', 'trout', 'halibut',
		'flounder', 'sole', 'mackerel', 'sardine', 'anchovy', 'herring',
		'snapper', 'grouper', 'mahi mahi', 'tilapia', 'catfish',
		'fish sauce', 'worcestershire sauce', 'caesar dressing',
		'fish oil', 'omega-3'
	],

	[Allergen.SESAME]: [
		'sesame', 'sesame seed', 'sesame seeds', 'sesame oil',
		'tahini', 'tahina', 'sesame paste', 'sesame flour',
		'benne', 'benne seed', 'sim sim'
	],

	[Allergen.SULFITES]: [
		'sulfite', 'sulfites', 'sulphite', 'sulphites',
		'sodium sulfite', 'sodium bisulfite', 'sodium metabisulfite',
		'potassium sulfite', 'potassium bisulfite', 'potassium metabisulfite',
		'sulfur dioxide', 'sulphur dioxide'
	],

	[Allergen.MUSTARD]: [
		'mustard', 'mustard seed', 'mustard seeds', 'mustard powder',
		'dijon mustard', 'yellow mustard', 'brown mustard',
		'mustard greens', 'mustard oil'
	],

	[Allergen.CORN]: [
		'corn', 'maize', 'corn flour', 'corn starch', 'cornstarch',
		'corn syrup', 'high fructose corn syrup', 'corn oil',
		'popcorn', 'hominy', 'polenta', 'corn meal', 'cornmeal',
		'corn gluten', 'dextrose', 'dextrin', 'maltodextrin'
	]
};

/**
 * Gets all aliases for a specific allergen
 */
export function getAllergenAliases(allergen: string): string[] {
	const normalizedAllergen = allergen.toLowerCase().trim();
	return ALLERGEN_ALIASES[normalizedAllergen] || [];
}

/**
 * Gets all supported allergens from the enum
 */
export function getSupportedAllergens(): string[] {
	return Object.values(Allergen);
}

/**
 * Validates if an allergen is supported
 */
export function isValidAllergen(allergen: string): boolean {
	return getSupportedAllergens().includes(allergen.toLowerCase().trim());
}

/**
 * Preprocesses ingredient name to remove preparation details and parentheticals
 */
export function preprocessIngredient(ingredientName: string): string {
	return ingredientName
		.toLowerCase()
		.trim()
		// Remove parenthetical information
		.replace(/\([^)]*\)/g, '')
		// Remove preparation details after commas
		.replace(/,.*$/, '')
		// Clean up extra whitespace
		.replace(/\s+/g, ' ')
		.trim();
}

/**
 * Performs word boundary matching to avoid false positives
 */
export function isWordMatch(text: string, searchTerm: string): boolean {
	if (text === searchTerm) {
		return true;
	}

	const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const wordBoundaryPattern = new RegExp(`\\b${escapedTerm}\\b`, 'i');

	return wordBoundaryPattern.test(text);
}

/**
 * Checks if an ingredient contains a specific allergen using word boundary matching
 */
export function ingredientContainsAllergen(ingredientName: string, allergen: string): boolean {
	const processedIngredient = preprocessIngredient(ingredientName);
	const aliases = getAllergenAliases(allergen);

	return aliases.some(alias => isWordMatch(processedIngredient, alias));
}
