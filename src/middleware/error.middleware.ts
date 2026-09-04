import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("Unhandled error:", error);

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};