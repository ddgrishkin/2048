import {ReactCell} from 'lib/react/ReactCell';
import React, {forwardRef} from 'react';
import {CellView} from './CellView';
import styles from './index.css';

type Props = {
  cells: ReactCell[];
};

export const CellsView = forwardRef<HTMLDivElement, Props>(({cells}, ref) => {
  return (
    <div className={styles.field} ref={ref}>
      <div className={styles.cells}>
        {cells.map((cell) => (
          <CellView key={cell.id} cell={cell} />
        ))}
      </div>
    </div>
  );
});
