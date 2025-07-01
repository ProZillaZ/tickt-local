import { IngredientSelectionService } from '../../../src/services/ingredients/ingredient-selection.service';
import { DietType, MealType, Macro, Allergen } from '@tickt-engineering/types';
import { mockIngredients } from '../../__mocks__/mock-ingredients';

describe('IngredientSelectionService', () => {
	let service: IngredientSelectionService;

	beforeEach(() => {
		service = new IngredientSelectionService(mockIngredients);
	});

	describe('selectCompatibleIngredients', () => {
		it('should select compatible ingredients for a standard diet dinner', () => {
			const result = service.selectCompatibleIngredients(
				DietType.STANDARD,
				MealType.DINNER,
				[],
				[Macro.PROTEIN, Macro.CARBS, Macro.FAT, Macro.VEGGIE],
			);

			expect(result).toHaveLength(4);
			expect(result.find(i => i.macro === Macro.PROTEIN)).toBeDefined();
			expect(result.find(i => i.macro === Macro.CARBS)).toBeDefined();
			expect(result.find(i => i.macro === Macro.FAT)).toBeDefined();
			expect(result.find(i => i.macro === Macro.VEGGIE)).toBeDefined();
		});

		it('should select compatible ingredients for a vegetarian diet lunch', () => {
			const result = service.selectCompatibleIngredients(
				DietType.VEGETARIAN,
				MealType.LUNCH,
				[],
				[Macro.PROTEIN, Macro.CARBS],
			);

			expect(result).toHaveLength(2);
			expect(result.find(i => i.macro === Macro.PROTEIN)).toBeDefined();
			expect(result.find(i => i.macro === Macro.CARBS)).toBeDefined();
		});

		it('should exclude ingredients with allergens', () => {
			const result = service.selectCompatibleIngredients(
				DietType.STANDARD,
				MealType.DINNER,
				[Allergen.SOY],
				[Macro.PROTEIN, Macro.CARBS, Macro.FAT, Macro.VEGGIE],
			);

			expect(result).toHaveLength(4);
			expect(result.map(i => i.name)).not.toContain('Tofu');
		});

		it('should return an empty array if no compatible ingredients are found', () => {
			const result = service.selectCompatibleIngredients(
				DietType.VEGAN,
				MealType.BREAKFAST,
				[Allergen.SOY, Allergen.TREE_NUTS],
				[Macro.PROTEIN],
			);

			expect(result).toHaveLength(0);
		});

		it('should handle an empty list of needed macros', () => {
			const result = service.selectCompatibleIngredients(
				DietType.STANDARD,
				MealType.DINNER,
				[],
				[],
			);

			expect(result).toHaveLength(0);
		});
	});

	describe('findCompatibleIngredient', () => {
		it('should find a compatible ingredient for a given macro', () => {
			const result = (service as any).findCompatibleIngredient(
				Macro.PROTEIN,
				MealType.DINNER,
				DietType.STANDARD,
				[],
				[],
			);

			expect(result).toBeDefined();
			expect(result.macro).toBe(Macro.PROTEIN);
			expect(result.dietTypes).toContain(DietType.STANDARD);
			expect(result.mealTypes).toContain(MealType.DINNER);
		});

		it('should return null if no compatible ingredient is found', () => {
			const result = (service as any).findCompatibleIngredient(
				Macro.PROTEIN,
				MealType.DINNER,
				DietType.VEGAN,
				[Allergen.SOY],
				[],
			);

			expect(result).toBeNull();
		});

		it('should consider current selection when finding compatible ingredient', () => {
			const chickenBreast = mockIngredients.find(i => i.name === 'Chicken Breast')!;
			const result = (service as any).findCompatibleIngredient(
				Macro.CARBS,
				MealType.DINNER,
				DietType.STANDARD,
				[],
				[chickenBreast],
			);

			expect(result).toBeDefined();
			expect(result.name).toBe('Brown Rice');
		});
	});

});
