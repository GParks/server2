// module.exports.something = ...

const HTTP_OK      =       200;
const HTTP_ACCEPTED    =   201;
const HTTP_MOVED_PERM  =   301;
const HTTP_BAD_REQ    =    400;
const HTTP_NOT_FOUND   =   404;
const HTTP_NOT_ALLOWED  =  405;
const HTTP_I_AM_A_TEAPOT = 418;  // "The resulting entity body MAY be short and stout." (RFC-2324)
const HTTP_ERROR     =     500;

const appContext = "/myApp";
const pagesBase = appContext + "/pages";
const apiBaseUrl = appContext + "/api";
const docsApiRoot = apiBaseUrl + "/docs";

const docsAppHandler = (app) => {
// POST endpoint to save a large document
app.post(docsApiRoot, (req, res) => {
    const document = req.body;
    bucket.insertAsync(document._id, document)
      .then(() => {
        res.status(HTTP_ACCEPTED).json({ message: 'Document saved successfully' });
      })
      .catch((err) => {
        console.error('Error saving document:', err);
        res.status(HTTP_ERROR).json({ error: 'Failed to save document' });
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
  
}

const defaultLogReq = (req, rsp, next) => {
    console.log(">> ".concat(req.method, " ", req.url));
    if (req.url == "/") {
	console.log("    root");
        rsp.redirect(HTTP_MOVED_PERM, pagesBase);
	console.log("    redirecting to " + pagesBase);
    }
    // next();
};
  
// export default {
//     docsAppHandler,
//     defaultLogReq
// };  
