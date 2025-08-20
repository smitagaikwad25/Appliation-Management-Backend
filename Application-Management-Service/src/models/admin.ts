/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';

import { Model } from 'sequelize';
import { IAdminUser } from '../interfaces/admin.interface';

export default (sequelize: any, DataTypes: any) => {
  class AdminUser extends Model<IAdminUser> implements IAdminUser {
    public admin_id!: string;
    public email!: string;
    public password!: string;
    public role!: "admin" | "hr" | "reviewer";

    // timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      // define association here if needed
    }
  }

  AdminUser.init(
    {
      admin_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("admin", "hr", "reviewer"),
        allowNull: false,
       
      },
    },
    {
      sequelize,
      modelName: 'AdminUser',
      tableName: 'admin_users',
      timestamps: true,
      underscored: true, // created_at, updated_at
    }
  );

  return AdminUser;
};
