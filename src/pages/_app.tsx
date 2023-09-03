import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { store } from "../app/state/store";
import MainLayout from "../app/components/Layout/Layout";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = ({
    Component,
    pageProps,
  }: {
    Component: any;
    pageProps: any;
  }) => {
    if (Component.getLayout) {
      return Component.getLayout(<Component {...pageProps} />);
    } else {
      return <Component {...pageProps} />;
    }
  };

  return (
    <Provider store={store}>
      <MainLayout>
        <Layout Component={Component} pageProps={pageProps} />
      </MainLayout>
    </Provider>
  );
}
//     return (
//         <Provider store={store}>
//             <Layout>
//                 <Component {...pageProps} />
//             </Layout>
//         </Provider>
//     );
// }

export default MyApp;
