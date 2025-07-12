import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  console.error('[MongoDB] ❌ MONGODB_URI environment variable is missing!');
  throw new Error('Please define the MONGODB_URI environment variable');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Define a type for the global object with mongoose property
interface GlobalWithMongoose extends Global {
  mongoose?: MongooseCache;
}

// Use the typed global object
let cached: MongooseCache = (global as GlobalWithMongoose).mongoose || { conn: null, promise: null };

if (!cached) {
  cached = (global as GlobalWithMongoose).mongoose = { conn: null, promise: null };
}

async function timeoutPromise<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`[MongoDB] ❌ Connection timed out after ${ms}ms`));
    }, ms);
    promise.then(
      (val) => {
        clearTimeout(timer);
        resolve(val);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    console.log('[MongoDB] ✅ Using cached connection');
    return cached.conn;
  }
  if (!cached.promise) {
    console.log('[MongoDB] ⏳ Connecting to MongoDB Atlas...');
    cached.promise = timeoutPromise(
      mongoose.connect(MONGODB_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 10000,
      }),
      15000 // 15 seconds
    )
      .then((mongoose) => {
        console.log('[MongoDB] ✅ Connected to MongoDB Atlas');
        return mongoose;
      })
      .catch((err) => {
        console.error('[MongoDB] ❌ Connection error:', err);
        throw err;
      });
  }
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    cached.promise = null;
    throw err;
  }
}
