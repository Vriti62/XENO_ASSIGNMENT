/*
  Warnings:

  - You are about to drop the column `prod_description` on the `Product` table. All the data in the column will be lost.
  - Added the required column `prod_tags` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prod_type` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "prod_description",
ADD COLUMN     "prod_tags" TEXT NOT NULL,
ADD COLUMN     "prod_type" TEXT NOT NULL;
