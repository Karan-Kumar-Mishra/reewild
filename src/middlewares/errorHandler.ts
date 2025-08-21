import type { Request, Response, NextFunction } from "express";
import { MulterError } from "multer";

export class HttpError extends Error {
  status: number;
  details?: unknown;
  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export const notFound = (_req: Request, _res: Response, next: NextFunction) => {
  next(new HttpError(404, "Not Found"));
};

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const isDev = process.env.NODE_ENV !== "production";


  if (err instanceof MulterError) {
    return res.status(400).json({
      error: {
        message: `Upload error: ${err.message}`,
        code: err.code,
        status: 400,
      },
    });
  }

  
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      error: {
        message: err.message,
        status: err.status,
        details: err.details,
        ...(isDev && { stack: err.stack }),
      },
    });
  }


  const e = err as any;
  if (e?.name === "ZodError" && Array.isArray(e.issues)) {
    return res.status(422).json({
      error: {
        message: "Validation failed",
        status: 422,
        details: e.issues,
        ...(isDev && { stack: e.stack }),
      },
    });
  }


  const message = (e && (e.message as string)) || "Internal Server Error";
  return res.status(500).json({
    error: {
      message,
      status: 500,
      ...(isDev && { stack: e?.stack }),
    },
  });
}
