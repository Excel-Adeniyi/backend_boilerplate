import { NextFunction, Request, Response } from "express";


export class AdminController{
    async onAdminCreate(req: Request, res: Response, next: NextFunction){
        try {
            const payload = req.body;
            return res.status(200).json(payload)
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