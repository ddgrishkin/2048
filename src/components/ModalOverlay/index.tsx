import React, {forwardRef} from 'react';
import styles from './index.css';

export type Props = {
  children: React.ReactNode;
}

export const ModalOverlay = forwardRef<HTMLDivElement, Props>(({children}, ref) => {
  return (
    <div ref={ref} className={styles.container}>
      {children}
    </div>
  );
});
