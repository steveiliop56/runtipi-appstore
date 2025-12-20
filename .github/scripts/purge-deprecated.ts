import path from "path";
import fs from "fs/promises";

type AppConfig = {
  deprecated: boolean;
  updated_at: number;
};

const ignore: string[] = ["docker-compose.common.yml"];

const thirtyDays = 30 * 24 * 60 * 60 * 1000;

const getDeprecatedApps = async (): Promise<string[]> => {
  try {
    const apps = await fs.readdir("apps");
    const deprecatedApps: string[] = [];

    for (const app of apps) {
      if (ignore.includes(app)) {
        continue;
      }
      const configPath = path.join("apps", app, "config.json");
      try {
        const configContent = await fs.readFile(configPath, "utf-8");
        const configParsed = JSON.parse(configContent) as AppConfig;

        if (
          configParsed.deprecated &&
          new Date().getTime() - configParsed.updated_at > thirtyDays
        ) {
          deprecatedApps.push(app);
        }
      } catch (e) {
        console.error(
          `Failed to read or parse config for app ${app}, error: ${e}`,
        );
      }
    }

    return deprecatedApps;
  } catch (e) {
    console.error(`Failed to get deprecated apps, error: ${e}`);
    return [];
  }
};

const purgeDeprecatedApps = async (deprecatedApps: string[]) => {
  for (const app of deprecatedApps) {
    const appPath = path.join("apps", app);
    try {
      console.log(`Deprecated app found: ${app} at path ${appPath}`);
      //   await fs.rm(appPath, { recursive: true, force: true });
    } catch (e) {
      console.error(`Failed to remove deprecated app ${app}, error: ${e}`);
    }
  }
};

const deprecatedApps = await getDeprecatedApps();
await purgeDeprecatedApps(deprecatedApps);
