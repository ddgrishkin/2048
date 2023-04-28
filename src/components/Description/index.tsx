import React from 'react';
import styles from './index.css';

export function Description() {
  return (
    <div className={styles.description}>
      <p>
        <b>HOW TO PLAY:</b> Use your <b>arrow keys</b> to move the tiles.
        Tiles with the same number <b>merge into</b> one when they touch. 
        Also you can configure the game settings with the gear above.
      </p>
    </div>
  );
}
