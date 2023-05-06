import {ModalOverlay} from 'components/ModalOverlay/index';
import React, {forwardRef} from 'react';
import styles from './index.css';

export type Props = {
  onClose(): void;
  children: React.ReactNode;
}

export const Dialog = forwardRef<HTMLDivElement, Props>(({children, onClose}, ref) => {
  return (
    <ModalOverlay ref={ref}>
      <div className={styles.container}>
        <div className={styles.scrim} onClick={onClose} />
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </ModalOverlay>
  );
});
