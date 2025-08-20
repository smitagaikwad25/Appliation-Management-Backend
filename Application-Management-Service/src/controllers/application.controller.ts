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
}

export default ApplicationController;
