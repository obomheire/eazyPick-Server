import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";

const errorHandler = () => {
  return (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (typeof err === "string") {
      // custom application error
      return res.status(400).json({ message: "Something went wrong" });
    }

    if (err.name === "ValidationError") {
      // mongoose validation error
      return res.status(400).json({ message: err });
    }

    if (err.name === "UnauthorizedError") {
      // jwt authentication error
      return res.status(401).json({ message: "User is not authorized" });
    }

    // default to 500 server error
    return res.status(500).json({ message: err });
  };
};

export default errorHandler;
