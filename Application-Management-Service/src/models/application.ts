// /* eslint-disable no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// 'use strict';

// import { Model } from 'sequelize';
// import { IApplication } from '../interfaces/application.interface';

// export default (sequelize: any, DataTypes: any) => {
//   class Application extends Model<IApplication> implements IApplication {
//     public application_id!: string;
//     public fullName!: string;
//     public email!: string;
//     public phone?: string;
//     public position!: string;
//     public status!: "applied" | "reviewed" | "rejected" | "hired";
//     public resumeUrl?: string;

//     // timestamps
//     public readonly createdAt!: Date;
//     public readonly updatedAt!: Date;

//     static associate(models: any) {
//       // define associations here if needed
//       // e.g., Application.belongsTo(models.AdminUser, { foreignKey: "createdBy" })
//     }
//   }

//   Application.init(
//     {
//       application_id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true,
//       },
//       fullName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           len: [3, 100],
//         },
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//         validate: {
//           isEmail: true,
//         },
//       },
//       phone: {
//         type: DataTypes.STRING,
//         allowNull: true,
//         validate: {
//           is: /^[0-9+\-() ]*$/i, // allow phone number format
//         },
//       },
//       position: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       status: {
//         type: DataTypes.ENUM("applied", "reviewed", "rejected", "hired"),
//         allowNull: false,
//         defaultValue: "applied",
//       },
//       resumeUrl: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//     },
//     {
//       sequelize,
//       modelName: 'Application',
//       tableName: 'applications',
//       timestamps: true, // adds createdAt and updatedAt
//       underscored: true, // created_at, updated_at
//     }
//   );

//   return Application;
// };
