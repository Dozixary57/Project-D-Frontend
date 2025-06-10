import { Outlet } from 'react-router-dom';
import styles from './ListComponent.module.scss';
import ObjectsSearcher from '@components/ObjectsSearcher/ObjectsSearcher';

const ListComponent = () => {
  return (
    <div className={styles.LIST_COMPONENT}>
      <ObjectsSearcher
        Title="Ideas"
      />
      <Outlet />
    </div>
  );
}

export default ListComponent;