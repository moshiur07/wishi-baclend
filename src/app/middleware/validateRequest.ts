import { NextFunction, Request, Response } from 'express';
// import { AnyZodObject, ZodEffects } from 'zod';
import catchAsync from '../utils/catchAsync';
import { ZodObject } from 'zod';

const validateRequest = (schema: ZodObject) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const parsedData = await schema.parseAsync({
            body: req.body,
            // cookies: req.cookies,
            // query: req.query,
            // params: req.params,
        });
        req.body = parsedData.body;
        next();
    });
};

export default validateRequest;
