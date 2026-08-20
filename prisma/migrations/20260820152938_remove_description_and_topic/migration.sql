/*
  Warnings:

  - You are about to drop the column `description` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `topic_id` on the `posts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_topic_id_fkey";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "description",
DROP COLUMN "topic_id";
