-- CreateTable
CREATE TABLE "notes" (
    "id" SERIAL NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);
