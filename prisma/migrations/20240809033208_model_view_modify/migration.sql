/*
  Warnings:

  - You are about to drop the column `viewCount` on the `view` table. All the data in the column will be lost.
  - You are about to drop the column `viewDate` on the `view` table. All the data in the column will be lost.
  - You are about to drop the column `viewDuration` on the `view` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[post_id]` on the table `view` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "view_post_id_viewDate_key";

-- AlterTable
ALTER TABLE "view" DROP COLUMN "viewCount",
DROP COLUMN "viewDate",
DROP COLUMN "viewDuration",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "view_post_id_key" ON "view"("post_id");
