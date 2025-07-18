import {
  Recipe,
  Ingredient,
  Instruction,
  Tag,
  RecipeNutritionalInfo,
  Difficulty,
  Cuisine,
  MealType,
  DietType,
} from "@tickt-ltd/types";

// Mock Recipes for Testing
export const mockBreakfastRecipe: Recipe = new Recipe(
  "Scrambled Eggs with Toast",
  "A simple and nutritious breakfast with protein and carbs",
  [
    new Ingredient("Eggs", 2, "pieces"),
    new Ingredient("Whole grain bread", 2, "slices"),
    new Ingredient("Butter", 10, "g"),
    new Ingredient("Salt", 1, "g"),
    new Ingredient("Black pepper", 0.5, "g"),
  ],
  [
    new Instruction(1, "Crack eggs into a bowl and whisk with salt and pepper"),
    new Instruction(2, "Heat butter in a non-stick pan over medium heat"),
    new Instruction(
      3,
      "Pour eggs into pan and gently scramble for 2-3 minutes"
    ),
    new Instruction(4, "Toast bread slices until golden brown"),
    new Instruction(5, "Serve eggs with toast"),
  ],
  5, // prepTime
  8, // cookTime
  1, // servings
  [Cuisine.AMERICAN],
  [MealType.BREAKFAST],
  [DietType.STANDARD, DietType.VEGETARIAN],
  [new Tag("quick"), new Tag("protein-rich")],
  Difficulty.EASY,
  new RecipeNutritionalInfo(420, 24, 28, 22, 4), // calories, protein, carbs, fat, fiber
  "https://example.com/scrambled-eggs.jpg"
);

export const mockLunchRecipe: Recipe = new Recipe(
  "Grilled Chicken Salad",
  "A healthy and filling salad with grilled chicken breast",
  [
    new Ingredient("Chicken breast", 150, "g"),
    new Ingredient("Mixed greens", 100, "g"),
    new Ingredient("Cherry tomatoes", 80, "g"),
    new Ingredient("Cucumber", 60, "g"),
    new Ingredient("Olive oil", 15, "ml"),
    new Ingredient("Lemon juice", 10, "ml"),
    new Ingredient("Salt", 2, "g"),
    new Ingredient("Black pepper", 1, "g"),
  ],
  [
    new Instruction(1, "Season chicken breast with salt and pepper"),
    new Instruction(
      2,
      "Grill chicken for 6-7 minutes on each side until cooked through"
    ),
    new Instruction(3, "Let chicken rest for 5 minutes, then slice"),
    new Instruction(4, "Wash and chop all vegetables"),
    new Instruction(5, "Mix olive oil and lemon juice for dressing"),
    new Instruction(6, "Combine all ingredients and toss with dressing"),
  ],
  15, // prepTime
  14, // cookTime
  1, // servings
  [Cuisine.MEDITERRANEAN],
  [MealType.LUNCH],
  [DietType.STANDARD],
  [new Tag("healthy"), new Tag("low-carb"), new Tag("high-protein")],
  Difficulty.EASY,
  new RecipeNutritionalInfo(380, 45, 12, 18, 8), // calories, protein, carbs, fat, fiber
  "https://example.com/chicken-salad.jpg"
);

export const mockDinnerRecipe: Recipe = new Recipe(
  "Salmon with Quinoa and Vegetables",
  "A balanced dinner with omega-3 rich salmon and nutritious quinoa",
  [
    new Ingredient("Salmon fillet", 180, "g"),
    new Ingredient("Quinoa", 60, "g"),
    new Ingredient("Broccoli", 100, "g"),
    new Ingredient("Carrots", 80, "g"),
    new Ingredient("Olive oil", 20, "ml"),
    new Ingredient("Garlic", 2, "cloves"),
    new Ingredient("Lemon", 0.5, "pieces"),
    new Ingredient("Salt", 3, "g"),
    new Ingredient("Black pepper", 1, "g"),
    new Ingredient("Herbs", 5, "g"),
  ],
  [
    new Instruction(1, "Rinse quinoa and cook in water for 15 minutes"),
    new Instruction(2, "Season salmon with salt, pepper, and herbs"),
    new Instruction(3, "Heat olive oil in a pan over medium-high heat"),
    new Instruction(4, "Cook salmon for 4-5 minutes on each side"),
    new Instruction(5, "Steam broccoli and carrots until tender"),
    new Instruction(6, "Serve salmon over quinoa with vegetables and lemon"),
  ],
  20, // prepTime
  25, // cookTime
  1, // servings
  [Cuisine.MEDITERRANEAN],
  [MealType.DINNER],
  [DietType.STANDARD, DietType.PESCATARIAN],
  [new Tag("healthy"), new Tag("omega-3"), new Tag("balanced")],
  Difficulty.MEDIUM,
  new RecipeNutritionalInfo(620, 48, 45, 28, 12), // calories, protein, carbs, fat, fiber
  "https://example.com/salmon-quinoa.jpg"
);

