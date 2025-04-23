import fs from "node:fs";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { appInfoSchema, dynamicComposeSchema } from "@runtipi/common/schemas";

const appInfoJsonSchema = zodToJsonSchema(appInfoSchema.omit({ urn: true }).extend({ "$schema": z.string() }));
const dynamicComposeJsonSchema = zodToJsonSchema(dynamicComposeSchema.extend({ "$schema": z.string() }));

fs.writeFileSync(
  "apps/app-info-schema.json",
  JSON.stringify(appInfoJsonSchema, null, 2),
);
fs.writeFileSync(
  "apps/dynamic-compose-schema.json",
  JSON.stringify(dynamicComposeJsonSchema, null, 2),
);
