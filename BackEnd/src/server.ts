import app from "./app";
import { hashValue } from "./common/utils/bcrypt";
import { connectDB } from "./config/db";
import { env } from "./config/env";
import { verifyMailConnection } from "./config/mail";
import { adminRepository } from "./modules/admin/repositories/admin.repository";

const SUPER_ADMIN_EMAIL = "admin@finscrybe.io";
const SUPER_ADMIN_PASSWORD = "admin12345";

const seedSuperAdmin = async () => {
  const hashedPassword = await hashValue(SUPER_ADMIN_PASSWORD);
  const existingSuperAdmin = await adminRepository.findByEmail(
    SUPER_ADMIN_EMAIL
  );

  if (!existingSuperAdmin) {
    console.log("Seeding initial Super Admin...");
    await adminRepository.create({
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
  await adminRepository.updateById(existingSuperAdmin._id.toString(), {
    password: hashedPassword,
    fullName: "Super Admin",
    phoneNumber: "+1234567890",
    profilePhoto: "",
  });
};

const startServer = async () => {
  try {
    await connectDB();
    await seedSuperAdmin();
    await verifyMailConnection();

    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server");

    if (error instanceof Error) {
      console.error(error.message);
    }

    process.exit(1);
  }
};

startServer();
