import * as JWT from 'jsonwebtoken'

import db from './../models'
import { RequestHandler, Response } from "express";
import { Request, NextFunction } from "express-serve-static-core";
import { JWT_SECRET } from './../library/Server/server';
import { UserInstance } from './../models/UserModel';

export const extractJwtMiddleware = (): RequestHandler => {

    return (req: Request, res: Response, next: NextFunction): void => {

        let authorization: string = req.get('authorization')
        let token: string = authorization ? authorization.split(' ')[1] : undefined

        req['context'] = {}
        req['context']['authorization'] = authorization

        if(!token) { return next() }

        JWT.verify(token, JWT_SECRET, (err, decoded: any) => {

            if(err) { return next() }

            db.User.findById(decoded.sub, {
                attributes: ['id', 'email']
            }).then((user: UserInstance) => {
                
                if(user) {
                    req['context']['user'] = {
                        id: user.get('id'),
                        email: user.get('email')
                    }
                }

                return next()
                
            })
        })

    }
}