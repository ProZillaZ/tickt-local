# @tickt-engineering/diet-gen-lib

A comprehensive library for generating personalized diet plans, meal planning, and nutrition calculations for the Tickt ecosystem.

## 📦 Installation

```bash
# Using yarn (recommended)
yarn add @tickt-engineering/diet-gen-lib

# Using npm
npm install @tickt-engineering/diet-gen-lib
```

## 🚀 Quick Start

```typescript
import { 
  MealPlanBuilder, 
  UserProfile, 
  Gender, 
  ActivityLevel 
} from '@tickt-engineering/diet-gen-lib';

// Create user profile
const userProfile = new UserProfile({
  gender: Gender.MALE,
  age: 30,
  height: 180,
  weight: 75,
  activityLevel: ActivityLevel.MODERATELY_ACTIVE,
  // ... other properties
});

// Generate meal plan
const mealPlan = new MealPlanBuilder(userProfile).build();
console.log(mealPlan);
```

## 📋 Import Strategies

This library provides **two import approaches** to suit different needs:

### **Approach 1: Single Package (Recommended for Simplicity)**
Import everything from diet-gen-lib for convenience:

```typescript
import { 
  UserProfile,
  Gender,
  ActivityLevel,
  DietGoal,
  DietType,
  MealType,
  Cuisine,
  MealPlanBuilder
} from '@tickt-engineering/diet-gen-lib';
```

**Pros:** Single dependency, simple imports
**Cons:** Larger bundle size, includes full library

### **Approach 2: Explicit Dependencies (Recommended for Optimization)**
Import core types directly from shared packages for lighter bundles:

```typescript
// User demographic types (lightweight ~3KB)
import { 
  Gender, 
  ActivityLevel, 
  DietGoal,
  UnitSystem,
  BodyType
} from '@tickt-engineering/user-types';

// Nutrition & dietary types (lightweight ~5KB)
import { 
  DietType, 
  MealType, 
  Cuisine,
  Allergen,
  Macro
} from '@tickt-engineering/nutrition-types';

// Complex business logic (heavier ~500KB)
import { 
  UserProfile,
  MealPlanBuilder,
  CaloricIntakeService 
} from '@tickt-engineering/diet-gen-lib';
```

**Pros:** Smaller bundles, explicit dependencies, better tree-shaking, clear separation of concerns
**Cons:** Multiple dependencies to manage

### **Usage Recommendations**

- **Frontend/Mobile Apps**: Use Approach 2 for optimal bundle sizes
- **Backend APIs**: Either approach works, choose based on team preference  
- **Component Libraries**: Use Approach 2 for better modularity
- **New Projects**: Consider Approach 2 for better architecture

## API Documentation

[Include or link to detailed API documentation]

## Testing

Run the tests for this library with:

```bash
npm tests
```

## Contributing

Please refer to the main Tickt repository's contributing guidelines.

## License

This project is licensed with All Rights Reserved - see the [LICENSE](../../LICENSE.txt) file for details.