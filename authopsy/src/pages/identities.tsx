import CenterLink from "../components/CenterLink";
import Layout from "../components/Layout";
import Panel from "../components/Panel";
import Link from "../components/Link";
import { useEffect, useState } from "react";
import { Identity } from "@ory/client";
import { useRouter } from "next/router";
import { adminApi } from "../lib/ory";
import axios from "axios";
import { toast } from "react-toastify";
import CodeBox from "../components/CodeBox";

export default function Identities() {
  const [identities, setIdentities] = useState<Array<Identity>>();

  const router = useRouter();

  useEffect(() => {
    async function fetchIdentities() {
      try {
        const { data } = await adminApi.adminListIdentities();
        setIdentities(data);
      } catch (err) {
        const message = axios.isAxiosError(err)
          ? err.response?.data?.error?.reason
          : err.message;
        toast.error(message);
        await router.push("/");
      }
    }

    fetchIdentities().then();
  }, [router]);

  if (!identities) return null;

  return (
    <Layout title="identities · authopsy">
      {identities.map((identity) => (
        <Panel key={identity.id}>
          <CodeBox code={JSON.stringify(identity, null, 2)} />
        </Panel>
      ))}
      <Panel>
        <Link href="/" passHref>
          <CenterLink>Go back</CenterLink>
        </Link>
      </Panel>
    </Layout>
  );
}
