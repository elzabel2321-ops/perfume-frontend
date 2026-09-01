import mongoose, { Schema } from "mongoose";

export type UserRole = "customer" | "admin";

export type UserDocument = mongoose.Document & {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
  role: UserRole;
  resetPasswordToken: string | null;
  resetPasswordExpires: Date | null;
  resetPasswordOtp: string | null;
  resetPasswordOtpExpires: Date | null;
  resetPasswordOtpAttempts: number;
  resetPasswordLastRequestedAt: Date | null;
};

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    avatarUrl: { type: String, default: "" },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    resetPasswordOtp: { type: String, default: null },
    resetPasswordOtpExpires: { type: Date, default: null },
    resetPasswordOtpAttempts: { type: Number, default: 0 },
    resetPasswordLastRequestedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export function getUserModel() {
  return (
    (mongoose.models.User as mongoose.Model<UserDocument>) ||
    mongoose.model<UserDocument>("User", UserSchema)
  );
}
