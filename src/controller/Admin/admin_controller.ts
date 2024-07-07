import { NextFunction, Request, Response } from "express";
import { AdminInteractor } from "../../interactors/Admin_Interactor/admin_interactor";
import { RowDataPacket } from "mysql2";


export class AdminController{
    private adminInteractor: AdminInteractor

    constructor(adminInteractor: AdminInteractor){
        this.adminInteractor = adminInteractor
    }
    async onAdminCreate(req: Request, res: Response, next: NextFunction){
        try {
            const {username, password, name, phone, email} = req.body;
            const admin: RowDataPacket[] = await this.adminInteractor.createAdmin(username, password, name, phone, email);
            if(admin[0].affectedRows === 1 ){
                return res.status(200).json({success: true, message: "Account creation successful"})
            }
          
        } catch (error) {
            next(error)
        }
    }
    async onAdminLogin(req: Request, res: Response, next: NextFunction){
        try {
            const payload = req.body
            return res.status(200).json(payload)
        } catch (error) {
            next(error)
        }
    }
    async onAdminUpdate(req: Request, res: Response, next: NextFunction){
        try {
            const payload = req.body
            return res.status(200).json(payload)
        } catch (error) {
            next(error)
        }
    }
}