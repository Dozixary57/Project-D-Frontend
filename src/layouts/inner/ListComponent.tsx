import { Outlet } from 'react-router-dom';
import styles from './ListComponent.module.scss';
import ObjectsSearcher from '@components/ObjectsSearcher/ObjectsSearcher';

const ListComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.LIST_COMPONENT}>
      <ObjectsSearcher />
      {children}
    </div>
  );
}

export default ListComponent;