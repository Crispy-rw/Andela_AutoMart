import { Pool } from 'pg';
import ENV from 'dotenv';

ENV.config();

// if(process.env.NODE_ENV == 'development'){
    // module.exports  = new Pool({
	   //  connectionString: process.env.DB_URL
// 	});
// }else if(process.env.NODE_ENV == 'test'){
    module.exports = new Pool({
	    connectionString: process.env.TEST_DB_URL
	});
// }
