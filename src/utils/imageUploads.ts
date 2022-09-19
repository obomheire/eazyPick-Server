import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import { DestinationCallback, FileNameCallback } from "../utils/interface";

//File Storage
export const storage = multer.diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ): void => {
    callback(null, "public/uploads");
  },

  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ): void => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    const extension = file.mimetype.split("/")[1];
    callback(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

// File Filter
export const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};
