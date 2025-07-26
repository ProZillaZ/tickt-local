# Meal Plan API

NestJS REST API for meal plan management with MongoDB. Provides CRUD operations for meal plans, recipes, and nutritional information.

## Features

- Full CRUD operations for meal plans
- Recipe support with union type handling
- MongoDB with Mongoose ODM
- Input validation and Swagger documentation
- Health checks and error handling

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- yarn

### Installation

```bash
# Install dependencies
yarn

# Copy environment variables
cp .env.example .env

# Edit .env with your MongoDB connection details
# MONGODB_URI=mongodb://localhost:27017/mealtickt
```

### Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The API will be available at:
- **API**: http://localhost:3000/api/v1
- **Swagger Documentation**: http://localhost:3000/api/docs
- **Health Check**: http://localhost:3000/api/v1/health

## API Endpoints

### Meal Plans

- `GET /api/v1/meal-plans` - Get all meal plans (with pagination and filtering)
- `GET /api/v1/meal-plans/:id` - Get a specific meal plan
- `POST /api/v1/meal-plans` - Create a new meal plan
- `PATCH /api/v1/meal-plans/:id` - Update a meal plan
- `DELETE /api/v1/meal-plans/:id` - Delete a meal plan
- `GET /api/v1/meal-plans/user/:userId` - Get meal plans for a specific user
- `GET /api/v1/meal-plans/date-range` - Get meal plans within a date range

### Health Checks

- `GET /api/v1/health` - General health status
- `GET /api/v1/health/ready` - Readiness check
- `GET /api/v1/health/live` - Liveness check

## Usage

The API supports two meal types:
- **Meal**: Simple meal with basic info
- **Recipe**: Detailed recipe with cooking instructions

See `/api/docs` for complete request/response examples and interactive testing.

## Data Models

- **WeekMealPlan**: Contains daily plans, nutritional info, dates, and metadata
- **DayMealPlan**: Holds meals/recipes array, nutritional totals, and free day flag
- **Meal**: Basic meal with type, ingredients, and nutrition
- **Recipe**: Detailed recipe with instructions, timing, tags, and nutrition

Refer to Swagger docs for complete schema definitions.

## Development

```bash
# Development
npm run start:dev
npm run start:debug

# Testing
npm run test
npm run test:e2e

# Code Quality
npm run lint
npm run format
```

## Environment Variables

Copy `.env.example` to `.env` and configure:
- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)

## License

All Rights Reserved - Tickt Ltd
