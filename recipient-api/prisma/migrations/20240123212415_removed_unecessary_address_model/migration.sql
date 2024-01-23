/*
  Warnings:

  - You are about to drop the column `address_id` on the `recipients` table. All the data in the column will be lost.
  - You are about to drop the `addresses` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `number` to the `recipients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `recipients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip_code` to the `recipients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "recipients" DROP CONSTRAINT "recipients_address_id_fkey";

-- DropIndex
DROP INDEX "recipients_email_address_id_idx";

-- AlterTable
ALTER TABLE "recipients" DROP COLUMN "address_id",
ADD COLUMN     "number" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "zip_code" TEXT NOT NULL;

-- DropTable
DROP TABLE "addresses";

-- CreateIndex
CREATE INDEX "recipients_email_idx" ON "recipients"("email");
