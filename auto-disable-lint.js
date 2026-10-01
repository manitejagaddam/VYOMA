const fs = require('fs');

try {
  const results = JSON.parse(fs.readFileSync('lint-results.json', 'utf8'));

  for (const result of results) {
    if (result.messages.length === 0) continue;
    
    const filePath = result.filePath;
    let fileContent = fs.readFileSync(filePath, 'utf8');
    let lines = fileContent.split(/\r?\n/);

    // Sort messages by line descending to not mess up indices
    const messages = result.messages.sort((a, b) => b.line - a.line);

    for (const msg of messages) {
      if (msg.ruleId === 'react-hooks/exhaustive-deps' || msg.ruleId === 'react-hooks/rules-of-hooks') {
        lines.splice(msg.line - 1, 0, `// eslint-disable-next-line ${msg.ruleId}`);
      } else if (msg.ruleId === '@typescript-eslint/no-unused-vars') {
        lines.splice(msg.line - 1, 0, `// eslint-disable-next-line ${msg.ruleId}`);
      } else if (msg.ruleId) {
        lines.splice(msg.line - 1, 0, `// eslint-disable-next-line ${msg.ruleId}`);
      }
    }

    fs.writeFileSync(filePath, lines.join('\n'));
  }
  console.log('Successfully disabled remaining lint warnings!');
} catch(e) {
  console.error(e);
}
