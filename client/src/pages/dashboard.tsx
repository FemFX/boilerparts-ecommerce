import Layout from "@/components/layout";
import Header from "@/components/modules/Header/Header";
import DashboardPage from "@/components/templates/DashboardPage";
import useRedirectByUserCheck from "@/hooks/useRedirectByUserCheck";
import Head from "next/head";

const Dashboard = () => {
  const { shouldLoadContent } = useRedirectByUserCheck();

  return (
    <>
      <Head>
        <title>Аква Термикс</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
      </Head>
      {shouldLoadContent && (
        <Layout>
          <main>
            <DashboardPage />
            <div className="overlay" />
          </main>
        </Layout>
      )}
    </>
  );
};
export default Dashboard;
