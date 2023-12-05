-- CreateTable
CREATE TABLE "couriers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lat" DOUBLE PRECISION DEFAULT 0.0,
    "lon" DOUBLE PRECISION DEFAULT 0.0,

    CONSTRAINT "couriers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "couriers_email_key" ON "couriers"("email");
