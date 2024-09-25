import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
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
    isBlocked:{
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);


UserSchema.pre('save', async function(next){
  this.updatedAt = new Date()
  if(!this.isModified('password')) return next()
  const hashedPassword = await bcrypt.hash(this.password, 10)
  this.password = hashedPassword
  next()
})


const userModel = mongoose.model('users',UserSchema)
export default userModel