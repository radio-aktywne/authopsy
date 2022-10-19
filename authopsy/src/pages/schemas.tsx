import Layout from "../components/Layout";
import Panel from "../components/Panel";
import { useEffect, useState } from "react";
import { IdentitySchemaContainer } from "@ory/client";
import { useRouter } from "next/router";
import { publicApi } from "../lib/ory";
import axios from "axios";
import Head from "next/head";
import GoBack from "../components/GoBack";
import Json from "../components/Json";
import { useLabels } from "../contexts/labels";
import { useToasts } from "../contexts/toasts";
import { Box } from "@mantine/core";

export default function Schemas() {
  const [schemas, setSchemas] = useState<Array<IdentitySchemaContainer>>();

  const router = useRouter();
  const labels = useLabels();
  const toasts = useToasts();

  useEffect(() => {
    async function fetchSchemas() {
      try {
        const { data } = await publicApi.listIdentitySchemas();
        setSchemas(data);
      } catch (err) {
        const message = axios.isAxiosError(err)
          ? err.response?.data?.error?.reason
          : err.message;
        toasts.error(message);
        await router.push("/");
      }
    }

    fetchSchemas().then();
  }, [router, toasts.error]);

  if (!schemas) return null;

  return (
    <Box>
      <Head>
        <title>{labels.schemas.title}</title>
      </Head>
      <Layout>
        {schemas.map((schema) => (
          <Panel key={schema.id}>
            <Json object={schema} />
          </Panel>
        ))}
        <Panel>
          <GoBack />
        </Panel>
      </Layout>
    </Box>
  );
}
