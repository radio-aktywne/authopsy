import CenterLink from "../components/CenterLink";
import Layout from "../components/Layout";
import Panel from "../components/Panel";
import Link from "../components/Link";
import { useCallback, useState } from "react";
import { SelfServiceRecoveryLink } from "@ory/client";
import { adminApi } from "../lib/ory";
import Button from "../components/Button";
import CodeBox from "../components/CodeBox";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";

export default function Invite() {
  const [recoveryLink, setRecoveryLink] = useState<SelfServiceRecoveryLink>();

  const router = useRouter();

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
      toast.error(message);
      await router.push("/");
    }
  }, [router]);

  return (
    <Layout title="invite · authopsy">
      <Panel>
        <Button onClick={onClick} title={"Generate invite link"}>
          Generate invite link
        </Button>
      </Panel>
      {recoveryLink && (
        <Panel>
          <CodeBox code={recoveryLink.recovery_link} />
        </Panel>
      )}
      <Panel>
        <Link href="/" passHref>
          <CenterLink>Go back</CenterLink>
        </Link>
      </Panel>
    </Layout>
  );
}
