export const MongoDBConfiguration = () => ({
  mongoDBConnectionString:
    process.env.MONGO_CONNECTION_STRING ||
    'mongodb://localhost:27017/new-water-transport',
});
