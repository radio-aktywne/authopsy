import Layout from "../components/Layout";
import Panel from "../components/Panel";
import { useEffect, useState } from "react";
import { Identity } from "@ory/client";
import { useRouter } from "next/router";
import { adminApi } from "../lib/ory";
import axios from "axios";
import Head from "next/head";
import GoBack from "../components/GoBack";
import Json from "../components/Json";
import { useLabels } from "../contexts/labels";
import { useToasts } from "../contexts/toasts";
import { Box } from "@mantine/core";

export default function Identities() {
  const [identities, setIdentities] = useState<Array<Identity>>();

  const router = useRouter();
  const labels = useLabels();
  const toasts = useToasts();

  useEffect(() => {
    async function fetchIdentities() {
      try {
        const { data } = await adminApi.adminListIdentities();
        setIdentities(data);
      } catch (err) {
        const message = axios.isAxiosError(err)
          ? err.response?.data?.error?.reason
          : err.message;
        toasts.error(message);
        await router.push("/");
      }
    }

    fetchIdentities().then();
  }, [router, toasts.error]);

  if (!identities) return null;

  return (
    <Box>
      <Head>
        <title>{labels.identities.title}</title>
      </Head>
      <Layout>
        {identities.map((identity) => (
          <Panel key={identity.id}>
            <Json object={identity} />
          </Panel>
        ))}
        <Panel>
          <GoBack />
        </Panel>
      </Layout>
    </Box>
  );
}
