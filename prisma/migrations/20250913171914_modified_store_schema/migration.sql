-- DropIndex
DROP INDEX "public"."Store_user_email_key";

-- AlterTable
ALTER TABLE "public"."Store" ALTER COLUMN "user_email" DROP NOT NULL;
