-- CreateTable
CREATE TABLE "LocaleSetting" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL DEFAULT '',
    "label" TEXT NOT NULL DEFAULT '',
    "flag" TEXT NOT NULL DEFAULT '',
    "order" INTEGER DEFAULT 0,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "LocaleSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL DEFAULT 'Bali By Made',
    "logoSub" TEXT NOT NULL DEFAULT 'BALI BY',
    "logoMain" TEXT NOT NULL DEFAULT 'MADE',
    "whatsappNumber" TEXT NOT NULL DEFAULT '',
    "instagramUrl" TEXT NOT NULL DEFAULT 'https://www.instagram.com/balibymade',
    "instagramHandle" TEXT NOT NULL DEFAULT '@balibymade',
    "contactEmail" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DestinationCategory" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL DEFAULT '',
    "emoji" TEXT NOT NULL DEFAULT '',
    "color" TEXT NOT NULL DEFAULT '',
    "order" INTEGER DEFAULT 0,

    CONSTRAINT "DestinationCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DestinationCategoryTranslation" (
    "id" TEXT NOT NULL,
    "category" TEXT,
    "locale" TEXT NOT NULL DEFAULT '',
    "label" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "DestinationCategoryTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Destination" (
    "id" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "slug" TEXT NOT NULL DEFAULT '',
    "category" TEXT,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "region" TEXT NOT NULL DEFAULT '',
    "priceFromUbud" INTEGER NOT NULL,
    "driveMinFromUbud" INTEGER NOT NULL,
    "order" INTEGER DEFAULT 0,

    CONSTRAINT "Destination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DestinationTranslation" (
    "id" TEXT NOT NULL,
    "destination" TEXT,
    "locale" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "DestinationTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Route" (
    "id" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "slug" TEXT NOT NULL DEFAULT '',
    "emoji" TEXT NOT NULL DEFAULT '',
    "image_id" TEXT,
    "image_filesize" INTEGER,
    "image_width" INTEGER,
    "image_height" INTEGER,
    "image_extension" TEXT,
    "priceUsd" INTEGER NOT NULL,
    "stars" INTEGER DEFAULT 5,
    "order" INTEGER DEFAULT 0,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RouteTranslation" (
    "id" TEXT NOT NULL,
    "route" TEXT,
    "locale" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL DEFAULT '',
    "heroShort" TEXT NOT NULL DEFAULT '',
    "tagline" TEXT NOT NULL DEFAULT '',
    "path" TEXT NOT NULL DEFAULT '',
    "duration" TEXT NOT NULL DEFAULT '',
    "level" TEXT NOT NULL DEFAULT '',
    "highlights" JSONB DEFAULT '[]',

    CONSTRAINT "RouteTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RouteItinerary" (
    "id" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "slug" TEXT NOT NULL DEFAULT '',
    "route" TEXT,
    "image_id" TEXT,
    "image_filesize" INTEGER,
    "image_width" INTEGER,
    "image_height" INTEGER,
    "image_extension" TEXT,
    "order" INTEGER DEFAULT 0,

    CONSTRAINT "RouteItinerary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RouteItineraryTranslation" (
    "id" TEXT NOT NULL,
    "itinerary" TEXT,
    "locale" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL DEFAULT '',
    "tagline" TEXT NOT NULL DEFAULT '',
    "badge" TEXT NOT NULL DEFAULT '',
    "duration" TEXT NOT NULL DEFAULT '',
    "departure" TEXT NOT NULL DEFAULT '',
    "price" TEXT NOT NULL DEFAULT '',
    "groupSize" TEXT NOT NULL DEFAULT '',
    "included" JSONB DEFAULT '[]',
    "notIncluded" JSONB DEFAULT '[]',
    "stops" JSONB DEFAULT '[]',
    "cta" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "RouteItineraryTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AirportRoute" (
    "id" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "slug" TEXT NOT NULL DEFAULT '',
    "priceUsd" INTEGER NOT NULL,
    "order" INTEGER DEFAULT 0,

    CONSTRAINT "AirportRoute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AirportRouteTranslation" (
    "id" TEXT NOT NULL,
    "airportRoute" TEXT,
    "locale" TEXT NOT NULL DEFAULT '',
    "to" TEXT NOT NULL DEFAULT '',
    "duration" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "AirportRouteTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteChrome" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL DEFAULT 'Global',

    CONSTRAINT "SiteChrome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteChromeTranslation" (
    "id" TEXT NOT NULL,
    "chrome" TEXT,
    "locale" TEXT NOT NULL DEFAULT '',
    "navHome" TEXT NOT NULL DEFAULT '',
    "navExperiences" TEXT NOT NULL DEFAULT '',
    "navRouteBuilder" TEXT NOT NULL DEFAULT '',
    "navAbout" TEXT NOT NULL DEFAULT '',
    "navContact" TEXT NOT NULL DEFAULT '',
    "navCta" TEXT NOT NULL DEFAULT '',
    "footerTagline" TEXT NOT NULL DEFAULT '',
    "footerLinksLabel" TEXT NOT NULL DEFAULT '',
    "footerLinks" JSONB DEFAULT '[]',
    "footerSocialLabel" TEXT NOT NULL DEFAULT '',
    "footerCredit" TEXT NOT NULL DEFAULT '',
    "ctaTitle" TEXT NOT NULL DEFAULT '',
    "ctaSub" TEXT NOT NULL DEFAULT '',
    "ctaBtn" TEXT NOT NULL DEFAULT '',
    "ctaNote" TEXT NOT NULL DEFAULT '',
    "routesSectionOverline" TEXT NOT NULL DEFAULT '',
    "routesSectionTitle" TEXT NOT NULL DEFAULT '',
    "routesSectionSub" TEXT NOT NULL DEFAULT '',
    "bookRouteCta" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "SiteChromeTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomePage" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL DEFAULT 'Home',
    "heroImage_id" TEXT,
    "heroImage_filesize" INTEGER,
    "heroImage_width" INTEGER,
    "heroImage_height" INTEGER,
    "heroImage_extension" TEXT,

    CONSTRAINT "HomePage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomePageTranslation" (
    "id" TEXT NOT NULL,
    "page" TEXT,
    "locale" TEXT NOT NULL DEFAULT '',
    "heroTag" TEXT NOT NULL DEFAULT '',
    "heroH1a" TEXT NOT NULL DEFAULT '',
    "heroH1b" TEXT NOT NULL DEFAULT '',
    "heroSub" TEXT NOT NULL DEFAULT '',
    "heroCta1" TEXT NOT NULL DEFAULT '',
    "heroCta2" TEXT NOT NULL DEFAULT '',
    "heroScroll" TEXT NOT NULL DEFAULT '',
    "heroCardTag" TEXT NOT NULL DEFAULT '',
    "heroCardName" TEXT NOT NULL DEFAULT '',
    "heroCardSub" TEXT NOT NULL DEFAULT '',
    "heroCardStat" TEXT NOT NULL DEFAULT '',
    "whyOverline" TEXT NOT NULL DEFAULT '',
    "whyTitle" TEXT NOT NULL DEFAULT '',
    "whyItems" JSONB DEFAULT '[]',

    CONSTRAINT "HomePageTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperiencesPage" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL DEFAULT 'Experiences',

    CONSTRAINT "ExperiencesPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperiencesPageTranslation" (
    "id" TEXT NOT NULL,
    "page" TEXT,
    "locale" TEXT NOT NULL DEFAULT '',
    "heroTag" TEXT NOT NULL DEFAULT '',
    "heroH1" TEXT NOT NULL DEFAULT '',
    "heroH1b" TEXT NOT NULL DEFAULT '',
    "heroSub" TEXT NOT NULL DEFAULT '',
    "includedOverline" TEXT NOT NULL DEFAULT '',
    "includedTitle" TEXT NOT NULL DEFAULT '',
    "includedItems" JSONB DEFAULT '[]',
    "airportOverline" TEXT NOT NULL DEFAULT '',
    "airportTitle" TEXT NOT NULL DEFAULT '',
    "airportTagline" TEXT NOT NULL DEFAULT '',
    "airportBadge" TEXT NOT NULL DEFAULT '',
    "airportPrice" TEXT NOT NULL DEFAULT '',
    "airportShortDuration" TEXT NOT NULL DEFAULT '',
    "airportGroupSize" TEXT NOT NULL DEFAULT '',
    "airportDesc" TEXT NOT NULL DEFAULT '',
    "airportIncluded" JSONB DEFAULT '[]',
    "airportNotIncluded" JSONB DEFAULT '[]',
    "airportRoutesLabel" TEXT NOT NULL DEFAULT '',
    "airportNote" TEXT NOT NULL DEFAULT '',
    "airportCta" TEXT NOT NULL DEFAULT '',
    "customTag" TEXT NOT NULL DEFAULT '',
    "customTitle" TEXT NOT NULL DEFAULT '',
    "customPrice" TEXT NOT NULL DEFAULT '',
    "customDesc" TEXT NOT NULL DEFAULT '',
    "customCta" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "ExperiencesPageTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutPage" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL DEFAULT 'About',
    "bioImage_id" TEXT,
    "bioImage_filesize" INTEGER,
    "bioImage_width" INTEGER,
    "bioImage_height" INTEGER,
    "bioImage_extension" TEXT,

    CONSTRAINT "AboutPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutPageTranslation" (
    "id" TEXT NOT NULL,
    "page" TEXT,
    "locale" TEXT NOT NULL DEFAULT '',
    "quoteText" TEXT NOT NULL DEFAULT '',
    "quoteCredit" TEXT NOT NULL DEFAULT '— Made',
    "bioOverline" TEXT NOT NULL DEFAULT '',
    "bioH1" TEXT NOT NULL DEFAULT '',
    "bioSub" TEXT NOT NULL DEFAULT '',
    "bioP1" TEXT NOT NULL DEFAULT '',
    "bioP2" TEXT NOT NULL DEFAULT '',
    "bioP3" TEXT NOT NULL DEFAULT '',
    "availableBadge" TEXT NOT NULL DEFAULT '',
    "valuesOverline" TEXT NOT NULL DEFAULT '',
    "valuesItems" JSONB DEFAULT '[]',
    "ctaQuestion" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "AboutPageTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactPage" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL DEFAULT 'Contact',

    CONSTRAINT "ContactPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactPageTranslation" (
    "id" TEXT NOT NULL,
    "page" TEXT,
    "locale" TEXT NOT NULL DEFAULT '',
    "heroTag" TEXT NOT NULL DEFAULT '',
    "heroH1" TEXT NOT NULL DEFAULT '',
    "heroH1b" TEXT NOT NULL DEFAULT '',
    "heroSub" TEXT NOT NULL DEFAULT '',
    "formNameLabel" TEXT NOT NULL DEFAULT '',
    "formEmailLabel" TEXT NOT NULL DEFAULT '',
    "formMessageLabel" TEXT NOT NULL DEFAULT '',
    "formMessagePlaceholder" TEXT NOT NULL DEFAULT '',
    "formSubmit" TEXT NOT NULL DEFAULT '',
    "formSuccessTitle" TEXT NOT NULL DEFAULT '',
    "formSuccessText" TEXT NOT NULL DEFAULT '',
    "formOrNote" TEXT NOT NULL DEFAULT '',
    "formWaBtn" TEXT NOT NULL DEFAULT '',
    "formWaLabel" TEXT NOT NULL DEFAULT '',
    "formWaSublabel" TEXT NOT NULL DEFAULT '',
    "noteTitle" TEXT NOT NULL DEFAULT '',
    "noteItems" JSONB DEFAULT '[]',

    CONSTRAINT "ContactPageTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RouteBuilderPage" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL DEFAULT 'Route Builder',

    CONSTRAINT "RouteBuilderPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RouteBuilderPageTranslation" (
    "id" TEXT NOT NULL,
    "page" TEXT,
    "locale" TEXT NOT NULL DEFAULT '',
    "tag" TEXT NOT NULL DEFAULT '',
    "h1" TEXT NOT NULL DEFAULT '',
    "h1b" TEXT NOT NULL DEFAULT '',
    "sub" TEXT NOT NULL DEFAULT '',
    "searchPlaceholder" TEXT NOT NULL DEFAULT '',
    "destinationsLabel" TEXT NOT NULL DEFAULT '',
    "yourRoute" TEXT NOT NULL DEFAULT '',
    "stops" TEXT NOT NULL DEFAULT '',
    "totalKm" TEXT NOT NULL DEFAULT '',
    "estimatedTime" TEXT NOT NULL DEFAULT '',
    "kmhNote" TEXT NOT NULL DEFAULT '',
    "addStops" TEXT NOT NULL DEFAULT '',
    "clearRoute" TEXT NOT NULL DEFAULT '',
    "bookCta" TEXT NOT NULL DEFAULT '',
    "bookNote" TEXT NOT NULL DEFAULT '',
    "removeStop" TEXT NOT NULL DEFAULT '',
    "alreadyAdded" TEXT NOT NULL DEFAULT '',
    "addToRoute" TEXT NOT NULL DEFAULT '',
    "startPoint" TEXT NOT NULL DEFAULT '',
    "noResults" TEXT NOT NULL DEFAULT '',
    "approx" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "RouteBuilderPageTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LocaleSetting_code_key" ON "LocaleSetting"("code");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DestinationCategory_slug_key" ON "DestinationCategory"("slug");

-- CreateIndex
CREATE INDEX "DestinationCategoryTranslation_category_idx" ON "DestinationCategoryTranslation"("category");

-- CreateIndex
CREATE UNIQUE INDEX "Destination_slug_key" ON "Destination"("slug");

-- CreateIndex
CREATE INDEX "Destination_category_idx" ON "Destination"("category");

-- CreateIndex
CREATE INDEX "DestinationTranslation_destination_idx" ON "DestinationTranslation"("destination");

-- CreateIndex
CREATE UNIQUE INDEX "Route_slug_key" ON "Route"("slug");

-- CreateIndex
CREATE INDEX "RouteTranslation_route_idx" ON "RouteTranslation"("route");

-- CreateIndex
CREATE UNIQUE INDEX "RouteItinerary_slug_key" ON "RouteItinerary"("slug");

-- CreateIndex
CREATE INDEX "RouteItinerary_route_idx" ON "RouteItinerary"("route");

-- CreateIndex
CREATE INDEX "RouteItineraryTranslation_itinerary_idx" ON "RouteItineraryTranslation"("itinerary");

-- CreateIndex
CREATE UNIQUE INDEX "AirportRoute_slug_key" ON "AirportRoute"("slug");

-- CreateIndex
CREATE INDEX "AirportRouteTranslation_airportRoute_idx" ON "AirportRouteTranslation"("airportRoute");

-- CreateIndex
CREATE UNIQUE INDEX "SiteChrome_label_key" ON "SiteChrome"("label");

-- CreateIndex
CREATE INDEX "SiteChromeTranslation_chrome_idx" ON "SiteChromeTranslation"("chrome");

-- CreateIndex
CREATE UNIQUE INDEX "HomePage_label_key" ON "HomePage"("label");

-- CreateIndex
CREATE INDEX "HomePageTranslation_page_idx" ON "HomePageTranslation"("page");

-- CreateIndex
CREATE UNIQUE INDEX "ExperiencesPage_label_key" ON "ExperiencesPage"("label");

-- CreateIndex
CREATE INDEX "ExperiencesPageTranslation_page_idx" ON "ExperiencesPageTranslation"("page");

-- CreateIndex
CREATE UNIQUE INDEX "AboutPage_label_key" ON "AboutPage"("label");

-- CreateIndex
CREATE INDEX "AboutPageTranslation_page_idx" ON "AboutPageTranslation"("page");

-- CreateIndex
CREATE UNIQUE INDEX "ContactPage_label_key" ON "ContactPage"("label");

-- CreateIndex
CREATE INDEX "ContactPageTranslation_page_idx" ON "ContactPageTranslation"("page");

-- CreateIndex
CREATE UNIQUE INDEX "RouteBuilderPage_label_key" ON "RouteBuilderPage"("label");

-- CreateIndex
CREATE INDEX "RouteBuilderPageTranslation_page_idx" ON "RouteBuilderPageTranslation"("page");

-- AddForeignKey
ALTER TABLE "DestinationCategoryTranslation" ADD CONSTRAINT "DestinationCategoryTranslation_category_fkey" FOREIGN KEY ("category") REFERENCES "DestinationCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Destination" ADD CONSTRAINT "Destination_category_fkey" FOREIGN KEY ("category") REFERENCES "DestinationCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DestinationTranslation" ADD CONSTRAINT "DestinationTranslation_destination_fkey" FOREIGN KEY ("destination") REFERENCES "Destination"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteTranslation" ADD CONSTRAINT "RouteTranslation_route_fkey" FOREIGN KEY ("route") REFERENCES "Route"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteItinerary" ADD CONSTRAINT "RouteItinerary_route_fkey" FOREIGN KEY ("route") REFERENCES "Route"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteItineraryTranslation" ADD CONSTRAINT "RouteItineraryTranslation_itinerary_fkey" FOREIGN KEY ("itinerary") REFERENCES "RouteItinerary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AirportRouteTranslation" ADD CONSTRAINT "AirportRouteTranslation_airportRoute_fkey" FOREIGN KEY ("airportRoute") REFERENCES "AirportRoute"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiteChromeTranslation" ADD CONSTRAINT "SiteChromeTranslation_chrome_fkey" FOREIGN KEY ("chrome") REFERENCES "SiteChrome"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HomePageTranslation" ADD CONSTRAINT "HomePageTranslation_page_fkey" FOREIGN KEY ("page") REFERENCES "HomePage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperiencesPageTranslation" ADD CONSTRAINT "ExperiencesPageTranslation_page_fkey" FOREIGN KEY ("page") REFERENCES "ExperiencesPage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AboutPageTranslation" ADD CONSTRAINT "AboutPageTranslation_page_fkey" FOREIGN KEY ("page") REFERENCES "AboutPage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactPageTranslation" ADD CONSTRAINT "ContactPageTranslation_page_fkey" FOREIGN KEY ("page") REFERENCES "ContactPage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteBuilderPageTranslation" ADD CONSTRAINT "RouteBuilderPageTranslation_page_fkey" FOREIGN KEY ("page") REFERENCES "RouteBuilderPage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

