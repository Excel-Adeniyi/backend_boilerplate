export interface IAdminInteractor {
    createAdmin(username: string, password: string, name: string, phone: number, email: string): Promise<unknown>;
    updateAdmin(id: number, password: string): Promise<unknown>;
    loginAdmin(username: string, password: string): Promise<unknown>;
}
