import { Navbar } from '@components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { Footer } from '@components/Footer/Footer';
import styles from './LayoutsStyle.module.scss';

const CommonLayout = () => {

  return (
    <div className={styles.COMMON_LAYOUT}>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default CommonLayout;