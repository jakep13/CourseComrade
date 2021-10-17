const mongoose =require("mongoose");
const {MongoMemoryServer} = require("mongodb-memory-server");
var mongod = null;

/**
 * Connect to the in-memory database.
 */
const connect = async () => {
    mongod = await MongoMemoryServer.create();
    const uri =  mongod.getUri();

  const mongooseOpts = {
    useUnifiedTopology: true,
    // useCreateIndex: true,
    useNewUrlParser: true
    // useFindAndModify: false,
  };

  await mongoose.connect(uri, mongooseOpts);
};

/**
 * Drop database, close the connection and stop mongod.
 */
const close = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

/**
 * Remove all the data for all db collections.
 */
const clear = async () => {
  const collections = mongoose.connection.collections;

  // eslint-disable-next-line no-restricted-syntax
  for (const collection of Object.values(collections)) {
    // eslint-disable-next-line no-await-in-loop
    await collection.deleteMany();
  }
};
module.exports = {connect : connect, close: close, clear : clear }

// export default {
//   connect,
//   close,
//   clear,
// };
