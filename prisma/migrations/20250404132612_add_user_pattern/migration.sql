/*
  Warnings:

  - You are about to drop the column `preferredTemp` on the `user_patterns` table. All the data in the column will be lost.
  - You are about to drop the column `studyTime` on the `user_patterns` table. All the data in the column will be lost.
  - Added the required column `preferredTemperature` to the `user_patterns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studyHours` to the `user_patterns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_patterns" DROP COLUMN "preferredTemp",
DROP COLUMN "studyTime",
ADD COLUMN     "preferredTemperature" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "studyHours" INTEGER NOT NULL;
