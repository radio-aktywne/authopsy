import Layout from "../components/Layout";
import Panel from "../components/Panel";
import Head from "next/head";
import { Box, Button } from "@mantine/core";
import { useLabels } from "../contexts/labels";
import Link from "../components/Link";

export default function Index() {
  const labels = useLabels();

  return (
    <Box>
      <Head>
        <title>{labels.index.title}</title>
      </Head>
      <Layout>
        <Panel>
          <Link href="/invite" passHref>
            <Button component="a" title={labels.index.buttons.invite}>
              {labels.index.buttons.invite}
            </Button>
          </Link>
          <Link href="/identities" passHref>
            <Button component="a" title={labels.index.buttons.identities}>
              {labels.index.buttons.identities}
            </Button>
          </Link>
          <Link href="/schemas" passHref>
            <Button component="a" title={labels.index.buttons.schemas}>
              {labels.index.buttons.schemas}
            </Button>
          </Link>
        </Panel>
      </Layout>
    </Box>
  );
}
