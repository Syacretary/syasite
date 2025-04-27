
const fs = require('fs');
const path = require('path');

// Read the contents of script.js
const scriptPath = path.resolve(__dirname, 'script.js');
let scriptContent = fs.readFileSync(scriptPath, 'utf8');

// Replace placeholder with actual API key from environment
const apiKey = process.env.GEMINI_API_KEY || 'YOUR-API-KEY';

// Replace the placeholder with the actual API key
scriptContent = scriptContent.replace(/const API_KEY = "[^"]+";/, `const API_KEY = "${apiKey}";`);

// Write the updated content back to script.js
fs.writeFileSync(scriptPath, scriptContent);
console.log('Successfully replaced API key in script.js');
