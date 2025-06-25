import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.HOST,
  port: Number(process.env.PGPORT),
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

export async function fetchData(query: string, params?: unknown[]) {
  const client = await pool.connect();
  try {
    const res = await client.query(query, params);
    return res.rows;
  } finally {
    client.release();
  }
}
