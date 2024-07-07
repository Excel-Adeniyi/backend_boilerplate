import { describe } from "@jest/globals"
import { AdminRepository } from "../../repositories/Admin_Repository/AdminRepository"
import pool from "../../config/dbConfig"
import { AdminLoginRepository } from "../../repositories/Admin_Repository/AdminLoginRepository"
import { AdminInteractor } from "../../interactors/Admin_Interactor/admin_interactor"
import { DatabaseError } from "../../errors/db.errors"



describe('Admin Interactor', () => {
    afterAll(async() => {
        await pool.end()
    })
    describe("login", () => {
        it("should be able to return data from repository", async() => {
            const adminRepo = new AdminRepository(pool)
            const loginRepo = new AdminLoginRepository(pool)
            const adminInteractor = new AdminInteractor(adminRepo, loginRepo)
            const userI = await adminInteractor.loginAdmin('testuser', 'testerpasser')
            expect(userI).not.toBeNull
        })
    })

    describe("create Admin", () =>{
        it("should be able to create admin account", async() => {
            const adminRepo = new AdminRepository(pool)
            const loginRepo = new AdminLoginRepository(pool)
            const adminInteractor = new AdminInteractor(adminRepo, loginRepo)
            try{
                const userData = await adminInteractor.createAdmin('testuserI',  'testpass', "Interactor tester", "09826352631", "1test@test.com" )
                expect(userData).toMatchObject({
                    affectedRows: 1
                })
            }catch (error) {
                if(error instanceof DatabaseError){
                    expect(error).toMatchSnapshot('[DatabaseError: DatabaseError: user already exist]')
                }
            }
        })
    })

    describe("update Admin", () => {
        it("should be able to update admin password", async() => {
            const adminRepo = new AdminRepository(pool)
            const loginRepo = new AdminLoginRepository(pool)
            const adminInteractor = new AdminInteractor(adminRepo, loginRepo)

            const recordInfo = await adminInteractor.updateAdmin(20, 'testpass2')
            expect(recordInfo).toMatchObject({
                affectedRows: 1
            })
        })
    })
})