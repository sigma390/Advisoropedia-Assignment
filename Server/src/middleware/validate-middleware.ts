import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

const validate = (schema: ZodSchema<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;

        next();
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ msg: error.errors[0].message });
        } else {
            res.status(500).json({ msg: "Internal server error" });
        }
    }
};

export default validate;