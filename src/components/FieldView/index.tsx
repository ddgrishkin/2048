import {ReactCell} from 'lib/react/ReactCell';
import React, {forwardRef} from 'react';
import styles from './index.css';
import {GridView} from './GridView';
import {CellView} from './CellView';

type Props = {
  // move over view outside
  isOver: boolean;
  cells: ReactCell[];
};

export const FieldView = forwardRef<HTMLDivElement, Props>(({
  isOver,
  cells,
}, ref) => {
  return (
    <div className={styles.field} ref={ref}>
      <div className={styles.inner}>
        <GridView />
        <div className={styles.cells}>
          {cells.map((cell) => (<CellView key={cell.id} cell={cell} />))}
        </div>
      </div>
      {isOver && (
        <div className={styles.over}>
          <div className={styles.text}>
            <div>Game</div>
            <div>Over</div>
          </div>
        </div>
      )}
    </div>
  );
});
