# @tickt-ltd/services

Platform-agnostic services package for all Tickt applications providing consistent data access patterns, error handling, and logging across platforms.

## ✨ Features

- 🏗️ **Truly Platform Agnostic** - Uses dependency injection with zero platform assumptions
- 🔥 **Firestore Integration** - Optional Firebase/Firestore support via adapters
- 📱 **Cross-Platform** - Works in React Native, Node.js, web, and any other platform  
- 🛡️ **Type Safety** - Full TypeScript support with comprehensive shared type packages
- 📊 **Structured Logging** - Configurable logging with context and levels
- ⚠️ **Error Handling** - Centralized error management with custom error types
- 🏭 **Service Registry** - Dependency injection pattern for extensible architecture
- 🧪 **Testable** - Easy mocking and testing through interfaces
- 🚀 **Multi-Environment** - Built-in support for dev/staging/production deployments

## 📦 Installation

```bash
yarn add @tickt-ltd/services

# Install consolidated types package
yarn add @tickt-ltd/types
```

## 🚀 Quick Start

### Simple Firebase Setup (Recommended)

```typescript
import { initializeFirestoreServices } from '@tickt-ltd/services';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// One-line setup for Firebase platforms
const services = initializeFirestoreServices({
  firestore,
  auth,
  // ... other Firebase modules
}, {
  logLevel: LogLevel.INFO,
  environment: Environment.PRODUCTION
});

// Use services immediately
const recipeService = services.getRecipeService();
const recipes = await recipeService.search({ 
  cuisines: ['ITALIAN'],
  maxCookTime: 30 
});
```

### Platform-Specific Conveniences

```ts
// Node.js with automatic environment detection
import { initializeNodeFirestoreServices } from '@tickt-ltd/services';

const nodeServices = initializeNodeFirestoreServices(firebaseModules);

// React Native with __DEV__ detection  
import { initializeReactNativeFirestoreServices } from '@tickt-ltd/services';

const rnServices = initializeReactNativeFirestoreServices(firebaseModules);
```

### Custom Platform (Advanced)

```typescript
import { 
  initializeServices, 
  createFirebaseAdapters,
  firestoreServiceFactories 
} from '@tickt-ltd/services';

// Full control over configuration
const adapters = createFirebaseAdapters(firebaseModules);
const services = initializeServices(
  { logLevel: LogLevel.DEBUG },
  adapters,
  firestoreServiceFactories
);
```

## 🏗️ Architecture

### Platform-Agnostic Design

The services package uses a **Service Registry Pattern** with dependency injection:

```typescript
// Core: Platform-agnostic service initialization
initializeServices(config, databaseAdapters, serviceFactories)

// Platform: Firestore-specific implementations  
firestoreServiceFactories = {
  createRecipeService: (logger, adapter) => FirestoreRecipeService.create(logger, adapter),
  createUserService: (logger, adapter) => FirestoreUserService.create(logger, adapter),
  // ...
}
```

### Service Interfaces

All services implement consistent interfaces:

```typescript
interface IRecipeService {
  getById(id: string): Promise<Recipe | null>;
  create(data: CreateRecipeDto, userId: string): Promise<Recipe>;
  search(filter?: RecipeFilter, options?: SearchOptions): Promise<PaginatedResult<Recipe>>;
  update(id: string, data: UpdateRecipeDto, userId: string): Promise<Recipe>;
  delete(id: string, userId: string): Promise<void>;
}
```

### Database Adapter Pattern

Services work with any database through adapters:

```typescript
interface IDatabaseAdapter {
  get(collection: string, id: string): Promise<DocumentSnapshot>;
  create(collection: string, data: any, id?: string): Promise<string>;
  update(collection: string, id: string, data: any): Promise<void>;
  delete(collection: string, id: string): Promise<void>;
  query(collection: string, options: QueryOptions): Promise<QueryResult>;
}
```

## 📋 Available Services

