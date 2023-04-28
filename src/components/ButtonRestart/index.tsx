import React, {useCallback} from 'react';
import styles from './index.css';

export type Props = {
  onClick(): void;
};

export function ButtonRestart({onClick}: Props) {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <button className={styles.button} type='button' onClick={handleClick} title='Restart'>
      <div className={styles.figure}>
        <div className={styles.circle}>
          <div className={styles.arrow}></div>
        </div>
      </div>
    </button>
  )
}
