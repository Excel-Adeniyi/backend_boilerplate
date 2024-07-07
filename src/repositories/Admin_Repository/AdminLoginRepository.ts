import { Pool, QueryResult, RowDataPacket } from "mysql2/promise";
import { AdminDetails } from "../../entities/Admin_Entity/admin_details";
import { AdminRepository } from "./AdminRepository";
import { DatabaseError } from "../../errors/db.errors";


export class AdminLoginRepository extends AdminRepository{
    // private pool
    constructor(pool: Pool) {
        super(pool);
        // this.pool = pool;
    }
    async loginAdmin(username: string): Promise<AdminDetails | RowDataPacket[]  | QueryResult> {
        const query = 'SELECT password FROM account WHERE username = ?'
        const params = [username]

        const connection = await this.pool.getConnection();
        try {
            const [loginResults] = await connection.execute(query, params)
            await connection.commit()
            const rows = loginResults as RowDataPacket[]
            const data = rows[0]
            return data as RowDataPacket[]
        } catch (error) {
            await connection.rollback()
            throw new DatabaseError(error as string)
        } finally {
            await connection.release()
        }
    }

    
}