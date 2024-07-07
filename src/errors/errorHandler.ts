import { Request, Response } from "express";
import { DatabaseError } from "./db.errors";
import { NotFoundError } from "./notfounderror";
import { Unathorized } from "./unauthorized";




export function errorHandler(err: Error, req: Request, res: Response) {
    if(err instanceof DatabaseError){
        return res.status(400).json({success: false, message: err.message})
    }
    if(err instanceof NotFoundError){
        return res.status(404).json({success: false, message: err.message})
    }
    if(err instanceof Unathorized){
        return  res.status(401).json({success: false, message: err.message })
    }
    return res.status(500).json({success: false, message: "Internal Server Error"})
}