-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "topic_id" UUID;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE SET NULL ON UPDATE CASCADE;
