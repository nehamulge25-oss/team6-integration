import { Request, Response, NextFunction } from "express";

const requests = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 60;

export const rateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const key = req.ip || "unknown";
  const now = Date.now();

  const current = requests.get(key);

  if (!current || now > current.resetAt) {
    requests.set(key, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });

    return next();
  }

  if (current.count >= MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      message: "Too many requests. Please try again later.",
    });
  }

  current.count++;

  return next();
};