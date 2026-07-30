-- CreateTable
CREATE TABLE "flyway_schema_history" (
    "installed_rank" INTEGER NOT NULL,
    "version" VARCHAR(50),
    "description" VARCHAR(200) NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "script" VARCHAR(1000) NOT NULL,
    "checksum" INTEGER,
    "installed_by" VARCHAR(100) NOT NULL,
    "installed_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "execution_time" INTEGER NOT NULL,
    "success" BOOLEAN NOT NULL,

    CONSTRAINT "flyway_schema_history_pk" PRIMARY KEY ("installed_rank")
);

-- CreateTable
CREATE TABLE "images" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "url" TEXT,
    "created_by" UUID,
    "created_at" TIMESTAMP(6),
    "last_modified_by" UUID,
    "last_modified_at" TIMESTAMP(6),

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(256) NOT NULL,
    "slug" VARCHAR(256) NOT NULL,
    "topic_id" UUID,
    "image_id" UUID,
    "description" VARCHAR(1024),
    "owner_id" UUID,
    "is_published" BOOLEAN NOT NULL,
    "created_by" UUID,
    "created_at" TIMESTAMP(6),
    "last_modified_by" UUID,
    "last_modified_at" TIMESTAMP(6),

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts_content" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "version" BIGINT NOT NULL,
    "text" TEXT NOT NULL,
    "post_id" UUID NOT NULL,
    "is_current_version" BOOLEAN NOT NULL,
    "created_by" UUID,
    "created_at" TIMESTAMP(6),
    "last_modified_by" UUID,
    "last_modified_at" TIMESTAMP(6),

    CONSTRAINT "posts_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts_tags" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tags_id" UUID,
    "post_id" UUID,

    CONSTRAINT "posts_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts_user_history" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "post_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "is_opened" BOOLEAN NOT NULL,
    "is_viewed" BOOLEAN NOT NULL,
    "is_liked" BOOLEAN NOT NULL,

    CONSTRAINT "posts_user_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "token" VARCHAR(256) NOT NULL,
    "token_type" VARCHAR(256) NOT NULL,
    "is_revoked" BOOLEAN NOT NULL,
    "is_expired" BOOLEAN NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tag" VARCHAR(256) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topics" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "topic" VARCHAR(256) NOT NULL,

    CONSTRAINT "topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "first_name" VARCHAR(256) NOT NULL,
    "last_name" VARCHAR(256) NOT NULL,
    "username" VARCHAR(256) NOT NULL,
    "email" VARCHAR(256) NOT NULL,
    "password" VARCHAR(256) NOT NULL,
    "role" VARCHAR(256) NOT NULL,
    "is_expired" BOOLEAN NOT NULL,
    "is_locked" BOOLEAN NOT NULL,
    "is_credentials_valid" BOOLEAN NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "created_by" UUID,
    "created_at" TIMESTAMP(6),
    "last_modified_by" UUID,
    "last_modified_at" TIMESTAMP(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "flyway_schema_history_s_idx" ON "flyway_schema_history"("success");

-- CreateIndex
CREATE UNIQUE INDEX "posts_title_key" ON "posts"("title");

-- CreateIndex
CREATE UNIQUE INDEX "posts_slug_key" ON "posts"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "posts_user_history_post_id_user_id_key" ON "posts_user_history"("post_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_key" ON "refresh_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "tags_tag_key" ON "tags"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "topics_topic_key" ON "topics"("topic");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_last_modified_by_fkey" FOREIGN KEY ("last_modified_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_last_modified_by_fkey" FOREIGN KEY ("last_modified_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posts_content" ADD CONSTRAINT "posts_content_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posts_content" ADD CONSTRAINT "posts_content_last_modified_by_fkey" FOREIGN KEY ("last_modified_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posts_content" ADD CONSTRAINT "posts_content_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posts_tags" ADD CONSTRAINT "posts_tags_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posts_tags" ADD CONSTRAINT "posts_tags_tags_id_fkey" FOREIGN KEY ("tags_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posts_user_history" ADD CONSTRAINT "posts_user_history_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posts_user_history" ADD CONSTRAINT "posts_user_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_last_modified_by_fkey" FOREIGN KEY ("last_modified_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
