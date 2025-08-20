import express, { IRouter } from "express";
import ApplicationController  from "../controllers/application.controller"; 
import multer from "multer";
import path from "path";

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/resumes/"); // store resumes in uploads/resumes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});

// File filter for PDF only
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  fileFilter,
});

class ApplicationRoutes {
  private applicationController = new ApplicationController();
  private router = express.Router();

  constructor() {
    this.routes();
  }

  private routes = () => {
    
    this.router.post(
      "/",
      upload.single("resume"),
      this.applicationController.createApplication
    );
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default ApplicationRoutes;
