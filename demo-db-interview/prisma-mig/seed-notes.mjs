// Seed 1.000 dòng `notes` vào DB RIÊNG `dbqa_mig` — để bảng CÓ DATA trước khi
// thử thêm cột NOT NULL (đó mới là kịch bản P4; bảng rỗng thì thêm gì cũng qua).
//
// Chạy: node seed-notes.mjs        (đọc DATABASE_URL từ .env qua Prisma)
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

try {
  await prisma.$executeRawUnsafe('TRUNCATE TABLE notes RESTART IDENTITY');
  // Sinh dữ liệu phía SQL bằng generate_series — nhanh hơn 1.000 lần insert từ Node.
  await prisma.$executeRawUnsafe(
    "INSERT INTO notes (body) SELECT 'note ' || g FROM generate_series(1,1000) g",
  );
  const n = await prisma.note.count();
  console.log(`seed xong: ${n} dòng notes`);
} finally {
  await prisma.$disconnect();
}
