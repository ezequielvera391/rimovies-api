import { createPool, Pool } from 'mysql2/promise'
import dotenv from 'dotenv'
import { parseEnvValueToInt } from './helper/dbparseport'

dotenv.config()

const pool: Pool = createPool({
  host: process.env.HOST,
  port: parseEnvValueToInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
})

export default pool
