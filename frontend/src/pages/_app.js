import "@/styles/globals.css";
import Layout from "@/components/Layouts/Layout";
import BlankLayout from "@/components/Layouts/BlankLayout";
import { useRouter } from "next/router";
import SettingsLayout from "@/components/Layouts/SettingsLayout";
import session from "@/utils/session";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const pageIsForAuth = router.route.includes("/auth/");
  const pageIsForSettings = router.route.includes("/settings");
  const pageIsIndex = router.route === "/";

  useEffect(() => {
    if (!pageIsForAuth && !pageIsIndex && !session.isLoggedIn()) {
      router.push("/auth/login");
    }
  }, [router.asPath]);

  const getLayout = (page) => {
    if (pageIsForAuth || pageIsIndex) {
      return (
        <>
          <BlankLayout children={page} />
          <Toaster position="top-center" reverseOrder={false} />
        </>
      );
    }

    if (pageIsForSettings) {
      return (
        <Layout children={page}>
          <SettingsLayout children={page} />
          <Toaster position="top-center" reverseOrder={false} />
        </Layout>
      );
    }

    return (
      <>
        <Layout children={page} />
        <Toaster position="top-center" reverseOrder={false} />
      </>
    );
  };

  return <>{getLayout(<Component {...pageProps} />, pageProps)}</>;
}
