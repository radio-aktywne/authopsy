import CenterLink from "../components/CenterLink";
import Layout from "../components/Layout";
import Panel from "../components/Panel";
import Link from "../components/Link";
import { useEffect, useState } from "react";
import { IdentitySchemaContainer } from "@ory/client";
import { useRouter } from "next/router";
import { publicApi } from "../lib/ory";
import axios from "axios";
import { toast } from "react-toastify";
import CodeBox from "../components/CodeBox";

export default function Schemas() {
  const [schemas, setSchemas] = useState<Array<IdentitySchemaContainer>>();

  const router = useRouter();

  useEffect(() => {
    async function fetchSchemas() {
      try {
        const { data } = await publicApi.listIdentitySchemas();
        setSchemas(data);
      } catch (err) {
        const message = axios.isAxiosError(err)
          ? err.response?.data?.error?.reason
          : err.message;
        console.log(message);
        toast.error(message);
        await router.push("/");
      }
    }

    fetchSchemas().then();
  }, [router]);

  if (!schemas) return null;

  return (
    <Layout title="schemas · authopsy">
      {schemas.map((schema) => (
        <Panel key={schema.id}>
          <CodeBox code={JSON.stringify(schema, null, 2)} />
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
