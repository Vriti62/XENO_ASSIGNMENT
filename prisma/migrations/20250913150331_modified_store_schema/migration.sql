/*
  Warnings:

  - You are about to drop the column `cust_password` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_email]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_email` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Cart" DROP CONSTRAINT "Cart_prod_id_fkey";

-- AlterTable
ALTER TABLE "public"."Customer" DROP COLUMN "cust_password";

-- AlterTable
ALTER TABLE "public"."Store" ADD COLUMN     "user_email" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."Cart";

-- CreateIndex
CREATE UNIQUE INDEX "Store_user_email_key" ON "public"."Store"("user_email");
