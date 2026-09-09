-- Bước 2/3 của luật "nullable -> backfill -> siết NOT NULL".
-- File này do `prisma migrate dev --create-only --name backfill_channel` sinh ra RỖNG
-- ("-- This is an empty migration."), câu UPDATE dưới đây là VIẾT TAY.
-- Backfill phải nằm TRONG lịch sử migration, không phải script chạy tay: nhờ vậy
-- `prisma migrate deploy` trên production cũng chạy đúng thứ tự nullable -> backfill -> NOT NULL.
-- Bảng 1.000 dòng nên UPDATE một phát là xong; bảng chục triệu dòng phải backfill THEO LÔ
-- (WHERE id BETWEEN ... LIMIT ...) để không khóa bảng quá lâu.
UPDATE "notes" SET "channel" = 'web';
