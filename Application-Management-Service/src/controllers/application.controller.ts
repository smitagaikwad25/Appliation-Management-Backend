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

    async getAllApplication(req: Request, res: Response) {
        try {
            if (req.body.role != 'admin' && req.body.role != 'hr' && req.body.role != 'reviewer') {
                return res.status(401).json({
                    code: 401,
                    success: false,
                    message: "You are not authorized to perform this action",
                });

            }
            const applications = await this.applicationService.getAllApplication(req.query);
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

            if (isNaN(id)) {
                return res.status(400).json({
                    code: 400,
                    success: false,
                    message: "Invalid application ID",
                });
            }

            if (role !== "admin" && role !== "hr") {
                return res.status(401).json({
                    code: 401,
                    success: false,
                    message: "You are not authorized to perform this action",
                });
            }


            const updateData: any = {};
            if (fullName) updateData.fullName = fullName;
            if (email) updateData.email = email;
            if (phone) updateData.phone = phone;
            if (position) updateData.position = position;
            if (status) updateData.status = status;
            if (resumeFile) updateData.resumeUrl = resumeFile.path;

            const updatedApplication = await this.applicationService.updateApplication(id, updateData);
            return res.status(updatedApplication.code).json(updatedApplication);
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
            const id = parseInt(req.params.id);

            if (req.body.role != ' admin' && req.body.role != 'hr' && req.body.role != 'reviewer') {
                return res.status(401).json({
                    code: 401,
                    success: false,
                    message: "You are not authorized to perform this action",
                });

            }

            const application = await this.applicationService.getApplication(id);

            return res.status(application.code).json(application);

        } catch (error: any) {
            const statusCode = error?.code || 500;
            return res.status(statusCode).json({
                code: statusCode,
                message: error?.message || "Internal Server Error",
            });
        }
    }

    async deleteApplication(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);

            if (req.body.role != ' admin' && req.body.role != 'hr') {
                return res.status(401).json({
                    code: 401,
                    success: false,
                    message: "You are not authorized to perform this action",
                });

            }

            const application = await this.applicationService.deleteApplication(id);

            return res.status(application.code).json(application);

        } catch (error: any) {
            const statusCode = error?.code || 500;
            return res.status(statusCode).json({
                code: statusCode,
                message: error?.message || "Internal Server Error",
            });
        }
    }

    async updateApplicationStatus(req: Request, res: Response) {
        try {
            const { status, role } = req.body;
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                return res.status(400).json({ code: 400, success: false, message: "Invalid application ID" });
            }

            // Only admin or HR can update status
            if (role !== "admin" && role !== "reviewer") {
                return res.status(401).json({ code: 401, success: false, message: "You are not authorized" });
            }

            const updatedApplication = await this.applicationService.updateApplicationStatus(id, status);

            return res.status(updatedApplication.code).json(updatedApplication);

        } catch (error: any) {
            const statusCode = error?.status || 500;
            return res.status(statusCode).json({
                code: statusCode,
                success: false,
                message: error?.message || "Internal Server Error",
            });
        }
    }

}

export default ApplicationController;
