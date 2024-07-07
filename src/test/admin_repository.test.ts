
import { describe, it, expect } from '@jest/globals';
import pool from '../config/dbConfig'; // Adjust the import according to your project structure
import { AdminRepository } from '../repositories/Admin_Repository/AdminRepository';
import { AdminLoginRepository } from '../repositories/Admin_Repository/AdminLoginRepository';

describe('Admin Repository', () => {
    process.env.NODE_ENV = "test"
    afterAll(async () => {
        await pool.end()
    })
    describe('createAdmin', () => {

        it('should create a user', async () => {
            const adminRepo = new AdminRepository(pool)
            const userData = { username: 'testuser', password: 'testpass', name: "tester", phone: "09826352611", email: "test@test.com" };
            const user = await adminRepo.createAdmin(userData);

            expect(user).toMatchObject({
                affectedRows: 1,
            })
        });
    });

    describe('login the admin account', () => {
        it('should find a password by username', async () => {
            const loginRepo = new AdminLoginRepository(pool)


            const user = await loginRepo.loginAdmin('testuser');

            expect(user).toMatchSnapshot(
                [
                    {
                        password: "testpass"
                    }
                ]


            );
        });

        // it('should return null if no user found', async () => {
        //     const loginRepo = new AdminLoginRepository(pool)
        //     const user = await loginRepo.loginAdmin('testuser',);

        //     expect(user).to.be.null;
        // });
    });
});
