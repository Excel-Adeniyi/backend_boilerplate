import { QueryResult, RowDataPacket } from "mysql2";
import { AdminDetails } from "../../entities/Admin_Entity/admin_details";


export interface IAdminRepository {
    createAdmin(payload: AdminDetails): Promise<AdminDetails | unknown | QueryResult>
    updateAdmin(id: number, password: string): Promise<AdminDetails | RowDataPacket[] | QueryResult>
    loginAdmin(username: string, password: string): Promise<AdminDetails | QueryResult>
}