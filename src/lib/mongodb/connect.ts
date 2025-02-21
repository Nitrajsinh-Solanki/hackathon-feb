// hackathon-feb\src\lib\mongodb\connect.ts

import mongoose, { Mongoose } from 'mongoose'

if (!process.env.MONGODB_URI) {
  throw new Error('Add MONGODB_URI to .env.local')
}

const MONGODB_URI: string = process.env.MONGODB_URI

interface Cached {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: Cached | undefined;
}

let cached: Cached = global.mongoose || { conn: null, promise: null }

if (!global.mongoose) {
  global.mongoose = cached
}

export async function connectToDatabase() {
  try {
    if (cached.conn) {
      console.log('Using cached connection')
      return cached.conn
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
      }
      console.log('Connecting to MongoDB...')
      cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => m)
    }

    cached.conn = await cached.promise
    console.log('Successfully connected to MongoDB')
    return cached.conn
  } catch (e) {
    cached.promise = null
    console.error('MongoDB connection error:', e)
    throw e
  }
}
