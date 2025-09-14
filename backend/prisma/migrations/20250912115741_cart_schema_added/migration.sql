-- CreateTable
CREATE TABLE "public"."Cart" (
    "id" BIGINT NOT NULL,
    "prod_id" BIGINT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Cart" ADD CONSTRAINT "Cart_prod_id_fkey" FOREIGN KEY ("prod_id") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
