const fs = require('fs');

function convertToJSON(inputFile, outputJsonFile) {
  const inputTex = fs.readFileSync(inputFile, 'utf8');
  const cleanedTex = cleanLatexContent(inputTex);
  const jsonOutput = parseLatexToJson(cleanedTex);
  fs.writeFileSync(outputJsonFile, JSON.stringify(jsonOutput, null, 2));

  console.log(`Conversion to JSON complete. JSON file: ${outputJsonFile}`);
}

function cleanLatexContent(latexContent) {
  // Remove LaTeX commands and comments, excluding newline characters
  const cleanedContent = latexContent.replace(/\\[^{}\s]+(?:{[^{}]*}|[^{}])?/g, match => (match.includes('\n') ? match : '')).replace(/%[^\n]*\n/g, '');
const spaceReplacedContent = cleanedContent.replace(/~/g, ' ');

  return spaceReplacedContent;
}

function parseLatexToJson(latexContent) {
  // Replace double backslashes with single backslashes
  const cleanedContent = latexContent.replace(/\\\\/g, '\\');
  
  // Implement your custom parsing logic here
  // This is a basic example; adjust based on your specific needs
  const jsonOutput = {
    content: cleanedContent.trim(),
  };

  return jsonOutput;
}

function main() {
  const inputFile = process.argv[2];

  if (!inputFile) {
    console.error('Usage: node app.js input.tex');
    process.exit(1);
  }

  const outputJsonFile = `${inputFile.replace('.tex', '')}.json`;

  convertToJSON(inputFile, outputJsonFile);
}

main();
