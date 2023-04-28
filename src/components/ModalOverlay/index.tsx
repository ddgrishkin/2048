import React from 'react';
import styles from './index.css';

export type Props = {
  children: React.ReactNode;
}

export function ModalOverlay({children}: Props) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}
