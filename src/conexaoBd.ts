import {Pool}  from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT || "5432"),
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD
});

//pool.connect().then(() => console.log("Conectado ao banco de dados")).catch((err) => console.log(err));


export default pool