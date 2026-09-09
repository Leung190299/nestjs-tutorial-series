/*
  Warnings:

  - Made the column `channel` on table `notes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "notes" ALTER COLUMN "channel" SET NOT NULL;
