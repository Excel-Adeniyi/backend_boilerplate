import { RowDataPacket } from "mysql2";

export interface IAdminInteractor {
    createAdmin(username: string, password: string, name: string, phone: string, email: string): Promise<RowDataPacket[]>;
    updateAdmin(id: number, password: string): Promise<unknown>;
    loginAdmin(username: string, password: string): Promise<unknown>;
}
