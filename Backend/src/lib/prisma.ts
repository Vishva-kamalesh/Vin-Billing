import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);
const prismaClient = new PrismaClient({ adapter });

const SoftDeleteModels = [
  'User', 'Customer', 'Product', 'Supplier', 'Invoice', 
  'AmcContract', 'ServiceTicket', 'Lead'
];

export const prisma = prismaClient.$extends({
  query: {
    $allModels: {
      async findMany({ model, args, query }) {
        if (model && SoftDeleteModels.includes(model)) {
          args.where = { ...args.where, deleted_at: null };
        }
        return query(args);
      },
      async findFirst({ model, args, query }) {
        if (model && SoftDeleteModels.includes(model)) {
          args.where = { ...args.where, deleted_at: null };
        }
        return query(args);
      },
      async count({ model, args, query }) {
        if (model && SoftDeleteModels.includes(model)) {
          args.where = { ...args.where, deleted_at: null };
        }
        return query(args);
      },
      async delete({ model, args }) {
        if (model && SoftDeleteModels.includes(model)) {
          return (prismaClient as any)[model].update({
            ...args,
            data: { deleted_at: new Date() },
          });
        }
        return (prismaClient as any)[model].delete(args);
      },
      async deleteMany({ model, args }) {
        if (model && SoftDeleteModels.includes(model)) {
          return (prismaClient as any)[model].updateMany({
            ...args,
            data: { deleted_at: new Date() },
          });
        }
        return (prismaClient as any)[model].deleteMany(args);
      },
    },
  },
});
