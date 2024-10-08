import * as couchbase from 'couchbase'

const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_CONN_STR = process.env.DB_CONN_STR
const DB_BUCKET_NAME = process.env.DB_BUCKET_NAME

// if (!DB_USERNAME) {
//   throw new Error(
//     'Please define the DB_USERNAME environment variable inside dev.env',
//   )
// }

// if (!DB_PASSWORD) {
//   throw new Error(
//     'Please define the DB_PASSWORD environment variable inside dev.env',
//   )
// }

// if (!DB_CONN_STR) {
//   throw new Error(
//     'Please define the DB_CONN_STR environment variable inside dev.env',
//   )
// }

// if (!DB_BUCKET_NAME) {
//   throw new Error(
//     'Please define the DB_BUCKET_NAME environment variable inside dev.env',
//   )
// }

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.couchbase

if (!cached) {
  cached = global.couchbase = { conn: null }
}

const bucket = cluster.bucket('docs1'); // Replace with your bucket name

console.log("Couchbase bucket = "  + bucket)

// // Connect to Couchbase
// bucket.waitUntilReady()
//  .then(() => {
//     console.log('Connected to Couchbase');

//     // Start the server
//     app.listen(port, () => {
//       console.log(`Server is running on http://localhost:${port}`);
//     });
//   })
//   .catch((err) => {
//     console.error('Failed to connect to Couchbase:', err);
//     process.exit(1);
//   });

const collection = bucket.scope('test1').collection('docs')


async function createCouchbaseCluster() {
  if (cached.conn) {
    return cached.conn
  }

  // Use wan profile to avoid latency issues
  cached.conn = await couchbase.connect(DB_CONN_STR, {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    configProfile: 'wanDevelopment',
  })

  return cached.conn
}

export async function connectToDatabase() {
  const cluster = await createCouchbaseCluster()
  const bucket = cluster.bucket(DB_BUCKET_NAME)
  const scope = bucket.scope('inventory')
  const airlineCollection = bucket.scope('inventory').collection('airline')
  const airportCollection = bucket.scope('inventory').collection('airport')
  const routeCollection = bucket.scope('inventory').collection('route')

  let dbConnection = {
    cluster,
    bucket,
    scope,
    airlineCollection,
    airportCollection,
    routeCollection,
  }

  return dbConnection
}
