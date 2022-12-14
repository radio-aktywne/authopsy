import { useCallback, useState } from "react";
import { AppProps } from "next/app";
import { getCookie, setCookie } from "cookies-next";
import Head from "next/head";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import {
  colorSchemeCookieAge,
  colorSchemeCookieName,
  defaultColorScheme,
} from "../theme/constants";
import { RouterTransition } from "../components/RouterTransition";
import theme from "../theme/theme";
import { LabelsProvider } from "../contexts/labels";
import { ToastsProvider } from "../contexts/toasts";
import { GetServerSidePropsContext } from "next";
import labels from "../theme/labels";

type MantineAppProps = {
  colorScheme: ColorScheme;
};

type ExtendedAppProps = AppProps & MantineAppProps;

export default function App(props: ExtendedAppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme
  );

  const toggleColorScheme = useCallback(
    (value?: ColorScheme) => {
      const newColorScheme =
        value || (colorScheme === "dark" ? "light" : "dark");
      setColorScheme(newColorScheme);
      setCookie(colorSchemeCookieName, newColorScheme, {
        maxAge: colorSchemeCookieAge,
      });
    },
    [colorScheme, colorSchemeCookieName, colorSchemeCookieAge]
  );

  return (
    <>
      <Head>
        <meta name="description" content={labels.description} />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ ...theme, colorScheme: colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <NotificationsProvider position="top-right">
            <LabelsProvider>
              <ToastsProvider>
                <RouterTransition />
                <props.Component {...props.pageProps} />
              </ToastsProvider>
            </LabelsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie(colorSchemeCookieName, ctx) || defaultColorScheme,
});
