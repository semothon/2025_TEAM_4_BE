/*
  Warnings:

  - You are about to drop the column `allowVisitors` on the `user_patterns` table. All the data in the column will be lost.
  - You are about to drop the column `cleaningCycle` on the `user_patterns` table. All the data in the column will be lost.
  - You are about to drop the column `isDrinker` on the `user_patterns` table. All the data in the column will be lost.
  - You are about to drop the column `isSmoker` on the `user_patterns` table. All the data in the column will be lost.
  - You are about to drop the column `noiseSensitivity` on the `user_patterns` table. All the data in the column will be lost.
  - You are about to drop the column `personality` on the `user_patterns` table. All the data in the column will be lost.
  - You are about to drop the column `preferredTemperature` on the `user_patterns` table. All the data in the column will be lost.
  - You are about to drop the column `sleepTime` on the `user_patterns` table. All the data in the column will be lost.
  - You are about to drop the column `studyHours` on the `user_patterns` table. All the data in the column will be lost.
  - You are about to drop the column `wakeTime` on the `user_patterns` table. All the data in the column will be lost.
  - Added the required column `userInfo` to the `user_patterns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_patterns" DROP COLUMN "allowVisitors",
DROP COLUMN "cleaningCycle",
DROP COLUMN "isDrinker",
DROP COLUMN "isSmoker",
DROP COLUMN "noiseSensitivity",
DROP COLUMN "personality",
DROP COLUMN "preferredTemperature",
DROP COLUMN "sleepTime",
DROP COLUMN "studyHours",
DROP COLUMN "wakeTime",
ADD COLUMN     "userInfo" JSONB NOT NULL;
