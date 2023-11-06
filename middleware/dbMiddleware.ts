// dbMiddleware.ts
import { Request, Response, NextFunction } from "express";
import Database from "./database";

const dbMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    (req as any).db = await Database.getInstance();
    next();
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(500).send("Internal Server Error");
  }
};

export default dbMiddleware;
