import {ModalOverlay} from 'components/ModalOverlay/index';
import React from 'react';
import styles from './index.css';

export type Props = {
  onClose(): void;
  children: React.ReactNode;
}

export function Dialog({children, onClose}: Props) {
  return (
    <ModalOverlay>
      <div className={styles.container}>
        <div className={styles.scrim} onClick={onClose} />
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </ModalOverlay>
  );
}
