/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."OrderItem" DROP CONSTRAINT "OrderItem_prod_id_fkey";

-- AlterTable
ALTER TABLE "public"."OrderItem" ALTER COLUMN "prod_id" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "public"."Product" DROP CONSTRAINT "Product_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_prod_id_fkey" FOREIGN KEY ("prod_id") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
