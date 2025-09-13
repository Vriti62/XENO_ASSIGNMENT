/*
  Warnings:

  - Made the column `user_email` on table `Store` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Store" ALTER COLUMN "user_email" SET NOT NULL;
