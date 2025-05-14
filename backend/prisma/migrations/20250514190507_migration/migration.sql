-- CreateTable
CREATE TABLE "my_contact_info" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT '',
    "contact_name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "show_contact_name" BOOLEAN NOT NULL DEFAULT false,
    "link" TEXT NOT NULL,
    "link_type" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL DEFAULT 0,
    "status" "Status" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "my_contact_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "my_home_plugin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "component_name" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "my_home_plugin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "my_home_plugin_instance" (
    "id" TEXT NOT NULL,
    "plugin_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "meta" JSONB,
    "sequence" INTEGER NOT NULL DEFAULT 0,
    "status" "Status" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "my_home_plugin_instance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "my_contact_info_user_id_idx" ON "my_contact_info"("user_id");

-- CreateIndex
CREATE INDEX "my_home_plugin_name_version_idx" ON "my_home_plugin"("name", "version");

-- CreateIndex
CREATE INDEX "my_home_plugin_instance_user_id_idx" ON "my_home_plugin_instance"("user_id");
