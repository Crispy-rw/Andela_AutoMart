import { Pool } from 'pg';
import ENV from 'dotenv';

ENV.config();


const pool = (process.env.NODE_ENV == 'production') ? new Pool({ connectionString: process.env.DATABASE_URL }) : (process.env.NODE_ENV == 'development') ? new Pool({ connectionString: process.env.DB_URL }) : new Pool({ connectionString: process.env.TEST_DB_URL });
console.log(process.env.NODE_ENV);

export default pool;