### Recipe Service
- ✅ CRUD operations for recipes with nutritional information
- 🔍 Advanced search with cuisine, diet type, difficulty filters
- 👤 User-specific recipe management
- 📊 Automatic nutritional calculation
- 🏷️ Tag and categorization support

### Meal Plan Service  
- ✅ Weekly meal planning with daily breakdowns
- 📅 Date range queries and current week detection
- 🍽️ Breakfast, lunch, dinner, and snack planning
- 📊 Nutritional tracking per day and week
- 👤 User-specific meal plans with grouped storage

### User Service
- ✅ User profile management with health metrics
- 🎯 Diet goals and activity level tracking  
- ⚙️ Preference and settings management
- 📏 Body composition and frame size tracking
- 🌍 Unit system preferences (metric/imperial)

### Chat Session Service
- ✅ AI coach chat session management
- 💬 Message threading and participant tracking
- 📊 Session status and metadata
- 🏷️ Message type categorization
- 👤 User-specific chat history with grouped storage

## 🔧 Configuration

### Environment Configuration

```typescript
enum Environment {
  DEVELOPMENT = 'development',
  STAGING = 'staging', 
  PRODUCTION = 'production',
  TEST = 'test',
}

enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn', 
  ERROR = 'error',
}

interface ServiceConfig {
  logLevel?: LogLevel;
  enableMetrics?: boolean;
  enableCaching?: boolean;
  environment?: Environment;
}
```

### Multi-Environment Deployment

The package supports automatic environment detection:

```typescript
// Development Firebase project: tickt-90f02 (us-central1)
// Production Firebase project: tickt-prod (europe-west1)

// Environment is auto-detected from:
// 1. NODE_ENV environment variable
// 2. FIREBASE_ENV environment variable  
// 3. Defaults to development
```

### Database Collections

Services use centralized collection configuration:

```typescript
const DEFAULT_DATABASE_CONFIG = {
  collections: {
    recipes: 'recipes',
    mealPlans: 'meal_plans', 
    users: 'users',
    chatSessions: 'chat_sessions'
  }
};
```

## ⚠️ Error Handling

### Custom Error Types

```ts
// Base application error
class AppError extends Error {}

// Specific error types
class ValidationError extends AppError {}   // Input validation failures
class NotFoundError extends AppError {}     // Resource not found  
class UnauthorizedError extends AppError {} // Permission denied
class ConflictError extends AppError {}     // Resource conflicts
class NetworkError extends AppError {}      // Connection issues
```

### Error Handling Example

```typescript
try {
  const recipe = await recipeService.getById('invalid-id');
} catch (error) {
  if (error instanceof ValidationError) {
    showValidationError(error.message);
  } else if (error instanceof NotFoundError) {
    showNotFoundMessage();
  } else if (error instanceof UnauthorizedError) {
    redirectToLogin();
  } else {
    showGenericError('Something went wrong');
  }
}
```

## 📊 Data Models

The services package works with the consolidated `@tickt-ltd/types` package:

### Recipe Types
- `Recipe`, `Ingredient`, `Instruction`, `NutritionalInfo` models
- `Difficulty` enums and recipe filters
- Create/Update DTOs for type safety

### Meal Plan Types
- `WeekMealPlan`, `DayMealPlan`, `MealPlanItem` models
- `MealPlanNutritionalInfo` and filtering interfaces
- Create/Update DTOs for meal planning

### User Types
- `UserProfile` with health metrics and preferences
- Activity level, diet goal, and body type enums
- Profile management DTOs

### Chat Types
- `ChatSession`, `ChatMessage`, `ChatParticipant` models
- Message and session status enums
- Chat management DTOs

### Nutrition Types
- Allergen, cuisine, diet type enums
- Meal type and macro tracking enums
- Diet filtering interfaces

## 🧪 Testing

### Mock Services

