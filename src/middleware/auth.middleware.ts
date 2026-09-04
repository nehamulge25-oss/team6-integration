import { Request, Response, NextFunction } from "express";
import { env } from "../config/env.js";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Authorization header is required",
    });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Invalid authorization format",
    });
  }

  const token = authHeader.substring(7).trim();

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Bearer token is required",
    });
  }

  if (!env.apiAuthToken) {
    console.error("API_AUTH_TOKEN is not configured");

    return res.status(500).json({
      success: false,
      message: "Server authentication is not configured",
    });
  }

  if (token !== env.apiAuthToken) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  next();
};