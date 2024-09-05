// copied, initially, "whole cloth" from Claude.ai
// also via https://idx.google.com/
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2310447541.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2116284359.
const express = require('express')
const bodyParser = require('body-parser')
const couchbase = require('couchbase')
// const documentsModule = require('./documents')
// 2024-09-05: I don't even know what that was!
const cors = require('cors')

const app = express();
const port = 3000
const hostName = '127.0.0.1'

const appContext = "/myApp";
const pagesBase = appContext + "/pages"

const logRequest = (req, _res, next) => {
  console.log(">> ".concat(req.method, " ", req.url));
  next();
};



const add = (key, value) => {
  result =  collection.upsert(key, value).then((val) => {
    console.log("upsert done: " + val)
  }, (err) => {
    console.log("upsert failed: " + err)
  }
  ).catch((err) => {
    console.log("exception thrown from upsert: " + err)
  });  

  console.log("result = " + result)
}


function initApp() {
    app.use(cors());
    app.options("*", cors());
    app.use(bodyParser.urlencoded({
	extended: false
    }));
    app.use(bodyParser.json( { limit: '50mb' } ));
    app.use(express.urlencoded({ extended: true }));
    app.use(logRequest);
}

function initServices() {

}

initApp();
initServices();


// // Parse JSON request bodies
// app.use(bodyParser.json({ limit: '50mb' }));

const apiBaseUrl = appContext + "/api";
const docsApiRoot = apiBaseUrl + "/docs";

// POST endpoint to save a large document
app.post(docsApiRoot, (req, res) => {
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
app.get(docsApiRoot, (req, res) => {
  documentsModule.getDocumentsFromFileSystem()
    .then((documents) => {
      res.json(documents);
    })
    .catch((err) => {
      console.error('Error retrieving documents:', err);
      res.status(500).json({ error: 'Failed to retrieve documents' });
    });
});

app.listen(port, () => {
  console.log('\t listening at http://${hostName}:${port}')
})
