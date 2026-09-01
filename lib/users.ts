import { connectMongo, usersCollection } from "@/lib/mongo";

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function findUserByEmail(email: string) {
  await connectMongo();
  const users = usersCollection();
  return users.findOne({
    email: { $regex: `^${escapeRegex(email)}$`, $options: "i" },
  });
}

export async function updateUserById(
  id: unknown,
  update: Record<string, unknown>
) {
  await connectMongo();
  const users = usersCollection();
  return users.updateOne({ _id: id }, { $set: update });
}

export async function findUserByResetTokenHash(tokenHash: string) {
  await connectMongo();
  const users = usersCollection();
  return users.findOne({
    resetPasswordToken: tokenHash,
    resetPasswordExpires: { $gt: new Date() },
  });
}
