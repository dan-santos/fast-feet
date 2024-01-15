-- CreateEnum
CREATE TYPE "OrderStates" AS ENUM ('INCOMING', 'DELIVERED', 'WAITING', 'RETURNED');

-- CreateTable
CREATE TABLE "couriers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lat" DOUBLE PRECISION DEFAULT 0.0,
    "lon" DOUBLE PRECISION DEFAULT 0.0,

    CONSTRAINT "couriers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipients" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,

    CONSTRAINT "recipients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "recipient_id" TEXT NOT NULL,
    "courier_id" TEXT,
    "status" "OrderStates" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "couriers_email_key" ON "couriers"("email");

-- CreateIndex
CREATE INDEX "couriers_email_lat_lon_idx" ON "couriers"("email", "lat", "lon");

-- CreateIndex
CREATE INDEX "addresses_zip_code_street_idx" ON "addresses"("zip_code", "street");

-- CreateIndex
CREATE UNIQUE INDEX "recipients_email_key" ON "recipients"("email");

-- CreateIndex
CREATE INDEX "recipients_email_address_id_idx" ON "recipients"("email", "address_id");

-- CreateIndex
CREATE INDEX "orders_recipient_id_courier_id_idx" ON "orders"("recipient_id", "courier_id");

-- AddForeignKey
ALTER TABLE "recipients" ADD CONSTRAINT "recipients_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "recipients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_courier_id_fkey" FOREIGN KEY ("courier_id") REFERENCES "couriers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
