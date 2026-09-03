import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { ALLOWED_CONFIG_FILES, sanitizeAndValidatePath, validateAdminSecret } from "@/lib/admin/security";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!validateAdminSecret(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const targetFile = searchParams.get("file");

  if (!targetFile) {
    const fileList = await Promise.all(
      ALLOWED_CONFIG_FILES.map(async (relPath) => {
        const fullPath = path.resolve(process.cwd(), relPath);
        try {
          const stats = await fs.stat(fullPath);
          return {
            filename: relPath,
            name: path.basename(relPath),
            size: stats.size,
            lastModified: stats.mtime.toISOString(),
            exists: true,
          };
        } catch {
          return {
            filename: relPath,
            name: path.basename(relPath),
            size: 0,
            lastModified: null,
            exists: false,
          };
        }
      })
    );

    return NextResponse.json({ success: true, files: fileList });
  }

  const validation = sanitizeAndValidatePath(targetFile);
  if (!validation.safe) {
    return NextResponse.json({ error: validation.error || "Forbidden file path" }, { status: 403 });
  }

  try {
    const fileContent = await fs.readFile(validation.fullPath, "utf-8");
    let parsedContent: unknown = null;
    try {
      parsedContent = JSON.parse(fileContent);
    } catch {
      parsedContent = null;
    }

    return NextResponse.json({
      success: true,
      filename: targetFile,
      content: parsedContent ?? fileContent,
      raw: fileContent,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to read file";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!validateAdminSecret(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { filename, content } = body;

    if (!filename) {
      return NextResponse.json({ error: "Filename is required" }, { status: 400 });
    }

    if (content === undefined || content === null) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const validation = sanitizeAndValidatePath(filename);
    if (!validation.safe) {
      return NextResponse.json({ error: validation.error || "Forbidden file path" }, { status: 403 });
    }

    let stringToWrite = "";
    if (typeof content === "string") {
      try {
        const parsed = JSON.parse(content);
        stringToWrite = JSON.stringify(parsed, null, 2);
      } catch {
        stringToWrite = content;
      }
    } else {
      stringToWrite = JSON.stringify(content, null, 2);
    }

    await fs.writeFile(validation.fullPath, stringToWrite, "utf-8");

    return NextResponse.json({
      success: true,
      message: "File updated successfully",
      filename,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save file";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  return POST(req);
}
