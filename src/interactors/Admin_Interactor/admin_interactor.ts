import { IAdminInteractor } from "../../interfaces/Admin_Interface/i_admin_interactor";




export class AdminInteractor implements IAdminInteractor {
    async createAdmin(username: string, password: string, name: string, phone: number, email: string) {
        const payload = {
            username, password, name, phone, email,
        }
        const data = await this.repository.create(payload)
        return data
    }
    async updateAdmin(id: number, password: string) {
        const payload = {
            id, password
        }
        const data = await this.repository.update(payload)
        return data
    }
    async loginAdmin(username: string, password: string) {
        const payload = {
            username, password
        }
        const data = await this.repository.login(payload)
        return data
    }

}