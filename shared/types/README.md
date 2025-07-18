# @tickt-ltd/types

Consolidated TypeScript types for the Tickt ecosystem. This package contains all shared types, interfaces, DTOs, and enums used across Tickt applications.

## Features

- 🏗️ **Modular Organization** - Types organized by domain (chat, meal-plan, nutrition, recipe, user)
- 🛡️ **Type Safety** - Comprehensive TypeScript definitions for all data structures
- 📦 **Single Package** - All types in one consolidated, easy-to-manage package
- 🔄 **Atomic Releases** - All types stay in sync with single version
- 🎯 **Tree Shakeable** - Import only what you need

## Installation

```bash
yarn add @tickt-ltd/types
# or
npm install @tickt-ltd/types
```

## Usage

### Import Specific Types

```typescript
import { Recipe, Ingredient, CreateRecipeDto } from '@tickt-ltd/types';
import { WeekMealPlan, DayMealPlan } from '@tickt-ltd/types';
import { ChatSession, ChatMessage } from '@tickt-ltd/types';
import { UserProfile, ActivityLevel } from '@tickt-ltd/types';
import { Cuisine, DietType, Allergen } from '@tickt-ltd/types';
```

### Import by Domain

```typescript
import { recipe, mealPlan, chat, user, nutrition } from '@tickt-ltd/types';

// Use specific domain types
const newRecipe: recipe.Recipe = { /* ... */ };
const userProfile: user.UserProfile = { /* ... */ };
```

## Type Categories

### 🍳 Recipe Types
- **Models**: `Recipe`, `Ingredient`, `Instruction`, `NutritionalInfo`, `Tag`
- **DTOs**: `CreateRecipeDto`, `UpdateRecipeDto`, `IngredientDto`, `InstructionDto`
- **Enums**: `Difficulty`
- **Interfaces**: `RecipeFilter`

### 📅 Meal Plan Types
- **Models**: `WeekMealPlan`, `DayMealPlan`, `MealPlanItem`, `NutritionalInfo`
- **DTOs**: `CreateMealPlanDto`, `UpdateMealPlanDto`
- **Interfaces**: `MealPlanFilter`

### 💬 Chat Types
- **Models**: `ChatSession`, `ChatMessage`, `ChatParticipant`
- **DTOs**: `CreateChatSessionDto`, `CreateChatMessageDto`, `UpdateChatSessionDto`
- **Enums**: `MessageType`, `ParticipantType`, `SessionStatus`
- **Interfaces**: `ChatMessageFilter`, `ChatSessionFilter`

### 👤 User Types
- **Models**: `UserProfile`
- **DTOs**: `CreateUserProfileDto`, `UpdateUserProfileDto`
- **Enums**: `ActivityLevel`, `BodyType`, `DietGoal`, `FrameSize`, `Gender`, `UnitSystem`

### 🥗 Nutrition Types
- **Enums**: `Allergen`, `Cuisine`, `DietType`, `GoalPace`, `IngredientMeasurement`, `Macro`, `MealCount`, `MealType`
- **Interfaces**: `DietFilters`

## Examples

### Recipe Creation

```typescript
import { Recipe, CreateRecipeDto, Difficulty, Cuisine } from '@tickt-ltd/types';

const createRecipeDto: CreateRecipeDto = {
  name: 'Chicken Parmesan',
  difficulty: Difficulty.MEDIUM,
  cookTime: 30,
  servings: 4,
  cuisines: [Cuisine.ITALIAN],
  ingredients: [
    {
      name: 'Chicken breast',
      amount: 2,
      unit: 'pieces'
    }
  ],
  instructions: [
    {
      stepNumber: 1,
      instruction: 'Preheat oven to 375°F'
    }
  ]
};
```

### Meal Planning

