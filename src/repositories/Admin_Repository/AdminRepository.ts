import { Pool, QueryResult, RowDataPacket } from "mysql2/promise";
import { AdminDetails } from "../../entities/Admin_Entity/admin_details";
import { IAdminRepository } from "../../interfaces/Admin_Interface/i_admin_repository";
import { DatabaseError } from "../../errors/db.errors";



export class AdminRepository implements IAdminRepository {
    protected pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loginAdmin(username: string, password: string): Promise<AdminDetails | RowDataPacket[] | QueryResult> {
        throw new Error("Method not implemented.");
    }
    async createAdmin(payload: AdminDetails): Promise<AdminDetails | RowDataPacket[] | QueryResult> {
        const countquery1 = 'SELECT COUNT (*) as count FROM account WHERE username = ?'
        const countquery2 = 'SELECT COUNT (*) as count FROM admin_info WHERE email = ?'
        const countquery3 = 'SELECT COUNT (*) as count FROM admin_info WHERE phone = ?'

        const insertquery1 = 'INSERT INTO account (username, password) VALUES (?,?)';
        const params1 = [payload.username, payload.password];
        const selectquery2 = 'SELECT id FROM account WHERE username = ? AND password = ? '
        const insertquery3 = 'INSERT INTO admin_info (name, phone, email, account_id) VALUES(? ,? ,? ,?)'
        const connection = await this.pool.getConnection();

        try {
            connection.beginTransaction()
            const [SELECTCOUNT] = await connection.execute(countquery1, [payload.username])
            const selectcounts = SELECTCOUNT as RowDataPacket[]
            if (selectcounts[0].count > 0) {
                connection.rollback()
                throw new DatabaseError('user already exist')
            }
            await connection.execute(insertquery1, params1);

            const [selectResults] = await connection.execute(selectquery2, params1)
            const selectedResults = selectResults as RowDataPacket[]

            const [SELECTCOUNT2] = await connection.execute(countquery2, [payload.email])
            const selectcounts2 = SELECTCOUNT2 as RowDataPacket[]
            if (selectcounts2[0].count > 0) {
                connection.rollback()
                throw new DatabaseError('email already exist')
            }
            const [SELECTCOUNT3] = await connection.execute(countquery3, [payload.phone])
            const selectcounts3 = SELECTCOUNT3 as RowDataPacket[]
            if (selectcounts3[0].count > 0) {
                connection.rollback()
                throw new DatabaseError('phone already exist')
            }
            const [insertResult2] = await connection.execute(insertquery3, [payload.name, payload.phone, payload.email, selectedResults[0].id])
            await connection.commit()
            return insertResult2 as RowDataPacket[]
        } catch (error) {
            await connection.rollback()
            throw new DatabaseError(error as string)
        } finally {
            await connection.release()
        }
    }

    async updateAdmin(id: number, password: string): Promise<AdminDetails | QueryResult> {
        const query = 'UPDATE account SET password = ? WHERE id = ?'
        const params = [password, id]
        const connection = await this.pool.getConnection();
        try {
            const [updateResults] = await connection.execute(query, params)
            await connection.commit()
            return updateResults
        } catch (error) {
            await connection.rollback()
            throw new DatabaseError(error as string)
        } finally {
            await connection.release()
        }
    }

}
