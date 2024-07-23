/*
  Warnings:

  - You are about to drop the column `refreshToken` on the `Account` table. All the data in the column will be lost.
  - Added the required column `scope` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "refreshToken",
ADD COLUMN     "refresh_token" TEXT,
ADD COLUMN     "scope" TEXT NOT NULL;