```typescript
import { WeekMealPlan, DayMealPlan, MealType } from '@tickt-ltd/types';

const dayPlan: DayMealPlan = {
  id: 'day-1',
  date: '2024-01-15',
  breakfast: {
    recipeId: 'recipe-1',
    recipeName: 'Oatmeal',
    servings: 1,
    calories: 300,
    macros: {
      protein: 10,
      carbs: 50,
      fat: 8
    }
  }
};

const weekPlan: WeekMealPlan = {
  id: 'week-1',
  userId: 'user-123',
  startDate: '2024-01-15',
  endDate: '2024-01-21',
  dayPlans: [dayPlan]
};
```

### User Profile

```typescript
import { UserProfile, Gender, ActivityLevel, DietGoal } from '@tickt-ltd/types';

const userProfile: UserProfile = {
  id: 'user-123',
  email: 'user@example.com',
  personalInfo: {
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1990-01-01',
    gender: Gender.MALE
  },
  healthMetrics: {
    currentWeight: 175,
    height: 72,
    activityLevel: ActivityLevel.MODERATELY_ACTIVE,
    dietGoal: DietGoal.MUSCLE_GAIN
  }
};
```

### Chat Session

```typescript
import { ChatSession, ChatMessage, MessageType, SessionStatus } from '@tickt-ltd/types';

const chatMessage: ChatMessage = {
  id: 'msg-1',
  sessionId: 'session-1',
  content: 'Can you help me plan meals for this week?',
  messageType: MessageType.USER,
  timestamp: new Date(),
  senderId: 'user-123'
};

const chatSession: ChatSession = {
  id: 'session-1',
  userId: 'user-123',
  status: SessionStatus.ACTIVE,
  participants: [
    {
      id: 'user-123',
      type: ParticipantType.USER
    },
    {
      id: 'ai-coach',
      type: ParticipantType.AI_COACH
    }
  ],
  createdAt: new Date(),
  updatedAt: new Date()
};
```

## Type Organization

```
types/
├── chat/           # Chat and messaging types
│   ├── dtos/       # Data transfer objects
│   ├── enums/      # Enumerations
│   ├── interfaces/ # Interface definitions
│   └── models/     # Core data models
├── meal-plan/      # Meal planning types
│   ├── dtos/
│   ├── interfaces/
│   └── models/
├── nutrition/      # Nutrition and diet types
│   ├── enums/
│   └── interfaces/
├── recipe/         # Recipe and cooking types
│   ├── dtos/
│   ├── enums/
│   ├── interfaces/
│   └── models/
└── user/          # User and profile types
    ├── dtos/
    ├── enums/
    └── interfaces/
```

## Migration from Individual Packages

If you're migrating from the individual type packages:

```typescript
// Before (multiple packages)
import { Recipe } from '@tickt-ltd/recipe-types';
import { WeekMealPlan } from '@tickt-ltd/meal-plan-types';
import { ChatSession } from '@tickt-ltd/chat-types';
import { UserProfile } from '@tickt-ltd/user-types';
import { Cuisine } from '@tickt-ltd/nutrition-types';

// After (single package)
import { 
  Recipe, 
  WeekMealPlan, 
  ChatSession, 
  UserProfile, 
  Cuisine 
} from '@tickt-ltd/types';
```

## Best Practices

### 1. Import Only What You Need

```typescript
// ✅ Good - Specific imports
import { Recipe, CreateRecipeDto } from '@tickt-ltd/types';

// ❌ Avoid - Importing everything
import * as Types from '@tickt-ltd/types';
```

### 2. Use Type Guards for Runtime Validation

```typescript
import { Recipe } from '@tickt-ltd/types';

function isRecipe(obj: any): obj is Recipe {
  return obj && typeof obj.id === 'string' && typeof obj.name === 'string';
}
```

### 3. Leverage Union Types

```typescript
import { MealType } from '@tickt-ltd/types';

type MealPlanningContext = {
  mealType: MealType;
  targetCalories: number;
};
```

## Version History

- **v1.0.0** - Initial consolidated release combining all individual type packages

## Contributing

1. Follow established patterns for new types
2. Add proper JSDoc comments for complex types
3. Use enums for fixed value sets
4. Create DTOs for API boundaries
5. Organize by domain (chat, meal-plan, nutrition, recipe, user)
6. Update this README when adding new type categories

## License

All rights reserved to Polytropic Ltd.