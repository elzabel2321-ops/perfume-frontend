import mongoose, { Schema } from "mongoose";

export type ResetRateLimitDocument = mongoose.Document & {
  email: string;
  lastRequestedAt: Date;
};

const ResetRateLimitSchema = new Schema<ResetRateLimitDocument>({
  email: { type: String, required: true, unique: true, lowercase: true },
  lastRequestedAt: { type: Date, required: true },
});

export function getResetRateLimitModel() {
  return (
    (mongoose.models.ResetRateLimit as mongoose.Model<ResetRateLimitDocument>) ||
    mongoose.model<ResetRateLimitDocument>(
      "ResetRateLimit",
      ResetRateLimitSchema
    )
  );
}
