import * as dotenv from 'dotenv'
import { Pool, PoolOptions, createPool } from 'mysql2/promise'
dotenv.config()


const dbHost =  process.env.DB_HOST
const dbUser =  process.env.DB_USER
const dbPass =  process.env.DB_PASSWORD
const dbName =  process.env.DB_NAME
const dbPort = process.env.DB_PORT

const poolOptions: PoolOptions = {
    host: dbHost,
    user: dbUser,
    password: dbPass,
    database: dbName,
    port: dbPort ? parseInt(dbPort, 10) : undefined,
    connectionLimit: 10
}
// console.log(poolOptions)
const pool: Pool = createPool(poolOptions)
// console.log(pool)
export default pool