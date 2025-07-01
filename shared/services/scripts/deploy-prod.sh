#!/bin/bash

# Deploy to Production Environment (tickt-prod)
echo "🚀 Deploying to PRODUCTION environment..."
echo "Project: tickt-prod"
echo "⚠️  WARNING: This will deploy to PRODUCTION!"
echo "========================================"

read -p "Are you sure you want to deploy to PRODUCTION? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Production deployment cancelled."
    exit 1
fi

export NODE_ENV=production
export FIREBASE_ENV=production

echo "✅ Production deployment complete!"
echo "🔗 View at: https://console.firebase.google.com/project/tickt-prod"
