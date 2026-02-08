import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "prisma/config";

const prismaDir = path.join(process.cwd(), "libs/models/blog-model/src/prisma");

function loadDatabaseUrl(): string {
  const envPath = path.join(process.cwd(), "libs/models/blog-model/.env");
  const content = fs.readFileSync(envPath, "utf8");
  const line = content.split("\n").find((l) => l.startsWith("DATABASE_URL="));
  if (!line) throw new Error(`DATABASE_URL not found in ${envPath}`);
  return line.replace(/^DATABASE_URL=/, "").trim();
}

export default defineConfig({
  schema: path.join(prismaDir, "schema.prisma"),
  migrations: { path: path.join(prismaDir, "migrations") },
  datasource: { url: loadDatabaseUrl() },
});
