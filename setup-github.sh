#!/bin/bash

# Epic Universe Mission - GitHub Setup Script for Mac/Linux
# Run this script from the epic-universe-mission folder

echo ""
echo "========================================"
echo "Operation Epic Universe Setup"
echo "========================================"
echo ""

# Initialize git if not already done
if [ ! -d .git ]; then
    echo "Initializing git repository..."
    git init
    git config user.name "superswiss"
    git config user.email "superswiss@epicuniverse.local"
    git branch -M main
else
    echo "Git already initialized"
fi

# Add remote
echo "Adding GitHub remote..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/superswiss/epic-universe-mission.git

# Add all files
echo ""
echo "Adding files to git..."
git add .

# Commit
echo "Committing files..."
git commit -m "Initial commit: Epic Universe Mission Briefing app" || echo "Files already committed"

# Push to GitHub
echo ""
echo "Pushing to GitHub..."
echo "Note: You will be prompted for authentication"
echo "Enter your GitHub token when prompted for password"
echo ""
git push -u origin main

echo ""
echo "========================================"
echo "Setup complete!"
echo "========================================"
echo ""
echo "Your repo is live at:"
echo "https://github.com/superswiss/epic-universe-mission"
echo ""
echo "Next steps:"
echo "1. Go to https://github.com/superswiss/epic-universe-mission"
echo "2. Go to Settings > Pages"
echo "3. Select 'GitHub Actions' as source"
echo "4. Wait 2-3 minutes for build to complete"
echo ""
echo "Your app will be live at:"
echo "https://superswiss.github.io/epic-universe-mission"
echo ""
