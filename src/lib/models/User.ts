// hackathon-feb\src\lib\models\User.ts

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    code: String,
    expiresAt: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export const User = mongoose.models.User || mongoose.model('User', userSchema)
