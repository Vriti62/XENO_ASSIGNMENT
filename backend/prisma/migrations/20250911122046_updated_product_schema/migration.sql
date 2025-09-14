/*
  Warnings:

  - A unique constraint covering the columns `[store_name]` on the table `Store` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Store_store_name_key" ON "public"."Store"("store_name");
