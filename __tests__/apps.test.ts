import { expect, test, describe } from "bun:test";
import {
  appInfoSchema,
  dynamicComposeSchema,
  dynamicComposeSchemaYaml,
} from "@runtipi/common/schemas";
import fs from "node:fs";
import path from "node:path";
import { type } from "arktype";
import YAML from "yaml";

const ignoreFiles = ["docker-compose.common.yml"];

const getApps = async () => {
  const appsDir = (
    await fs.promises.readdir(path.join(process.cwd(), "apps"))
  ).filter((app) => !ignoreFiles.includes(app));
  return appsDir;
};

const getFile = async (app: string, file: string) => {
  const filePath = path.join(process.cwd(), "apps", app, file);
  try {
    const file = await fs.promises.readFile(filePath, "utf-8");
    return file;
  } catch (err) {
    return null;
  }
};

describe("each app should have the required files", async () => {
  const apps = await getApps();

  for (const app of apps) {
    const files = [
      "config.json",
      "metadata/logo.jpg",
      "metadata/description.md",
    ];

    for (const file of files) {
      test(`app ${app} should have ${file}`, async () => {
        const fileContent = await getFile(app, file);
        expect(fileContent).not.toBeNull();
      });
    }
  }
});

describe("each app should have either a docker-compose.yml or docker-compose.json compose file", async () => {
  const apps = await getApps();

  for (const app of apps) {
    const composeFiles = ["docker-compose.yml", "docker-compose.json"];
    let hasComposeFile = false;

    for (const file of composeFiles) {
      const fileContent = await getFile(app, file);
      if (fileContent) {
        hasComposeFile = true;
        break;
      }
    }

    test(`app ${app} should have either a docker-compose.yml or docker-compose.json compose file`, async () => {
      expect(hasComposeFile).toBe(true);
    });
  }
});

describe("each app should have a valid config.json", async () => {
  const apps = await getApps();

  for (const app of apps) {
    test(`app ${app} should have a valid config.json`, async () => {
      const fileContent = await getFile(app, "config.json");
      const result = appInfoSchema.omit("urn")(JSON.parse(fileContent || "{}"));

      if (!(result instanceof type.errors)) {
        console.error(
          `Error parsing config.json for app ${app}:`,
          result.toString(),
        );
      }

      expect(!(result instanceof type.errors)).toBe(true);
    });
  }
});

describe("each app should have a valid docker-compose.json", async () => {
  const apps = await getApps();

  for (const app of apps) {
    test(`app ${app} should have a valid docker-compose.json`, async () => {
      const fileContent = await getFile(app, "docker-compose.json");
      if (!fileContent) return;
      const result = dynamicComposeSchema(JSON.parse(fileContent || "{}"));

      if (result instanceof type.errors) {
        console.error(
          `Error parsing docker-compose.json for app ${app}:`,
          result.toString(),
        );
      }

      expect(!(result instanceof type.errors)).toBe(true);
    });
  }
});

describe("each app should have a valid docker-compose.yml", async () => {
  const apps = await getApps();

  for (const app of apps) {
    test(`app ${app} should have a valid docker-compose.yml`, async () => {
      const fileContent = await getFile(app, "docker-compose.yml");
      if (!fileContent) return;
      const result = dynamicComposeSchemaYaml(YAML.parse(fileContent || "{}"));

      if (result instanceof type.errors) {
        console.error(
          `Error parsing docker-compose.yml for app ${app}:`,
          result.toString(),
        );
      }

      expect(!(result instanceof type.errors)).toBe(true);
    });
  }
});
