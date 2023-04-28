import React, {useCallback} from 'react';
import styles from './index.css';

export type Props = {
  onClick(): void;
};

export function ButtonClose({onClick}: Props) {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <button className={styles.button} type='button' onClick={handleClick} title='Close dialog'>
      <div className={styles.figure} />
    </button>
  );
}
