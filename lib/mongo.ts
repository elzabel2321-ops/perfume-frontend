import mongoose from "mongoose";

const DEFAULT_MONGO_URI = "mongodb://127.0.0.1:27017/perfume-backend";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

global.mongooseCache = cache;

export function getMongoUri() {
  return process.env.MONGO_URI || process.env.MONGODB_URI || DEFAULT_MONGO_URI;
}

export async function connectMongo() {
  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(getMongoUri())
      .catch((error) => {
        cache.promise = null;
        throw error;
      });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}

export function usersCollection() {
  const db = mongoose.connection.db;
  if (!db) {
    throw new Error("MongoDB is not connected.");
  }
  return db.collection("users");
}