```typescript
import { IRecipeService } from '@tickt-ltd/services';

const mockRecipeService: IRecipeService = {
  getById: jest.fn().mockResolvedValue(mockRecipe),
  create: jest.fn().mockResolvedValue(mockRecipe),
  search: jest.fn().mockResolvedValue(mockPaginatedResult),
  update: jest.fn().mockResolvedValue(mockRecipe),
  delete: jest.fn().mockResolvedValue(undefined),
};

// Use in tests
serviceFactory.registerServices({
  RecipeService: () => mockRecipeService
});
```

### Integration Tests with Firebase Emulator

```typescript
// Test with Firebase emulator
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
process.env.NODE_ENV = 'test';

const services = initializeNodeFirestoreServices(firebaseModules, {
  environment: Environment.TEST
});
```

## 🚀 Deployment

### Development Deployment
```bash
# Deploy to development environment (tickt-90f02)
npm run deploy:dev
```

### Production Deployment  
```bash
# Deploy to production environment (tickt-prod) 
# Includes confirmation prompts for safety
npm run deploy:prod
```

### Environment Variables
```bash
# Set environment for deployment
export NODE_ENV=production
export FIREBASE_ENV=production

# Verify environment
echo $NODE_ENV
echo $FIREBASE_ENV
```

## 🔄 Migration Guide

### From App-Specific Services

```typescript
// Before: App-specific service
import { DBServices } from '../services/DBServices';
const dbService = new DBServices();
const beforeRecipes = await dbService.searchRecipes(filter);

// After: Shared service
import { initializeFirestoreServices } from '@tickt-ltd/services';
const services = initializeFirestoreServices(firebaseModules);
const recipeService = services.getRecipeService();
const recipes = await recipeService.search(filter);
```

### From Direct Firebase Usage

```typescript
// Before: Direct Firebase
import firestore from '@react-native-firebase/firestore';
const snapshot = await firestore().collection('recipes').get();

// After: Service layer with consolidated types
import { Recipe, RecipeFilter } from '@tickt-ltd/types';
const recipeService = services.getRecipeService();
const recipes: Recipe[] = await recipeService.search();
```

## 📈 Best Practices

### 1. Use Service Factory Pattern

```typescript
// ✅ Good - Use service factory
const recipeServiceUsingFactory = serviceFactory.getRecipeService();

// ❌ Bad - Direct instantiation  
const recipeServiceDirectInstatation = new FirestoreRecipeService(logger, adapter);
```

### 2. Handle Errors Specifically

```typescript
// ✅ Good - Specific error handling
try {
  const recipe = await recipeService.create(data, userId);
} catch (error) {
  if (error instanceof ValidationError) {
    showValidationErrors(error.fieldErrors);
  } else {
    showGenericError();
  }
}
```

### 3. Use Pagination for Large Datasets

```typescript
// ✅ Good - Paginated requests
const result = await recipeService.search(filter, { 
  limit: 20,
  lastDoc: previousResult.lastDoc 
});

if (result.hasMore) {
  // Show "Load More" button
}
```

### 4. Configure Logging Appropriately

```typescript
// Development - Verbose logging
const servicesVerboseLogging = initializeFirestoreServices(firebase, {
  logLevel: LogLevel.DEBUG,
  enableMetrics: true
});

// Production - Minimal logging
const servicesMinimalLogging = initializeFirestoreServices(firebase, {
  logLevel: LogLevel.ERROR,
  enableMetrics: false
});
```

## 🏷️ Version History

- **v1.0.0** - Initial release with recipe and user services
- **v1.1.0** - Added meal planning service and multi-environment support
- **v1.2.0** - Added chat session service and grouped data structures
- **v2.0.0** - Platform-agnostic architecture with service registry pattern
- **v2.1.0** - Extracted meal plan types and eliminated type redundancy
- **v2.2.0** - Consolidated all types into `@tickt-ltd/types` package

## 🤝 Contributing

1. Follow established patterns for new services
2. Implement proper error handling and logging  
3. Add comprehensive TypeScript types
4. Write tests for all functionality
5. Update documentation for new features
6. Use dependency injection patterns
7. Maintain platform agnosticism

## 📄 License

All rights reserved to Polytropic Ltd.
