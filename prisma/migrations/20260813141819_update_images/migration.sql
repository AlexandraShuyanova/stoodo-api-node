/*
  Warnings:

  - You are about to drop the column `url` on the `images` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[key]` on the table `images` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "images" DROP COLUMN "url",
ADD COLUMN     "file_name" VARCHAR(256),
ADD COLUMN     "key" VARCHAR(512) NOT NULL,
ADD COLUMN     "mime_type" VARCHAR(100),
ADD COLUMN     "size" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "images_key_key" ON "images"("key");
