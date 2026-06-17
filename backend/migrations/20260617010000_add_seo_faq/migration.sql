-- AlterTable
ALTER TABLE "HomePageTranslation" ADD COLUMN     "faqItems" JSONB DEFAULT '[]',
ADD COLUMN     "faqTitle" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "SEOPage" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL DEFAULT '',
    "order" INTEGER DEFAULT 0,

    CONSTRAINT "SEOPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SEOPageTranslation" (
    "id" TEXT NOT NULL,
    "seoPage" TEXT,
    "locale" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "SEOPageTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SEOPage_slug_key" ON "SEOPage"("slug");

-- CreateIndex
CREATE INDEX "SEOPageTranslation_seoPage_idx" ON "SEOPageTranslation"("seoPage");

-- AddForeignKey
ALTER TABLE "SEOPageTranslation" ADD CONSTRAINT "SEOPageTranslation_seoPage_fkey" FOREIGN KEY ("seoPage") REFERENCES "SEOPage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