export const mockVegetarianRecipe: Recipe = new Recipe(
  "Chickpea Curry",
  "A flavorful vegetarian curry packed with protein and spices",
  [
    new Ingredient("Chickpeas (canned)", 200, "g"),
    new Ingredient("Coconut milk", 150, "ml"),
    new Ingredient("Onion", 100, "g"),
    new Ingredient("Tomatoes", 150, "g"),
    new Ingredient("Garlic", 3, "cloves"),
    new Ingredient("Ginger", 10, "g"),
    new Ingredient("Curry powder", 8, "g"),
    new Ingredient("Turmeric", 2, "g"),
    new Ingredient("Olive oil", 15, "ml"),
    new Ingredient("Salt", 3, "g"),
    new Ingredient("Cilantro", 10, "g"),
  ],
  [
    new Instruction(1, "Heat oil in a large pan over medium heat"),
    new Instruction(2, "Sauté onion, garlic, and ginger until fragrant"),
    new Instruction(3, "Add spices and cook for 1 minute"),
    new Instruction(4, "Add tomatoes and cook until soft"),
    new Instruction(5, "Add chickpeas and coconut milk"),
    new Instruction(6, "Simmer for 15 minutes and garnish with cilantro"),
  ],
  15, // prepTime
  25, // cookTime
  1, // servings
  [Cuisine.INDIAN],
  [MealType.DINNER],
  [DietType.VEGETARIAN, DietType.VEGAN],
  [
    new Tag("vegetarian"),
    new Tag("vegan"),
    new Tag("spicy"),
    new Tag("protein-rich"),
  ],
  Difficulty.MEDIUM,
  new RecipeNutritionalInfo(540, 22, 48, 28, 16), // calories, protein, carbs, fat, fiber
  "https://example.com/chickpea-curry.jpg"
);

export const mockSnackRecipe: Recipe = new Recipe(
  "Greek Yogurt with Berries",
  "A healthy snack with probiotics and antioxidants",
  [
    new Ingredient("Greek yogurt", 150, "g"),
    new Ingredient("Mixed berries", 80, "g"),
    new Ingredient("Honey", 15, "g"),
    new Ingredient("Almonds", 20, "g"),
    new Ingredient("Chia seeds", 5, "g"),
  ],
  [
    new Instruction(1, "Place Greek yogurt in a bowl"),
    new Instruction(2, "Top with mixed berries"),
    new Instruction(3, "Drizzle with honey"),
    new Instruction(4, "Sprinkle with chopped almonds and chia seeds"),
  ],
  3, // prepTime
  0, // cookTime
  1, // servings
  [Cuisine.GREEK],
  [MealType.SNACK],
  [DietType.STANDARD, DietType.VEGETARIAN],
  [new Tag("healthy"), new Tag("probiotics"), new Tag("antioxidants")],
  Difficulty.EASY,
  new RecipeNutritionalInfo(280, 18, 32, 12, 8), // calories, protein, carbs, fat, fiber
  "https://example.com/greek-yogurt-berries.jpg"
);

// Arrays for different meal types
export const mockBreakfastRecipes: Recipe[] = [
  mockBreakfastRecipe,
  new Recipe(
    "Oatmeal with Banana",
    "A fiber-rich breakfast with natural sweetness",
    [
      new Ingredient("Rolled oats", 50, "g"),
      new Ingredient("Banana", 1, "piece"),
      new Ingredient("Milk", 200, "ml"),
      new Ingredient("Honey", 10, "g"),
      new Ingredient("Cinnamon", 1, "g"),
    ],
    [
      new Instruction(1, "Cook oats with milk for 5 minutes"),
      new Instruction(2, "Slice banana and add to oats"),
      new Instruction(3, "Stir in honey and cinnamon"),
    ],
    5,
    8,
    1,
    [Cuisine.AMERICAN],
    [MealType.BREAKFAST],
    [DietType.STANDARD, DietType.VEGETARIAN],
    [new Tag("fiber-rich"), new Tag("natural")],
    Difficulty.EASY,
    new RecipeNutritionalInfo(350, 15, 58, 8, 12),
    "https://example.com/oatmeal-banana.jpg"
  ),
];

