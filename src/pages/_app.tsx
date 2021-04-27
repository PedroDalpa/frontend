import { Header } from '../components/Header';

import styles from '../styles/app.module.scss';
import '../styles/global.scss';
import 'antd/dist/antd.css';
import { LaunchContextProvider } from '../context/Production/LaunchContext';

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.wrapper}>
      <main>
        <Header />
        <LaunchContextProvider>
          <Component {...pageProps} />
        </LaunchContextProvider>
      </main>
      {/* <Player /> vai ficar o sidebar???? */}
    </div>
  );
}

export default MyApp;
