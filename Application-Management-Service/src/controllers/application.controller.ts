import ApplicationService from "../services/application.service";
import { Request, Response } from "express";

class ApplicationController {
    private applicationService = new ApplicationService();

    async createApplication(req: Request, res: Response) {
        try {
            const { fullName, email, phone, position, role } = req.body;
            const resumeFile = req.file;

            if (role != ' admin' && role != 'hr') {
                return res.status(401).json({
                    code: 401,
                    success: false,
                    message: "You are not authorized to perform this action",
                });

            }

            if (!resumeFile) {
                return res.status(400).json({ code: 400, sucess: false, message: "Resume file is required" });
            }

            const newApplication = await this.applicationService.createApplication({
                fullName,
                email,
                phone,
                position,
                resumePath: resumeFile.path,
            });

            return res.status(newApplication.code).json(newApplication);
        } catch (error: any) {
            const statusCode = error?.code || 500;
            return res.status(statusCode).json({
                code: statusCode,
                message: error?.message || "Internal Server Error",
            });
        }
    }

    async getApplication(req: Request, res: Response) {
        try {
            if (req.body.role != ' admin' && req.body.role != 'hr' && req.body.role != 'reviewer') {
                return res.status(401).json({
                    code: 401,
                    success: false,
                    message: "You are not authorized to perform this action",
                });

            }
            const applications = await this.applicationService.getApplication(req.query);
            return res.status(applications.code).json(applications);
        } catch (error: any) {
            const statusCode = error?.code || 500;
            return res.status(statusCode).json({
                code: statusCode,
                message: error?.message || "Internal Server Error",
            });
        }
    }

    async updateApplication(req: Request, res: Response) {
        try {
            const { fullName, email, phone, position, status, role } = req.body;
            const resumeFile = req.file;
             const id = parseInt(req.params.id);
  

            if (role != ' admin' && role != 'hr') {
                return res.status(401).json({
                    code: 401,
                    success: false,
                    message: "You are not authorized to perform this action",
                });

            }
            
            const updatedApplication = await this.applicationService.updateApplication(id,{
                fullName,
                email,
                phone,
                position,
                status
                
                // resumePath: resumeFile.path,
            });

            return res.status(updatedApplication.code).json(updatedApplication);
        } catch (error: any) {
            const statusCode = error?.code || 500;
            return res.status(statusCode).json({
                code: statusCode,
                message: error?.message || "Internal Server Error",
            });
        }
    }

}

export default ApplicationController;
