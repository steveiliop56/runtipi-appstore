import path from "path";
import fs from "fs/promises";

const packageFile = process.argv[2];
const newVersion = process.argv[3];

type AppConfig = {
  tipi_version: string;
  version: string;
  updated_at: number;
};

const updateAppConfig = async (packageFile: string, newVersion: string) => {
  try {
    const packageRoot = path.dirname(packageFile);
    const configPath = path.join(packageRoot, "config.json");

    const config = await fs.readFile(configPath, "utf-8");
    const configParsed = JSON.parse(config) as AppConfig;

    configParsed.tipi_version = configParsed.tipi_version + 1;
    configParsed.version = newVersion;
    configParsed.updated_at = new Date().getTime();

    await fs.writeFile(configPath, JSON.stringify(configParsed, null, 2));
  } catch (e) {
    console.error(`Failed to update app config, error: ${e}`);
  }
};

if (!packageFile || !newVersion) {
  console.error("Usage: bun update-config.js <packageFile> <newVersion>");
  process.exit(1);
}

updateAppConfig(packageFile, newVersion);
