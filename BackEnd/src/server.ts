import app from "./app";
import { env } from "./config/env";
import { connectDB } from "./config/db";
import { verifyMailConnection } from "./config/mail";
import { adminRepository } from "./modules/admin/repositories/admin.repository";
import { hashValue } from "./common/utils/bcrypt";

const seedSuperAdmin = async () => {
    const existingAdmins = await adminRepository.findAll();
    const hashedPassword = await hashValue("admin12345");
    
    if (existingAdmins.length === 0) {
        console.log("🌱 Seeding initial Super Admin...");
        await adminRepository.create({
            fullName: "Super Admin",
            email: "admin@finscrybe.io",
            password: hashedPassword,
            phoneNumber: "+1234567890",
            profilePhoto: "",
            isActive: true,
        });
        console.log("✅ Super Admin seeded (admin@finscrybe.io / admin12345)");
    } else {
        // Force reset the password to ensure it matches if it was corrupted
        await adminRepository.updateById(existingAdmins[0]._id.toString(), { password: hashedPassword });
    }
};

const startServer = async () => {
    try {
        await connectDB();
        await seedSuperAdmin();

        await verifyMailConnection();

        app.listen(env.PORT, () => {
            console.log(`🚀 Server running on port ${env.PORT}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server");

        if (error instanceof Error) {
            console.error(error.message);
        }

        process.exit(1);
    }
};

startServer();