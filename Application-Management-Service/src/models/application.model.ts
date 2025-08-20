import { DataTypes, Model, Optional, Sequelize } from "sequelize";


export type ApplicationStatus = "applied" | "reviewed" | "rejected" | "hired";

export interface ApplicationAttributes {
    id: number;
    fullName: string;
    email: string;
    phone?: string;
    position: string;
    status: ApplicationStatus;
    resumeUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface ApplicationCreationAttributes extends Optional<ApplicationAttributes, "id"> { }

export class Application extends Model<ApplicationAttributes, ApplicationCreationAttributes>
    implements ApplicationAttributes {
    public id!: number;
    public fullName!: string;
    public email!: string;
    public phone?: string;
    public position!: string;
    public status!: "applied" | "reviewed" | "rejected" | "hired";
    public resumeUrl?: string;
}

export function initApplicationModel(sequelize: Sequelize): typeof Application {
    Application.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            fullName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [3, 100],
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    is: /^[0-9+\-() ]*$/i, // allow phone number format
                },
            },
            position: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM("applied", "reviewed", "rejected", "hired"),
                allowNull: false,
                defaultValue: "applied",
            },
            resumeUrl: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: "applications",
            timestamps: true,
        }
    );
    return Application;
}
