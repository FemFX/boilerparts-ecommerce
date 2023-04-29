import Layout from "@/components/layout";
import Header from "@/components/modules/Header/Header";
import CatalogPage from "@/components/templates/CatalogPage/CatalogPage";
import DashboardPage from "@/components/templates/DashboardPage";
import useRedirectByUserCheck from "@/hooks/useRedirectByUserCheck";
import { IQueryParams } from "@/types/catalog";
import { NextPage } from "next";
import Head from "next/head";

const Catalog: NextPage<{ query: IQueryParams }> = ({ query }) => {
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
            <CatalogPage />
            <div className="overlay" />
          </main>
        </Layout>
      )}
    </>
  );
};
export async function getServerSideProps(context: { query: IQueryParams }) {
  return {
    props: { query: { ...context.query } },
  };
}

export default Catalog;
