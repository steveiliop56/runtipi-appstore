import fs from "fs";
import path from "path";

const ignore = ["docker-compose.common.yml"];

function migrateConfig(oldConfig: any): any {
  return {
    ...oldConfig,
    $schema: "https://schemas.runtipi.io/app-info.json",
    tipi_version: oldConfig.tipi_version + 1,
  };
}

function migrateCompose(oldCompose: any): any {
  var newCompose = {
    ...oldCompose,
    $schema: "https://schemas.runtipi.io/v2/dynamic-compose.json",
    schemaVersion: 2,
  };

  for (const service in newCompose.services) {
    var env: Array<{ key: string; value: string }> = [];

    for (const [key, value] of Object.entries(
      newCompose.services[service].environment || {},
    )) {
      env.push({ key: key, value: value as string });
    }

    newCompose.services[service].environment = env;
  }

  return newCompose;
}

function migrate() {
  const files = fs.readdirSync(path.join(process.cwd(), "apps"));

  files.forEach((app) => {
    if (ignore.includes(app)) return;

    const configFilePath = path.join(process.cwd(), "apps", app, "config.json");

    const composeFilePath = path.join(
      process.cwd(),
      "apps",
      app,
      "docker-compose.json",
    );

    if (fs.existsSync(configFilePath)) {
      const oldConfig = JSON.parse(fs.readFileSync(configFilePath, "utf-8"));
      const newConfig = migrateConfig(oldConfig);
      fs.writeFileSync(configFilePath, JSON.stringify(newConfig, null, 2));
    }

    if (fs.existsSync(composeFilePath)) {
      const oldCompose = JSON.parse(fs.readFileSync(composeFilePath, "utf-8"));
      const newCompose = migrateCompose(oldCompose);
      fs.writeFileSync(composeFilePath, JSON.stringify(newCompose, null, 2));
    }
  });
}

migrate();
