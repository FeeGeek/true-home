-- CreateTable
CREATE TABLE "sys_access_key" (
    "id" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "access_key_id" TEXT NOT NULL,
    "access_key_secret" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "sys_access_key_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sys_access_key_access_key_id_key" ON "sys_access_key"("access_key_id");

-- CreateIndex
CREATE UNIQUE INDEX "sys_access_key_access_key_secret_key" ON "sys_access_key"("access_key_secret");
