#!/usr/bin/env ts-node

import { initializeApp } from 'firebase-admin/app';
import { Logger } from '@tickt-engineering/services';
import {
	BatchImageGenerationService,
	BatchGenerationOptions,
} from '../src/services/batch-image-generation.service';
import {
	ImageQuality,
	ImageSize,
	ImageStyle,
} from '../src/index';

// Configure environment
const setupEnvironment = () => {
	process.env.GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT || process.env.FIREBASE_PROJECT_ID || 'tickt-90f02';
	process.env.GOOGLE_CLOUD_LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';
	process.env.GOOGLE_GENAI_USE_VERTEXAI = 'true';

	// Initialize Firebase Admin
	initializeApp({
		projectId: process.env.GOOGLE_CLOUD_PROJECT,
		storageBucket: `${process.env.GOOGLE_CLOUD_PROJECT}.firebasestorage.app`,
	});
};

// Parse command line arguments
const parseArguments = () => {
	const args = process.argv.slice(2);
	const options: BatchGenerationOptions = {
		maxConcurrency: 3,
		delayBetweenBatches: 2000,
		skipExistingImages: true,
		dryRun: false,
		quality: ImageQuality.HD,
		size: ImageSize.PORTRAIT_1024_1792,
		style: ImageStyle.NATURAL,
	};

	for (let i = 0; i < args.length; i += 2) {
		const flag = args[i];
		const value = args[i + 1];

		switch (flag) {
			case '--concurrency':
				options.maxConcurrency = parseInt(value, 10);
				break;
			case '--delay':
				options.delayBetweenBatches = parseInt(value, 10);
				break;
			case '--skip-existing':
				options.skipExistingImages = value.toLowerCase() === 'true';
				break;
			case '--dry-run':
				options.dryRun = value.toLowerCase() === 'true';
				break;
			case '--quality':
				options.quality = value as ImageQuality;
				break;
			case '--size':
				options.size = value as ImageSize;
				break;
			case '--style':
				options.style = value as ImageStyle;
				break;
			case '--help':
				printUsage();
				process.exit(0);
				break;
		}
	}

	return options;
};

const printUsage = () => {
	console.log(`
Usage: ts-node scripts/generate-all-recipe-images.ts [options]

Options:
  --concurrency <number>     Maximum concurrent image generations (default: 3)
  --delay <number>          Delay between batches in milliseconds (default: 2000)
  --skip-existing <boolean> Skip recipes that already have images (default: true)
  --dry-run <boolean>       Run without generating images (default: false)
  --quality <quality>       Image quality: standard | hd (default: hd)
  --size <size>            Image size: 1024x1024 | 1792x1024 | 1024x1792 (default: 1024x1024)
  --style <style>          Image style: natural | vivid (default: natural)
  --help                   Show this help message

Examples:
  # Generate images for all recipes without existing images
  ts-node scripts/generate-all-recipe-images.ts

  # Dry run to see what would be processed
  ts-node scripts/generate-all-recipe-images.ts --dry-run true

  # High throughput with lower delays
  ts-node scripts/generate-all-recipe-images.ts --concurrency 5 --delay 1000

  # Generate vivid HD images in landscape format
  ts-node scripts/generate-all-recipe-images.ts --quality hd --size 1792x1024 --style vivid

  # Process all recipes including those with existing images
  ts-node scripts/generate-all-recipe-images.ts --skip-existing false
`);
};

const formatDuration = (milliseconds: number): string => {
	const seconds = Math.floor(milliseconds / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);

	if (hours > 0) {
		return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
	} else if (minutes > 0) {
		return `${minutes}m ${seconds % 60}s`;
	} else {
		return `${seconds}s`;
	}
};

const printSummary = (result: any, options: BatchGenerationOptions) => {
	const successRate = result.totalRecipes > 0 ? (result.successCount / result.totalRecipes * 100).toFixed(1) : '0';
	const avgTimePerImage = result.successCount > 0 ? (result.duration / result.successCount / 1000).toFixed(2) : '0';

	console.log(`
🎉 Batch Image Generation Complete!
=====================================
📊 Summary:
   Total Recipes: ${result.totalRecipes}
   ✅ Successful: ${result.successCount}
   ❌ Failed: ${result.failureCount}
   ⏭️  Skipped: ${result.skippedCount}
   📈 Success Rate: ${successRate}%

⏱️  Performance:
   Total Duration: ${formatDuration(result.duration)}
   Average per Image: ${avgTimePerImage}s
   Concurrency: ${options.maxConcurrency}
   Delay Between Batches: ${options.delayBetweenBatches}ms

🖼️  Image Settings:
   Quality: ${options.quality}
   Size: ${options.size}
   Style: ${options.style}
   Provider: Google Imagen 4
`);

	if (result.errors.length > 0) {
		console.log(`❌ Errors (${result.errors.length}):`);
		result.errors.slice(0, 10).forEach((error: any, index: number) => {
			console.log(`   ${index + 1}. Recipe ${error.recipeId}: ${error.error}`);
		});
		if (result.errors.length > 10) {
			console.log(`   ... and ${result.errors.length - 10} more errors`);
		}
	}

	console.log('\n🏁 Generation complete! Check Firebase Storage for the generated images.');
};

async function main() {
	const logger = new Logger('GenerateAllRecipeImages');

	try {
		// Setup
		logger.info('🚀 Starting batch recipe image generation');
		setupEnvironment();
		const options = parseArguments();

		// Validate options
		if (options.maxConcurrency! < 1 || options.maxConcurrency! > 10) {
			throw new Error('Concurrency must be between 1 and 10');
		}

		if (options.delayBetweenBatches! < 0) {
			throw new Error('Delay between batches cannot be negative');
		}

		// Log configuration
		logger.info('Configuration', {
			project: process.env.GOOGLE_CLOUD_PROJECT,
			location: process.env.GOOGLE_CLOUD_LOCATION,
			bucket: `${process.env.GOOGLE_CLOUD_PROJECT}.firebasestorage.app`,
			options,
		});

		if (options.dryRun) {
			console.log('🧪 DRY RUN MODE - No images will be generated');
		}

		// Create service and run generation
		const batchService = new BatchImageGenerationService();

		console.log('📋 Starting image generation process...');
		const result = await batchService.generateImagesForAllRecipes(options);

		// Print summary
		printSummary(result, options);

		// Exit with appropriate code
		const exitCode = result.failureCount > 0 ? 1 : 0;
		process.exit(exitCode);

	} catch (error) {
		logger.error('❌ Batch generation failed', error instanceof Error ? error : new Error(String(error)));
		console.error(`\n❌ Fatal Error: ${error instanceof Error ? error.message : String(error)}`);
		process.exit(1);
	}
}

// Handle graceful shutdown
process.on('SIGINT', () => {
	console.log('\n⚠️  Received interrupt signal. Shutting down gracefully...');
	process.exit(0);
});

process.on('unhandledRejection', (reason, promise) => {
	console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
	process.exit(1);
});

// Run the script
if (require.main === module) {
	main();
}
