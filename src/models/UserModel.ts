import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
  _id        : mongoose.Types.ObjectId;
  names      : string;
  lastnames  : string;
  age        : number;
  email      : string;
  password   : string;
}

const UserSchema = new Schema<User>({
  names: { type: String, required: true },
  lastnames: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export const UserModel = mongoose.model<User>('User', UserSchema);