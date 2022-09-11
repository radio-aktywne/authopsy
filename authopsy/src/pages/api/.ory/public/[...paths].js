import { config, createApiHandler } from "@ory/integrations/next-edge";

const apiUrl = process.env.AUTHOPSY_AUTHE_URL || "https://localhost:23000";

export { config };

export default createApiHandler({
  apiBaseUrlOverride: apiUrl,
});
