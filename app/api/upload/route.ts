import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import path from "path";
import fs from "fs/promises";
import { auth } from "@/auth";

export const runtime = "nodejs";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const role = session?.user?.role;
    const isAdmin = role === "admin" || role === "admnin";

    if (!session || !isAdmin) {
      return NextResponse.json(
        { ok: false, message: "Admin access required." },
        { status: 403 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("image");

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json(
        { ok: false, message: "Please choose an image file." },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { ok: false, message: "Only JPG, PNG, WEBP, and GIF images are allowed." },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { ok: false, message: "Image must be 5MB or smaller." },
        { status: 400 }
      );
    }

    const extension =
      path.extname(file.name).toLowerCase() ||
      `.${file.type.split("/")[1] || "jpg"}`;
    const filename = `${Date.now()}-${randomBytes(8).toString("hex")}${extension}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    await fs.mkdir(uploadDir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(path.join(uploadDir, filename), buffer);

    return NextResponse.json({
      ok: true,
      url: `/uploads/${filename}`,
    });
  } catch (error) {
    console.error(
      "Image upload failed.",
      error instanceof Error ? error.message : "unknown error"
    );
    return NextResponse.json(
      { ok: false, message: "Unable to upload image." },
      { status: 500 }
    );
  }
}
