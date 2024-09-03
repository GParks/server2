// from Claude.ai

const fs = require('fs').promises;
const path = require('path');

const getDocumentsFromFileSystem = async () => {
  try {
    const filePath = path.join(__dirname, 'documents.json');
    const data = await fs.readFile(filePath, 'utf8');
    const documents = JSON.parse(data);
    return documents;
  } catch (err) {
    console.error('Error reading documents file:', err);
    throw err;
  }
};

module.exports = {
  getDocumentsFromFileSystem,
};
