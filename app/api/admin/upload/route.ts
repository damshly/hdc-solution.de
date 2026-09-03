import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { validateAdminSecret } from "@/lib/admin/security";

export const dynamic = "force-dynamic";

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "application/pdf",
];

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export async function GET(req: Request) {
  if (!validateAdminSecret(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const filenames = await fs.readdir(uploadDir);
    const mediaFiles = await Promise.all(
      filenames.map(async (filename) => {
        const filePath = path.join(uploadDir, filename);
        try {
          const stats = await fs.stat(filePath);
          if (!stats.isFile()) return null;
          return {
            filename,
            url: `/uploads/${filename}`,
            size: stats.size,
            uploadedAt: stats.mtime.toISOString(),
          };
        } catch {
          return null;
        }
      })
    );

    const validFiles = mediaFiles.filter((item): item is NonNullable<typeof item> => item !== null);
    validFiles.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

    return NextResponse.json({ success: true, files: validFiles });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to list uploads";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!validateAdminSecret(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = (formData.get("file") || formData.get("media")) as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json({ error: "File size exceeds 10MB limit" }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `File type ${file.type} is not allowed` },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const originalName = file.name;
    const ext = path.extname(originalName).toLowerCase();
    const baseName = path.basename(originalName, ext)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .replace(/-+/g, "-")
      .substring(0, 50);

    const timestamp = Date.now();
    const sanitizedFilename = `${baseName}-${timestamp}${ext}`;
    const destinationPath = path.join(uploadDir, sanitizedFilename);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await fs.writeFile(destinationPath, buffer);

    const publicUrl = `/uploads/${sanitizedFilename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: sanitizedFilename,
      size: file.size,
      mimeType: file.type,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to upload file";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
