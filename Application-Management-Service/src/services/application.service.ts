import { Application } from '../models/application.model';  // ✅ already initialized here
import HttpStatus from 'http-status-codes';
import { ApplicationCreationAttributes } from '../models/application.model';

class ApplicationService {
  async createApplication(data: unknown) {
    try {
      const application = await Application.create(data);
      return {
        code:HttpStatus.CREATED,
        success:true,
        data:application,
        message:"Apllication ncreated sucessfully"
      };
    } catch (error: any) {
      throw {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message:'Failed to create application',
      };
    }
  }

  
}

export default ApplicationService;
