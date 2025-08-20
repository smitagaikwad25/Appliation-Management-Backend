export interface IAdminUser {
  admin_id?: string;
  email: string;
  password: string;
  role: "admin" | "hr" | "reviewer";
  createdAt?: Date;
  updatedAt?: Date;
}
