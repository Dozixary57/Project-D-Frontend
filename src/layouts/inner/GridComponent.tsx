import ObjectsSearcher from '@components/ObjectsSearcher/ObjectsSearcher';
import styles from './ComponentsStyle.module.scss';

const GridComponent = ({ children }: { children: React.ReactNode }, { WithSearch = false }: { WithSearch: boolean }) => {
  return (
    <div className={styles.LIST_COMPONENT}>
      {WithSearch && <ObjectsSearcher />}
      {children}
    </div>
  );
}

export default GridComponent;