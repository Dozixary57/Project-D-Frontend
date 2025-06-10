import { Navbar } from '@components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { Footer } from '@components/Footer/Footer';
import styles from './LayoutsStyle.module.scss';
import { ProjectVisionPanel } from '@pages/VisionPage/ProjectVisionPage';
import { useLastUrlSegment } from '@tools/LastUrlSegment';

const MainLayout = () => {
  const lastSegment = useLastUrlSegment();

  return (
    <div className={styles.MAIN_LAYOUT}>
      <Navbar />
      <main>
        <Outlet />
        {lastSegment !== 'Vision' && lastSegment !== 'Login' && <ProjectVisionPanel />}
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;