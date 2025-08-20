import { date } from "@hapi/joi";
import { Application } from "../config/database";  // ✅ already initialized here
import HttpStatus from 'http-status-codes';


class ApplicationService {
    async createApplication(data: unknown) {
        try {
            
            const application = await Application.create(data);
            return {
                code: HttpStatus.CREATED,
                success: true,
                data: application,
                message: "Application created sucessfully"
            };
        } catch (error: any) {
            throw {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to create application',
            };
        }
    }

    async getAllApplication(query: unknown) {
        try {
            const { page = "1", limit = "10", status, position } = query as {
                page?: string;
                limit?: string;
                status?: string;
                position?: string
               
            };

            const pageNum = parseInt(page, 10);
            const limitNum = parseInt(limit, 10);
            const offset = (pageNum - 1) * limitNum;

            const where: any = {};
            if (status) where.status = status;
            if (position) where.position = position;


            const { rows, count } = await Application.findAndCountAll({
                where,
                limit: limitNum,
                offset,
            });

            return {
                success: true,
                code: HttpStatus.OK,
                message: "",
                data: {
                    total: count,
                    page: pageNum,
                    pages: Math.ceil(count / limitNum),
                    data: rows
                }
            };
        } catch (error: any) {
            throw {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to create application',
            };
        }
    }

    async updateApplication(id: number, data: unknown,) {
        try {
            const applicant = await Application.findByPk(id);

            if (!applicant) {
                return {
                    status: HttpStatus.NOT_FOUND,
                    message: "Applicant not found",
                };
            }

            await applicant.update(data);

            return {
                code: HttpStatus.CREATED,
                success: true,
                data: applicant,
                message: "Application updated successfully"
            };
        } catch (error: any) {
            throw {
                success: false,
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to update application',
            };
        }
    }

    async getApplication(id: number) {
        try {
            const application = await Application.findByPk(id);
            if (!application) {
                return {
                    code: HttpStatus.NOT_FOUND,
                    success: false,
                    message: "Application not found",
                };
            }
            return {
                code: HttpStatus.OK,
                success: true,
                date:application,
                message: "Application not found",
            };
        } catch (error: any) {
            throw {
                success: false,
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to get application',
            };
        }
    }

    async deleteApplication(id: number) {
        try {
            const application = await Application.findByPk(id);
            if (!application) {
                return {
                    code: HttpStatus.NOT_FOUND,
                    success: false,
                    message: "Application not found",
                };
            }
            await application.destroy();

            return {
                code: HttpStatus.OK,
                success: true,
                message: "Application deleted successfully",
            }

        } catch (error: any) {
            throw {
                success: false,
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to delete application',
            };
        }
    }

    async updateApplicationStatus(id: number, status: "hired" | "rejected") {
        const application = await Application.findByPk(id);
        if (!application) {
            return {
                success: false,
                code: HttpStatus.NOT_FOUND,
                message: "Application not found",
            };
        }

        application.status = status;
        await application.save();

        return {
            code: 200,
            success: true,
            message: "Application status updated successfully",
            data: application,
        };
    }

}

export default ApplicationService;
