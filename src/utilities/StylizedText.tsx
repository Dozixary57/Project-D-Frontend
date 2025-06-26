import { useEffect } from 'react';
import styles from './StylizedText.module.scss';

const CellStyledTitleWithShadow = ({ text }: { text: string | number | null }) => {
  if (text === null || text === undefined) {
    return null;
  }

  return <p className={styles.CellTitle}>{text}</p>;
};

const CellStyledAmountWithShadow = ({ text }: { text: string | number | null }) => {
  if (text === null || text === undefined) {
    return null;
  }

  return <p className={styles.CellAmount}>{text}</p>;
};

export {
  CellStyledTitleWithShadow,
  CellStyledAmountWithShadow
};