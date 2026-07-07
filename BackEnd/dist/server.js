"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const db_1 = require("./config/db");
const mail_1 = require("./config/mail");
const admin_repository_1 = require("./modules/admin/repositories/admin.repository");
const bcrypt_1 = require("./common/utils/bcrypt");
const seedSuperAdmin = async () => {
    const existingAdmins = await admin_repository_1.adminRepository.findAll();
    const hashedPassword = await (0, bcrypt_1.hashValue)("admin12345");
    if (existingAdmins.length === 0) {
        console.log("🌱 Seeding initial Super Admin...");
        await admin_repository_1.adminRepository.create({
            fullName: "Super Admin",
            email: "admin@finscrybe.io",
            password: hashedPassword,
            phoneNumber: "+1234567890",
            profilePhoto: "",
            isActive: true,
        });
        console.log("✅ Super Admin seeded (admin@finscrybe.io / admin12345)");
    }
    else {
        // Force reset the password to ensure it matches if it was corrupted
        await admin_repository_1.adminRepository.updateById(existingAdmins[0]._id.toString(), { password: hashedPassword });
    }
};
const startServer = async () => {
    try {
        await (0, db_1.connectDB)();
        await seedSuperAdmin();
        await (0, mail_1.verifyMailConnection)();
        app_1.default.listen(env_1.env.PORT, () => {
            console.log(`🚀 Server running on port ${env_1.env.PORT}`);
        });
    }
    catch (error) {
        console.error("❌ Failed to start server");
        if (error instanceof Error) {
            console.error(error.message);
        }
        process.exit(1);
    }
};
startServer();
