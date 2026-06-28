require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function seed() {
  try {
    const hashed = await bcrypt.hash('admin123', 10);
    await pool.query(`INSERT INTO "User" (id, name, email, phone, password, role, is_active, updated_at) VALUES ('123e4567-e89b-12d3-a456-426614174000', 'Super Admin', 'admin@vintech.com', '1234567890', '${hashed}', 'SUPER_ADMIN', true, NOW())`);
    console.log('Admin user seeded: admin@vintech.com / admin123');
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    pool.end();
  }
}
seed();
