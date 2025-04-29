#!/bin/bash
echo "Replacing API keys in script.js..."
node replace-keys.js
echo "Starting web server on port 5000..."
python -m http.server 5000