import { validationResult, ValidationError, Result } from "express-validator";
import { Request, Response, NextFunction } from "express";
import ResponseHandler from "../../utils/Response-Error-Handler/responseHandler";

const expressValidator = (req: Request, res: Response, next: NextFunction) => {
  try {
    const validate: any = validationResult(req);
    if (validate.errors.length !== 0) {
    ResponseHandler(res,400,false,null,validate.errors.map((error: ValidationError) => error.msg).join(", "));
     return;
    }
    next();
  } catch (error: any) {
     ResponseHandler(res, 500, false, null, error.message ? error.message : error);
 return;
    }
};

export default expressValidator;