import { Application } from '../models/application.model';  // ✅ already initialized here
import HttpStatus from 'http-status-codes';
import { ApplicationCreationAttributes } from '../models/application.model';

class ApplicationService {
    async createApplication(data: unknown) {
        try {
            const application = await Application.create(data);
            return {
                code: HttpStatus.CREATED,
                success: true,
                data: application,
                message: "Apllication ncreated sucessfully"
            };
        } catch (error: any) {
            throw {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to create application',
            };
        }
    }

    async getApplication(query: unknown) {
        try {
            const { page = "1", limit = "10", status, position} = query as {
                page?: string;
                limit?: string;
                status?: string;
                position?: string;
                name?: string;
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


}

export default ApplicationService;