export const mockLunchRecipes: Recipe[] = [
  mockLunchRecipe,
  new Recipe(
    "Turkey Sandwich",
    "A protein-packed sandwich with fresh vegetables",
    [
      new Ingredient("Whole grain bread", 2, "slices"),
      new Ingredient("Turkey breast", 100, "g"),
      new Ingredient("Lettuce", 30, "g"),
      new Ingredient("Tomato", 60, "g"),
      new Ingredient("Avocado", 40, "g"),
      new Ingredient("Mustard", 10, "g"),
    ],
    [
      new Instruction(1, "Toast bread slices"),
      new Instruction(2, "Layer turkey, lettuce, tomato, and avocado"),
      new Instruction(3, "Spread mustard and assemble sandwich"),
    ],
    10,
    2,
    1,
    [Cuisine.AMERICAN],
    [MealType.LUNCH],
    [DietType.STANDARD],
    [new Tag("quick"), new Tag("protein-rich")],
    Difficulty.EASY,
    new RecipeNutritionalInfo(450, 35, 35, 18, 10),
    "https://example.com/turkey-sandwich.jpg"
  ),
];

export const mockDinnerRecipes: Recipe[] = [
  mockDinnerRecipe,
  mockVegetarianRecipe,
  new Recipe(
    "Beef Stir Fry",
    "A quick and flavorful stir fry with lean beef and vegetables",
    [
      new Ingredient("Beef sirloin", 150, "g"),
      new Ingredient("Bell peppers", 100, "g"),
      new Ingredient("Broccoli", 80, "g"),
      new Ingredient("Soy sauce", 20, "ml"),
      new Ingredient("Garlic", 2, "cloves"),
      new Ingredient("Ginger", 5, "g"),
      new Ingredient("Sesame oil", 10, "ml"),
      new Ingredient("Brown rice", 60, "g"),
    ],
    [
      new Instruction(1, "Cook brown rice according to package directions"),
      new Instruction(2, "Slice beef and vegetables"),
      new Instruction(3, "Heat sesame oil in a wok over high heat"),
      new Instruction(4, "Stir fry beef for 2-3 minutes"),
      new Instruction(5, "Add vegetables and stir fry for 3-4 minutes"),
      new Instruction(6, "Add soy sauce, garlic, and ginger, serve over rice"),
    ],
    15,
    12,
    1,
    [Cuisine.CHINESE],
    [MealType.DINNER],
    [DietType.STANDARD],
    [new Tag("quick"), new Tag("high-protein"), new Tag("vegetables")],
    Difficulty.MEDIUM,
    new RecipeNutritionalInfo(580, 42, 48, 22, 8),
    "https://example.com/beef-stir-fry.jpg"
  ),
];

export const mockSnackRecipes: Recipe[] = [
  mockSnackRecipe,
  new Recipe(
    "Apple with Peanut Butter",
    "A simple and satisfying snack with natural sweetness and protein",
    [
      new Ingredient("Apple", 1, "piece"),
      new Ingredient("Peanut butter", 20, "g"),
    ],
    [
      new Instruction(1, "Slice apple into wedges"),
      new Instruction(2, "Serve with peanut butter for dipping"),
    ],
    2,
    0,
    1,
    [Cuisine.AMERICAN],
    [MealType.SNACK],
    [DietType.STANDARD, DietType.VEGETARIAN],
    [new Tag("quick"), new Tag("natural"), new Tag("protein")],
    Difficulty.EASY,
    new RecipeNutritionalInfo(220, 8, 28, 12, 6),
    "https://example.com/apple-peanut-butter.jpg"
  ),
];

// Helper function to create a week's worth of recipes
export function createWeekRecipes(): Recipe[][] {
  const weekRecipes: Recipe[][] = [];

  for (let day = 0; day < 7; day++) {
    const dayRecipes: Recipe[] = [];

    // Add breakfast recipe
    dayRecipes.push(mockBreakfastRecipes[day % mockBreakfastRecipes.length]);

    // Add lunch recipe
    dayRecipes.push(mockLunchRecipes[day % mockLunchRecipes.length]);

    // Add dinner recipe
    dayRecipes.push(mockDinnerRecipes[day % mockDinnerRecipes.length]);

    weekRecipes.push(dayRecipes);
  }

  return weekRecipes;
}

// Helper function to create recipes for a single day
export function createDayRecipes(includeSnack: boolean = false): Recipe[] {
  const dayRecipes = [mockBreakfastRecipe, mockLunchRecipe, mockDinnerRecipe];

  if (includeSnack) {
    dayRecipes.push(mockSnackRecipe);
  }

  return dayRecipes;
}
