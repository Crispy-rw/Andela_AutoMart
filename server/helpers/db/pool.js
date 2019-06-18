import { Pool } from 'pg';
import ENV from 'dotenv';

ENV.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});


export default pool;