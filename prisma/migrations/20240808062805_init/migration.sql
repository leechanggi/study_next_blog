-- CreateTable
CREATE TABLE "post" (
    "post_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "tags" TEXT,
    "imgSrc" TEXT,
    "skip" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "post_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "view" (
    "view_id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "viewDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "viewCount" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "view_pkey" PRIMARY KEY ("view_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "view_post_id_viewDate_key" ON "view"("post_id", "viewDate");

-- AddForeignKey
ALTER TABLE "view" ADD CONSTRAINT "view_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;
