import Layout from "../components/Layout";
import Panel from "../components/Panel";
import { useCallback, useState } from "react";
import { SelfServiceRecoveryLink } from "@ory/client";
import { adminApi } from "../lib/ory";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import { Box, Button } from "@mantine/core";
import GoBack from "../components/GoBack";
import Code from "../components/Code";
import { useLabels } from "../contexts/labels";
import { useToasts } from "../contexts/toasts";

export default function Invite() {
  const [recoveryLink, setRecoveryLink] = useState<SelfServiceRecoveryLink>();

  const router = useRouter();
  const labels = useLabels();
  const toasts = useToasts();

  const onClick = useCallback(async () => {
    try {
      const { data: identity } = await adminApi.adminCreateIdentity({
        schema_id: "user",
        traits: {},
      });
      const { data: link } = await adminApi.adminCreateSelfServiceRecoveryLink({
        identity_id: identity.id,
      });
      setRecoveryLink(link);
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.error?.reason
        : err.message;
      toasts.error(message);
      await router.push("/");
    }
  }, [router, toasts.error]);

  return (
    <Box>
      <Head>
        <title>{labels.invite.title}</title>
      </Head>
      <Layout>
        <Panel>
          <Button onClick={onClick} title={labels.invite.buttons.generate}>
            {labels.invite.buttons.generate}
          </Button>
        </Panel>
        {recoveryLink && (
          <Panel>
            <Code code={recoveryLink.recovery_link} />
          </Panel>
        )}
        <Panel>
          <GoBack />
        </Panel>
      </Layout>
    </Box>
  );
}
