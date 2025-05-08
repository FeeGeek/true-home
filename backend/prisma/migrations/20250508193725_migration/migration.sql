-- UpdateTable
ALTER TABLE "my_plugin_instance" ALTER COLUMN "sequence" SET DEFAULT 0;

-- UpdateTable
ALTER TABLE "my_contact_info" ADD COLUMN IF NOT EXISTS "sequence" INTEGER NOT NULL DEFAULT 0;
