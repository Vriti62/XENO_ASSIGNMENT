/*
  Warnings:

  - You are about to drop the column `store_name` on the `Product` table. All the data in the column will be lost.
  - Added the required column `store_id` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Product" DROP CONSTRAINT "Product_store_name_fkey";

-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "store_name",
ADD COLUMN     "store_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "public"."Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
