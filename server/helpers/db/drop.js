import pool from './pool';   

  const dropAll = `DROP TABLE IF EXISTS public.users CASCADE;
  				   DROP TABLE IF EXISTS public.orders CASCADE;
  				   DROP TABLE IF EXISTS public.cars CASCADE`;

	   pool.query(dropAll)
      .then((res) => {
        pool.end();
      })
      .catch((err) => {
        pool.end();
      });


