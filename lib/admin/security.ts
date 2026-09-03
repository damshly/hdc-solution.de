import path from "path";

const DEFAULT_ADMIN_SECRET = "hdc-admin-secret-key-2026";

export const ALLOWED_CONFIG_FILES = [
  "config/site.json",
  "config/services.json",
  "config/faq.json",
  "constants/settings.json",
];

export function getExpectedAdminSecret(): string {
  return process.env.ADMIN_SECRET || DEFAULT_ADMIN_SECRET;
}

export function validateAdminSecret(req: Request): boolean {
  const expectedSecret = getExpectedAdminSecret();
  
  const headerSecret = req.headers.get("x-admin-secret");
  if (headerSecret && headerSecret === expectedSecret) {
    return true;
  }

  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7).trim();
    if (token === expectedSecret) {
      return true;
    }
  }

  return false;
}

export function sanitizeAndValidatePath(relativePath: string): { safe: boolean; fullPath: string; error?: string } {
  const normalizedPath = path.normalize(relativePath).replace(/^(\.\.[\/\\])+/, "");
  const rootDir = process.cwd();
  const fullPath = path.resolve(rootDir, normalizedPath);

  if (!fullPath.startsWith(rootDir)) {
    return { safe: false, fullPath, error: "Path traversal detected." };
  }

  const relativeFromRoot = path.relative(rootDir, fullPath);

  const isAllowedConfigFile = ALLOWED_CONFIG_FILES.includes(relativeFromRoot.replace(/\\/g, "/"));
  const isUploadDir = relativeFromRoot.startsWith("public/uploads") || relativeFromRoot.startsWith("public/images");

  if (!isAllowedConfigFile && !isUploadDir) {
    return { safe: false, fullPath, error: "Access to the requested path is not allowed." };
  }

  return { safe: true, fullPath };
}
