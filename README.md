# Tickt Monorepo

Tickt is a brand of applications, including smart diet generation, recipe management, and workout planning tools.

## Project Structure

This monorepo contains the following workspaces:

- `libs/`: Shared libraries and utilities
    - `diet-gen-lib/`: Library for generating personalized diet plans
- `apps/`: Frontend applications
    - `mealtickt/`: Smart diet generation app (planned)
    - `mealtickt-landing/`: Landing page of mealtickt
    - `recipetickt/`: Recipe management web app (planned)
    - `fitnesstickt/`: Smart workout generator (planned)
- `services/`: Backend services
    - `recipe-api/`: API for recipe generation and management
    - `coach-api/`: API for interacting with the nutrition coach

## Prerequisites

- Node.js (version 14.0.0 or later)
- npm (version 7.0.0 or later, for workspaces support)

## Getting Started

1. Clone the repository:
   ```
   git clone git@github.com:tickt-engineering/tickt.git
   cd tickt
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Build all projects:
   ```
   npm run build
   ```

4. Run tests:
   ```
   npm test
   ```

## Development

To work on a specific project:

1. Navigate to the project directory:
   ```
   cd libs/diet-gen-lib
   ```

2. Install project-specific dependencies (if any):
   ```
   npm install
   ```

3. Run project-specific scripts (check the project's package.json for available scripts)

## Contributing

Please follow these steps:

1. Create a new branch: `git checkout -b feature/your-feature-name`
2. Make your changes and commit them: `git commit -m 'Add some feature'`
3. Push to the branch: `git push origin feature/your-feature-name`
4. Submit a pull request

Please make sure to update tests as appropriate and adhere to the code style guidelines.

## License

All Rights Reserved - [LICENSE](../../LICENSE.txt)

## Contact

[Christos Demetriades] - [engineering@tickt.io]

Project Link: [https://github.com/tickt-engineering/tickt](https://github.com/tickt-engineering/tickt)
