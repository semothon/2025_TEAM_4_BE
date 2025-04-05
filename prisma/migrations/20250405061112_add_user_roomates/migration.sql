/*
  Warnings:

  - A unique constraint covering the columns `[roommateId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "roommateId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "users_roommateId_key" ON "users"("roommateId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roommateId_fkey" FOREIGN KEY ("roommateId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
