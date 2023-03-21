import "@/styles/globals.css";
import Layout from "@/components/Layouts/Layout";
import BlankLayout from "@/components/Layouts/BlankLayout";
import { useRouter } from "next/router";
import SettingsLayout from "@/components/Layouts/SettingsLayout";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const pageIsForAuth = router.route.includes("/auth/");
  const pageIsForSettings = router.route.includes("/settings");
  const pageIsIndex = router.route === "/";

  const getLayout = (page) => {
    if (pageIsForAuth || pageIsIndex) {
      return <BlankLayout children={page} />;
    }

    if (pageIsForSettings) {
      return (
        <Layout>
          <SettingsLayout children={page} />
        </Layout>
      );
    }

    return <Layout children={page} />;
  };

  return <>{getLayout(<Component {...pageProps} />, pageProps)}</>;
}
