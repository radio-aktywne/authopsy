import Layout from "../components/Layout";
import LinkButton from "../components/LinkButton";
import Panel from "../components/Panel";
import Link from "../components/Link";

export default function Index() {
  return (
    <Layout title="authopsy">
      <Panel>
        <Link href="/invite">
          <LinkButton title={"Invite"}>Invite</LinkButton>
        </Link>
        <Link href="/identities">
          <LinkButton title={"Identities"}>Identities</LinkButton>
        </Link>
        <Link href="/schemas">
          <LinkButton title={"Schemas"}>Schemas</LinkButton>
        </Link>
      </Panel>
    </Layout>
  );
}
