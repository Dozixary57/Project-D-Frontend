import { Navbar } from '@components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { Footer } from '@components/Footer/Footer';
import styles from './LayoutsStyle.module.scss';
import { ProjectVisionPanel } from '@pages/VisionPage/ProjectVisionPage';
import { useUrlSegment } from '@tools/UrlSegments';
import { useEffect } from 'react';

const MainLayout = ({ children }: { children?: React.ReactNode }) => {
  const urlSegment = useUrlSegment(0);
  const excludedUrlSegments = ['Vision'];

  return (
    <div className={styles.MAIN_LAYOUT}>
      <Navbar />
      <main>
        {urlSegment !== null && !excludedUrlSegments.includes(urlSegment) &&
          <ProjectVisionPanel />
        }
        {children ? children : <Outlet />}
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;