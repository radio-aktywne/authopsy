import { config, createApiHandler } from "@ory/integrations/next-edge";

const apiUrl =
  process.env.AUTHOPSY_AUTHE_ADMIN_URL || "https://localhost:23001";

export { config };

export default createApiHandler({
  apiBaseUrlOverride: apiUrl,
});
