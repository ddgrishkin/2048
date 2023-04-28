import React, {useCallback} from 'react';
import styles from './index.css';

export type Props = {
  onClick(): void;
};

export function ButtonSettings({onClick}: Props) {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <button className={styles.button} type='button' onClick={handleClick} title='Settings'>
      <div className={styles.figure}>
        <div className={styles.first} />
        <div className={styles.second} />
        <div className={styles.circle} />
      </div>
    </button>
  )
}
