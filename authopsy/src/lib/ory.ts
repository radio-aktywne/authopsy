import { Configuration, V0alpha2Api } from "@ory/client";

const publicApiConfig = {
  basePath: "/api/.ory/public",
  baseOptions: {
    withCredentials: true,
  },
};

const adminApiConfig = {
  basePath: "/api/.ory/admin",
  baseOptions: {
    withCredentials: true,
  },
};

export const publicApi = new V0alpha2Api(new Configuration(publicApiConfig));
export const adminApi = new V0alpha2Api(new Configuration(adminApiConfig));
