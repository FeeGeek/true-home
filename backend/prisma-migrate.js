const { $ } = require('execa');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

// 软件包运行器（包管理器）
const PACKAGE = 'pnpx';
// Prisma 数据库模式文件路径
const SCHEMA_PATH = path.resolve('prisma/schema.prisma');
// Prisma 迁移文件目录路径
const MIGRATIONS_PATH = path.resolve('prisma/migrations');
// 影子数据库连接地址，用于生成迁移文件
const SHADOW_DATABASE_URL = process.env.SHADOW_DATABASE_URL;

// 辅助函数：获取时间戳
function generateTimestamp() {
  return new Date()
    .toISOString()
    .replace(/[^0-9]/g, '')
    .slice(0, 14);
}

// 获取最新迁移文件时间戳
function endTimestamp() {
  return (
    fs
      .readdirSync(MIGRATIONS_PATH)
      .filter((file) => file.endsWith('_migration'))
      .sort((a, b) => b.localeCompare(a))[0]
      ?.replace('_migration', '') || null
  );
}

// 生成迁移文件目录路径，使用时间戳命名
async function generateMigrationDir() {
  const dir = path.resolve(
    `${MIGRATIONS_PATH}/${generateTimestamp()}_migration`,
  );
  if (fs.existsSync(dir)) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return generateMigrationDir();
  }
  return dir;
}

// 生成迁移 SQL 文件的具体路径
async function generateMigrationPath() {
  return path.join(await generateMigrationDir(), 'migration.sql');
}

// 任务函数
// 初始化迁移
async function initMigration() {
  await $`${PACKAGE} prisma migrate deploy --schema ${SCHEMA_PATH}`;
  await $`${PACKAGE} prisma db seed`;
}

// 生成数据库迁移 SQL 文件
async function generateMigration() {
  const output = await generateMigrationPath();
  if (SHADOW_DATABASE_URL) {
    console.log('Migration is being carried out using the shadow database');
    await $`${PACKAGE} prisma migrate diff
  --shadow-database-url ${SHADOW_DATABASE_URL}
  --from-migrations ${MIGRATIONS_PATH}
  --to-schema-datamodel ${SCHEMA_PATH}
  --script
  --output ${output}`;
  } else {
    console.log('Migration is being carried out using the current database');
    await $`${PACKAGE} prisma migrate diff
  --from-schema-datasource ${SCHEMA_PATH}
  --to-schema-datamodel ${SCHEMA_PATH}
  --script
  --output ${output}`;
  }
}

// 标记迁移已应用：用于手动标记某个迁移已经被应用到数据库
async function resolveMigration() {
  const timestamp = await endTimestamp();
  await $`${PACKAGE} prisma migrate resolve --applied ${timestamp}_migration`;
}

// 部署迁移：将所有未应用的迁移应用到数据库
async function deployMigration() {
  await $`${PACKAGE} prisma migrate deploy --schema ${SCHEMA_PATH}`;
}

// 重置数据库：删除所有数据并重新应用所有迁移
async function resetDatabase() {
  await $`${PACKAGE} prisma migrate reset --schema ${SCHEMA_PATH} --force`;
}

// 命令行入口
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  try {
    switch (command) {
      // 初始化迁移
      case 'init_migration':
        await initMigration();
        break;
      // 生成迁移文件
      case 'generate_migration':
        await generateMigration();
        break;
      // 部署迁移
      case 'deploy_migration':
        await deployMigration();
        break;
      // 标记迁移已应用
      case 'resolve_migration':
        await resolveMigration();
        break;
      // 重置数据库
      case 'reset_database':
        await resetDatabase();
        break;
      default:
        console.error(
          'Invalid command. Please select: init_migration, generate_migration...',
        );
        process.exit(1);
    }
  } catch (error) {
    console.error('error:', error.message);
    process.exit(1);
  }
}

main();
