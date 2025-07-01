import { IngredientCategory } from './ingredient-category.enum';

export class IngredientCombinationRules {
    private static compatibleCategories: Map<IngredientCategory, IngredientCategory[]> = new Map([
        // Protein Sources
        [IngredientCategory.LEAN_MEAT, [IngredientCategory.LEAFY_GREENS, IngredientCategory.CRUCIFEROUS_VEGETABLES, IngredientCategory.ROOT_VEGETABLES, IngredientCategory.WHOLE_GRAINS, IngredientCategory.HEALTHY_OILS, IngredientCategory.HERBS, IngredientCategory.SPICES]],
        [IngredientCategory.FATTY_MEAT, [IngredientCategory.LEAFY_GREENS, IngredientCategory.CRUCIFEROUS_VEGETABLES, IngredientCategory.HERBS, IngredientCategory.SPICES]],
        [IngredientCategory.POULTRY, [IngredientCategory.LEAFY_GREENS, IngredientCategory.CRUCIFEROUS_VEGETABLES, IngredientCategory.ROOT_VEGETABLES, IngredientCategory.WHOLE_GRAINS, IngredientCategory.HEALTHY_OILS, IngredientCategory.HERBS, IngredientCategory.SPICES]],
        [IngredientCategory.FISH, [IngredientCategory.LEAFY_GREENS, IngredientCategory.CRUCIFEROUS_VEGETABLES, IngredientCategory.WHOLE_GRAINS, IngredientCategory.HEALTHY_OILS, IngredientCategory.HERBS, IngredientCategory.SPICES]],
        [IngredientCategory.SHELLFISH, [IngredientCategory.LEAFY_GREENS, IngredientCategory.WHOLE_GRAINS, IngredientCategory.HERBS, IngredientCategory.SPICES]],
        [IngredientCategory.EGGS, [IngredientCategory.LEAFY_GREENS, IngredientCategory.CRUCIFEROUS_VEGETABLES, IngredientCategory.WHOLE_GRAINS, IngredientCategory.HERBS, IngredientCategory.SPICES]],
        [IngredientCategory.LEGUMES, [IngredientCategory.LEAFY_GREENS, IngredientCategory.ROOT_VEGETABLES, IngredientCategory.WHOLE_GRAINS, IngredientCategory.HEALTHY_OILS, IngredientCategory.HERBS, IngredientCategory.SPICES]],
        [IngredientCategory.NUTS_AND_SEEDS, [IngredientCategory.FRUIT, IngredientCategory.BERRIES, IngredientCategory.LEAFY_GREENS, IngredientCategory.YOGURT]],

        // Carbohydrate Sources
        [IngredientCategory.WHOLE_GRAINS, [IngredientCategory.LEAN_MEAT, IngredientCategory.POULTRY, IngredientCategory.FISH, IngredientCategory.SHELLFISH, IngredientCategory.EGGS, IngredientCategory.LEGUMES, IngredientCategory.LEAFY_GREENS, IngredientCategory.CRUCIFEROUS_VEGETABLES, IngredientCategory.ROOT_VEGETABLES, IngredientCategory.HEALTHY_OILS]],
        [IngredientCategory.REFINED_GRAINS, [IngredientCategory.LEAFY_GREENS, IngredientCategory.CRUCIFEROUS_VEGETABLES, IngredientCategory.LEGUMES]],
        [IngredientCategory.STARCHY_VEGETABLES, [IngredientCategory.LEAN_MEAT, IngredientCategory.POULTRY, IngredientCategory.FISH, IngredientCategory.LEGUMES, IngredientCategory.HEALTHY_OILS]],

        // Fruits and Vegetables
        [IngredientCategory.LEAFY_GREENS, [IngredientCategory.LEAN_MEAT, IngredientCategory.FATTY_MEAT, IngredientCategory.POULTRY, IngredientCategory.FISH, IngredientCategory.SHELLFISH, IngredientCategory.EGGS, IngredientCategory.LEGUMES, IngredientCategory.WHOLE_GRAINS, IngredientCategory.HEALTHY_OILS, IngredientCategory.NUTS_AND_SEEDS]],
        [IngredientCategory.CRUCIFEROUS_VEGETABLES, [IngredientCategory.LEAN_MEAT, IngredientCategory.FATTY_MEAT, IngredientCategory.POULTRY, IngredientCategory.FISH, IngredientCategory.EGGS, IngredientCategory.WHOLE_GRAINS, IngredientCategory.HEALTHY_OILS]],
        [IngredientCategory.ROOT_VEGETABLES, [IngredientCategory.LEAN_MEAT, IngredientCategory.POULTRY, IngredientCategory.LEGUMES, IngredientCategory.WHOLE_GRAINS, IngredientCategory.HEALTHY_OILS]],
        [IngredientCategory.ALLIUMS, [IngredientCategory.LEAN_MEAT, IngredientCategory.FATTY_MEAT, IngredientCategory.POULTRY, IngredientCategory.FISH, IngredientCategory.SHELLFISH, IngredientCategory.LEGUMES, IngredientCategory.WHOLE_GRAINS]],
        [IngredientCategory.SQUASH, [IngredientCategory.LEAN_MEAT, IngredientCategory.POULTRY, IngredientCategory.WHOLE_GRAINS, IngredientCategory.LEGUMES, IngredientCategory.HEALTHY_OILS]],
        [IngredientCategory.FRUIT, [IngredientCategory.NUTS_AND_SEEDS, IngredientCategory.YOGURT, IngredientCategory.PLANT_BASED_DAIRY]],
        [IngredientCategory.BERRIES, [IngredientCategory.NUTS_AND_SEEDS, IngredientCategory.YOGURT, IngredientCategory.PLANT_BASED_DAIRY]],

        // Dairy and Alternatives
        [IngredientCategory.MILK, [IngredientCategory.WHOLE_GRAINS, IngredientCategory.FRUIT, IngredientCategory.BERRIES]],
        [IngredientCategory.CHEESE, [IngredientCategory.WHOLE_GRAINS, IngredientCategory.LEAFY_GREENS, IngredientCategory.CRUCIFEROUS_VEGETABLES]],
        [IngredientCategory.YOGURT, [IngredientCategory.FRUIT, IngredientCategory.BERRIES, IngredientCategory.NUTS_AND_SEEDS, IngredientCategory.WHOLE_GRAINS]],
        [IngredientCategory.PLANT_BASED_DAIRY, [IngredientCategory.FRUIT, IngredientCategory.BERRIES, IngredientCategory.NUTS_AND_SEEDS, IngredientCategory.WHOLE_GRAINS]],

        // Fats and Oils
        [IngredientCategory.HEALTHY_OILS, [IngredientCategory.LEAFY_GREENS, IngredientCategory.CRUCIFEROUS_VEGETABLES, IngredientCategory.ROOT_VEGETABLES, IngredientCategory.LEAN_MEAT, IngredientCategory.POULTRY, IngredientCategory.FISH, IngredientCategory.LEGUMES]],

        // Other
        [IngredientCategory.HERBS, Object.values(IngredientCategory)],
        [IngredientCategory.SPICES, Object.values(IngredientCategory)],
        [IngredientCategory.CONDIMENTS, [IngredientCategory.LEAN_MEAT, IngredientCategory.FATTY_MEAT, IngredientCategory.POULTRY, IngredientCategory.FISH, IngredientCategory.SHELLFISH, IngredientCategory.WHOLE_GRAINS, IngredientCategory.REFINED_GRAINS]],
        [IngredientCategory.SWEETENERS, [IngredientCategory.FRUIT, IngredientCategory.BERRIES, IngredientCategory.YOGURT, IngredientCategory.PLANT_BASED_DAIRY]],
    ]);

    static isCombinationAllowed(category1: IngredientCategory, category2: IngredientCategory): boolean {
        const compatibleWithCategory1 = this.compatibleCategories.get(category1) || [];
        const compatibleWithCategory2 = this.compatibleCategories.get(category2) || [];

        return compatibleWithCategory1.includes(category2) || compatibleWithCategory2.includes(category1);
    }
}