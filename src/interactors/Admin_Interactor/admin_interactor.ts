// import { AdminDetails } from "../../entities/Admin_Entity/admin_details";
import { RowDataPacket } from "mysql2";
import { IAdminInteractor } from "../../interfaces/Admin_Interface/i_admin_interactor";
import { AdminLoginRepository } from "../../repositories/Admin_Repository/AdminLoginRepository";
import { AdminRepository } from "../../repositories/Admin_Repository/AdminRepository";




export class AdminInteractor implements IAdminInteractor {
    private repository: AdminRepository
    private loginRepository: AdminLoginRepository
    constructor(repository: AdminRepository, loginRepository: AdminLoginRepository) {
        this.repository = repository
        this.loginRepository = loginRepository
    }
    async createAdmin(username: string, password: string, name: string, phone: string, email: string) {
        const payload = {
            username, password, name, phone, email,
        }
        const data = await this.repository.createAdmin(payload)
        return data as RowDataPacket[]
    }
    async updateAdmin(id: number, password: string) {

        const data = await this.repository.updateAdmin(id, password)
        return data
    }
    async loginAdmin(username: string, password: string) {
        const data = await this.loginRepository.loginAdmin(username)
        console.log(data, password)
        return data
    }

}