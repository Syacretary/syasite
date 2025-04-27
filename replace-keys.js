#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the contents of script.js
const scriptPath = path.resolve(__dirname, 'script.js');
let scriptContent = fs.readFileSync(scriptPath, 'utf8');

// Replace placeholder with actual API key from environment
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error('Error: GEMINI_API_KEY environment variable is not set');
    process.exit(1);
}

// Replace the placeholder with the actual API key
scriptContent = scriptContent.replace('const API_KEY = "GEMINI_API_KEY";', `const API_KEY = "${apiKey}";`);

// Write the updated content back to script.js
fs.writeFileSync(scriptPath, scriptContent);
console.log('Successfully replaced API key in script.js');