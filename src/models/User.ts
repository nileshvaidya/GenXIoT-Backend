import { Schema, model, Document } from "mongoose";

export interface IUser extends Document{
  root_id: string;
  user_type: string;
  name: string;
  email: string;
  password: string;
  created: Date;
  created_by: string;
  updated: Date;
  updated_by: string;
  isActive: boolean;
}

const UserSchema: Schema = new Schema({
  root_id: { type: String },
  user_type:{type: String},
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  created: { type: Date, default: Date.now },
  created_by: { type: String },
  update: { type: Date },
  updated_by:{type:String},
  isActive: { type: Boolean, default: false },
});

export default model<IUser>("User", UserSchema);