import { Navbar } from '@components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { FooterMinimized } from '@components/Footer/Footer';
import styles from './LayoutsStyle.module.scss';
import PageHelmet from '@components/PageHelmet/PageHelmet';
import { useLastUrlSegment } from '@tools/LastUrlSegment';

const AuthLayout = () => {
  const lastSegment = useLastUrlSegment();

  return (
    <>
      <PageHelmet title={lastSegment === 'Login' ? 'Log In' : 'Sign Up'} />
      <div className={styles.AUTH_LAYOUT}>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <FooterMinimized />
      </div>
    </>
  );
}

export default AuthLayout;