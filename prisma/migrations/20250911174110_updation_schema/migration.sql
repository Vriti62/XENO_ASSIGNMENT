/*
  Warnings:

  - Added the required column `order_price` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "order_price" INTEGER NOT NULL;
