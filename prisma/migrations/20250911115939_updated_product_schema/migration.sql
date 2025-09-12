/*
  Warnings:

  - You are about to drop the column `store_id` on the `Product` table. All the data in the column will be lost.
  - Added the required column `store_name` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Product" DROP CONSTRAINT "Product_store_id_fkey";

-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "store_id",
ADD COLUMN     "store_name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_store_name_fkey" FOREIGN KEY ("store_name") REFERENCES "public"."Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
