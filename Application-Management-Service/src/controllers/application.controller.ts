import ApplicationService from "../services/application.service";
import { Request, Response } from "express";

class ApplicationController {
    private applicationService: ApplicationService;

    constructor() {
        this.applicationService = new ApplicationService(); // Initialize the service
    }

    // Arrow functions preserve 'this' when called from routes
    createApplication = async (req: Request, res: Response) => {
        try {
            const { fullName, email, phone, position } = req.body;
            const resumeFile = req.file;
            const role = (req as any).user?.role;

            if (!role || (role !== 'admin' && role !== 'hr')) {
                return res.status(401).json({
                    code: 401,
                    success: false,
                    message: "You are not authorized to perform this action",
                });
            }

            if (!resumeFile) {
                return res.status(400).json({
                    code: 400,
                    success: false,
                    message: "Resume file is required",
                });
            }

            const newApplication = await this.applicationService.createApplication({
                fullName,
                email,
                phone,
                position,
                resumeUrl: resumeFile.path,
            });

            return res.status(newApplication.code).json(newApplication);
        } catch (error: any) {
            const statusCode = error?.code || 500;
            return res.status(statusCode).json({
                code: statusCode,
                message: error?.message || "Internal Server Error",
            });
        }
    };

    getAllApplication = async (req: Request, res: Response) => {
        try {
            const role = (req as any).user?.role;
            if (!role || (role !== 'admin' && role !== 'hr' && role !== 'reviewer')) {
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
    };

    updateApplication = async (req: Request, res: Response) => {
        try {
            const { fullName, email, phone, position, status } = req.body;
            const resumeFile = req.file;
            const id = parseInt(req.params.id);
            const role = (req as any).user?.role;

            if (isNaN(id)) {
                return res.status(400).json({
                    code: 400,
                    success: false,
                    message: "Invalid application ID",
                });
            }

            if (!role || (role !== 'admin' && role !== 'hr')) {
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
    };

    getApplication = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            const role = (req as any).user?.role;

            if (!role || (role !== 'admin' && role !== 'hr' && role !== 'reviewer')) {
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
    };

    deleteApplication = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            const role = (req as any).user?.role;

            if (!role || (role !== 'admin' && role !== 'hr')) {
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
    };

    updateApplicationStatus = async (req: Request, res: Response) => {
        try {
            const { status } = req.body;
            const id = parseInt(req.params.id, 10);
            const role = (req as any).user?.role;

            if (isNaN(id)) {
                return res.status(400).json({ code: 400, success: false, message: "Invalid application ID" });
            }

            console.log("====================", role)

            if (role !== 'admin' && role !== 'reviewer') {
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
    };
}

export default ApplicationController;
