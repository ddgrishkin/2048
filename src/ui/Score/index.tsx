import React, {useEffect, useRef} from 'react';
import styles from './index.css';

export type Props = {
  value: number;
}

export function Score({value}: Props) {
  const nodeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (nodeRef.current) {
      nodeRef.current.classList.remove(styles.pop);
      nodeRef.current.offsetHeight;
      nodeRef.current.classList.add(styles.pop);
    }
  }, [value]);

  return (
    <div className={styles.score}>
      <span ref={nodeRef}>
        {value}
      </span>
    </div>
  );
}
