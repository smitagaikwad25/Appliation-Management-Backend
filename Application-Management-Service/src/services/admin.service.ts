import sequelize, { DataTypes } from '../config/database';
import { IAdminUser } from '../interfaces/admin.interface';
import admin from '../models/admin';
import  jwt  from 'jsonwebtoken';
import HttpStatus from 'http-status-codes';

// Mock users with roles
const mockUsers = [
  { email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { email: 'hr@example.com', password: 'hr123', role: 'hr' },
  { email: 'reviewer@example.com', password: 'reviewer123', role: 'reviewer' }
];

class AdminService{
  private Admin = admin(sequelize, DataTypes);

 // Mock login
  public login = async (email: string, password: string) => {
    try{
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return {
        code: HttpStatus.UNAUTHORIZED,
        success: false,
        message: 'Invalid credentials'
      };
    }

    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return {
      code: HttpStatus.OK,
      success:true,
      message: 'Login successful',
      data: {token:token, Name: user.email},
      };
    }catch(err: any){
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message:'Something went wrong during login'
      };
    }
  };
}

export default AdminService;
