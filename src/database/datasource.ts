import { PrismaClient } from "@/database/prisma/client";
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT) || 3306,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  ssl: process.env.DATABASE_SSLMODE === "require" ? { rejectUnauthorized: true } : undefined,
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

export default prisma;
