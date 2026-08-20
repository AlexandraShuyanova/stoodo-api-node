/*
  Warnings:

  - You are about to alter the column `version` on the `posts_content` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "posts_content" ALTER COLUMN "version" SET DATA TYPE INTEGER;
