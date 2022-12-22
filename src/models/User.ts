import { Schema, model, Document } from "mongoose";

export interface IUser extends Document{
  client_id: string;
  name: string;
  email: string;
  password: string;
  isUserVerified: boolean;
}

const UserSchema: Schema = new Schema({
  client_id: {type: String},
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  isUserVerified: { type: Boolean, default: false },
});

export default model<IUser>("User", UserSchema);