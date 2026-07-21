"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const bcrypt_1 = require("./common/utils/bcrypt");
const db_1 = require("./config/db");
const env_1 = require("./config/env");
const mail_1 = require("./config/mail");
const admin_repository_1 = require("./modules/admin/repositories/admin.repository");
const SUPER_ADMIN_EMAIL = "admin@finscrybe.io";
const SUPER_ADMIN_PASSWORD = "admin12345";
const seedSuperAdmin = async () => {
    const hashedPassword = await (0, bcrypt_1.hashValue)(SUPER_ADMIN_PASSWORD);
    const existingSuperAdmin = await admin_repository_1.adminRepository.findByEmail(SUPER_ADMIN_EMAIL);
    if (!existingSuperAdmin) {
        console.log("Seeding initial Super Admin...");
        await admin_repository_1.adminRepository.create({
            fullName: "Super Admin",
            email: SUPER_ADMIN_EMAIL,
            password: hashedPassword,
            phoneNumber: "+1234567890",
            profilePhoto: "",
        });
        console.log("Super Admin seeded (admin@finscrybe.io / admin12345)");
        return;
    }
    // just Keeping the seeded super admin credentials predictable for development.
    await admin_repository_1.adminRepository.updateById(existingSuperAdmin._id.toString(), {
        password: hashedPassword,
        fullName: "Super Admin",
        phoneNumber: "+1234567890",
        profilePhoto: "",
        isActive: true,
    });
};
const startServer = async () => {
    try {
        await (0, db_1.connectDB)();
        await seedSuperAdmin();
        await (0, mail_1.verifyMailConnection)();
        app_1.default.listen(env_1.env.PORT, () => {
            console.log(`Server running on port ${env_1.env.PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to start server");
        if (error instanceof Error) {
            console.error(error.message);
        }
        process.exit(1);
    }
};
startServer();
