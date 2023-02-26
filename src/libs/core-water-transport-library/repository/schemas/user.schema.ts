import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ type: String, trim: true, required: true })
  name: string;

  @Prop({ type: String, trim: true, required: true })
  phone: string;

  @Prop({ type: String, trim: true, required: true })
  password: string;

  @Prop({ type: String, trim: true })
  email: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  createdBy: User;

  @Prop({ type: Boolean, required: true })
  status: boolean;
}

const schema = SchemaFactory.createForClass(User);
export const UserSchema = schema;
