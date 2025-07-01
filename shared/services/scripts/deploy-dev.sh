#!/bin/bash

# Deploy to Development Environment (tickt-90f02)
echo "🚀 Deploying to DEVELOPMENT environment..."
echo "Project: tickt-90f02"
echo "========================================"

export NODE_ENV=development
export FIREBASE_ENV=development

echo "✅ Development deployment complete!"
echo "🔗 View at: https://console.firebase.google.com/project/tickt-90f02"
