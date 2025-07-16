# Batch Recipe Image Generation

This script generates high-quality, photorealistic images for all recipes in your Firestore database using Google Imagen 4.

## Features

- 🎯 **Modular & Extensible**: Clean separation of concerns with dedicated services
- 🚀 **Batch Processing**: Concurrent image generation with configurable concurrency
- 📊 **Progress Tracking**: Real-time progress updates and comprehensive statistics
- 🛡️ **Error Handling**: Robust error handling with detailed error reporting
- 🔧 **Configurable**: Extensive command-line options for customization
- 💾 **Storage Integration**: Automatic upload to Firebase Storage with organized folder structure
- 📋 **Database Updates**: Automatic Firestore updates with image metadata
- 🧪 **Dry Run Mode**: Test runs without generating actual images

## Quick Start

```bash
# Install dependencies
yarn install

# Run dry run to see what will be processed
yarn generate:dry-run

# Generate images for all recipes
yarn generate:all-images

# Generate with custom settings
yarn generate:all-images --concurrency 5 --quality hd --style vivid
```

## Usage

```bash
ts-node scripts/generate-all-recipe-images.ts [options]
```

### Command Line Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--concurrency` | number | 3 | Maximum concurrent image generations |
| `--delay` | number | 2000 | Delay between batches (milliseconds) |
| `--skip-existing` | boolean | true | Skip recipes that already have images |
| `--dry-run` | boolean | false | Run without generating images |
| `--quality` | string | hd | Image quality: `standard` \| `hd` |
| `--size` | string | 1024x1024 | Image size: `1024x1024` \| `1792x1024` \| `1024x1792` |
| `--style` | string | natural | Image style: `natural` \| `vivid` |
| `--help` | - | - | Show help message |

### Examples

```bash
# Basic usage - generate HD images for recipes without existing images
yarn generate:all-images

# Dry run to preview what will be processed
yarn generate:all-images --dry-run true

# High throughput processing
yarn generate:all-images --concurrency 5 --delay 1000

# Generate vivid landscape images
yarn generate:all-images --quality hd --size 1792x1024 --style vivid

# Process ALL recipes (including those with existing images)
yarn generate:all-images --skip-existing false

# Conservative processing with lower concurrency
yarn generate:all-images --concurrency 2 --delay 3000
```

## Architecture

### Services

1. **BatchImageGenerationService** (`src/services/batch-image-generation.service.ts`)
   - Orchestrates the entire batch process
   - Manages concurrency and error handling
   - Provides progress tracking and statistics

2. **ImageGenerationService** (`src/services/image-generation.service.ts`)
   - Handles individual image generation
   - Manages provider abstraction (Google Imagen, OpenAI, etc.)
   - Integrates with storage services

3. **FirebaseStorageService** (`src/services/firebase-storage.service.ts`)
   - Handles image upload to Firebase Storage
   - Manages file organization and metadata
   - Generates public download URLs

4. **PromptBuilderService** (`src/services/prompt-builder.service.ts`)
   - Constructs optimized prompts from recipe data
   - Handles style and setting configurations
   - Ensures consistent prompt quality

### Data Flow

```
Firestore (Recipes) → BatchImageGenerationService → ImageGenerationService
                                ↓
PromptBuilderService → Google Imagen 4 → FirebaseStorageService
                                ↓
                          Firestore (Updated Recipes)
```

## Storage Structure

Images are stored in Firebase Storage with the following structure:

```
recipes/
├── {recipeId}/
│   └── {imageId}.png
```

Each recipe document in Firestore is updated with:
- `hasImage: true`
- `imageUrl: string` (Firebase Storage download URL)
- `imageId: string` (Unique image identifier)
- `imageGeneratedAt: Date`
- `imageMetadata: object` (Generation details)

## Error Handling

The script includes comprehensive error handling:

- **Network Issues**: Automatic retries for transient failures
- **API Limits**: Configurable delays and concurrency limits
- **Storage Errors**: Detailed error reporting with context
- **Validation Errors**: Input validation with helpful error messages
- **Graceful Shutdown**: SIGINT handling for clean termination

## Performance Considerations

### Recommended Settings

| Use Case | Concurrency | Delay | Notes |
|----------|-------------|-------|-------|
| Development | 2 | 3000ms | Conservative for testing |
| Production (Standard) | 3 | 2000ms | Balanced performance |
| High Volume | 5 | 1000ms | Maximum throughput |

### Imagen 4 Specifications

- **Quality**: HD (1024x1024, 1792x1024, 1024x1792)
- **Style**: Photorealistic with professional food photography
- **Provider**: Google Vertex AI (requires authentication)
- **Average Generation Time**: 8-12 seconds per image

## Monitoring & Logging

The script provides detailed logging and progress tracking:

```
📊 Summary:
   Total Recipes: 450
   ✅ Successful: 425
   ❌ Failed: 25
   📈 Success Rate: 94.4%

⏱️  Performance:
   Total Duration: 2h 15m 30s
   Average per Image: 12.5s
   Concurrency: 3
```

## Prerequisites

1. **Firebase Setup**
   ```bash
   # Authenticate with Google Cloud
   gcloud auth application-default login
   
   # Set environment variables
   export GOOGLE_CLOUD_PROJECT=your-project-id
   export GOOGLE_CLOUD_LOCATION=us-central1
   export GOOGLE_GENAI_USE_VERTEXAI=true
   ```

2. **Dependencies**
   - Node.js >= 14.0.0
   - Firebase Admin SDK
   - Google GenAI SDK
   - @tickt-ltd/services

3. **APIs Enabled**
   - Vertex AI API
   - Firebase Storage API
   - Firestore API

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   ```bash
   gcloud auth application-default login
   gcloud config set project your-project-id
   ```

2. **Quota Exceeded**
   - Reduce `--concurrency`
   - Increase `--delay`
   - Check Vertex AI quotas in Google Cloud Console

3. **Storage Bucket Not Found**
   - Verify bucket name in Firebase Console
   - Check Firebase Storage rules
   - Ensure bucket has proper permissions

4. **Firestore Permission Denied**
   - Verify Firestore rules allow system updates
   - Check service account permissions
   - Ensure proper IAM roles

## Security

- All API keys are managed through environment variables
- Firebase Storage uses secure download URLs
- Firestore updates use system-level authentication
- No sensitive data is logged or exposed

## Contributing

When extending this script:

1. Keep services modular and focused
2. Add comprehensive error handling
3. Include progress tracking for long operations
4. Update documentation and examples
5. Add unit tests for new functionality
