import "express";

declare global {
  namespace Express {
    interface Request {
      user?: any; // or better: user?: JwtPayload | YourUserType
    }
  }
}
