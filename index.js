// copied, initially, "whole cloth" from Claude.ai
const express = require('express');
const bodyParser = require('body-parser');
const couchbase = require('couchbase');
const documentsModule = require('./documents');

const app = express();
const port = 3000;

// Couchbase connection options
const cluster = new couchbase.Cluster('couchbase://localhost', {
  username: 'username', // Replace with your Couchbase username
  password: 'password', // Replace with your Couchbase password
});

const bucket = cluster.bucket('rest-service'); // Replace with your bucket name

// Connect to Couchbase
bucket.waitUntilReady()
  .then(() => {
    console.log('Connected to Couchbase');

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to Couchbase:', err);
    process.exit(1);
  });

// Parse JSON request bodies
app.use(bodyParser.json({ limit: '50mb' }));

// POST endpoint to save a large document
app.post('/documents', (req, res) => {
  const document = req.body;
  bucket.insertAsync(document._id, document)
    .then(() => {
      res.status(201).json({ message: 'Document saved successfully' });
    })
    .catch((err) => {
      console.error('Error saving document:', err);
      res.status(500).json({ error: 'Failed to save document' });
    });
});

// GET endpoint to retrieve documents from the file system
app.get('/documents', (req, res) => {
  documentsModule.getDocumentsFromFileSystem()
    .then((documents) => {
      res.json(documents);
    })
    .catch((err) => {
      console.error('Error retrieving documents:', err);
      res.status(500).json({ error: 'Failed to retrieve documents' });
    });
});
