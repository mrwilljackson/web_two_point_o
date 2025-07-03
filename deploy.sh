#!/bin/bash

echo "🚀 Starting deployment to Vercel..."

# Build the site
echo "📦 Building static site..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Deployment aborted."
    exit 1
fi

echo "✅ Build completed successfully!"

# Create a temporary directory for deployment
TEMP_DIR=$(mktemp -d)
echo "📁 Created temporary directory: $TEMP_DIR"

# Copy dist contents to temp directory
cp -r dist/* "$TEMP_DIR/"

# Navigate to temp directory and initialize git
cd "$TEMP_DIR"
git init
git remote add origin https://github.com/mrwilljackson/web_two_point_o.git

# Add all files and commit
echo "📝 Committing files..."
git add .
git commit -m "Deploy static site - $(date '+%Y-%m-%d %H:%M:%S')"

# Push to remote (force push to overwrite)
echo "🌐 Pushing to GitHub..."
git push origin master --force

if [ $? -eq 0 ]; then
    echo "🎉 Deployment successful!"
    echo "🔗 Vercel should auto-deploy from GitHub in 1-2 minutes"
else
    echo "❌ Deployment failed!"
    exit 1
fi

# Clean up
cd - > /dev/null
rm -rf "$TEMP_DIR"
echo "🧹 Cleaned up temporary files"

echo "✨ Deployment complete!"
