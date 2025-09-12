/*
  Warnings:

  - Added the required column `line_items_id` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variant_id` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Cart" ADD COLUMN     "line_items_id" BIGINT NOT NULL,
ADD COLUMN     "variant_id" BIGINT NOT NULL;
