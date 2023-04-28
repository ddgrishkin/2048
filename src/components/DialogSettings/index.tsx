import {Dialog} from 'components/Dialog';
import {ButtonClose} from 'components/ButtonClose';
import {RadioButton} from 'form/RadioButton';
import {GameConfig} from 'lib/game/types';
import React, {useCallback, useState} from 'react';
import cn from 'classnames';
import styles from './index.css';

export type Props = {
  config: GameConfig;
  onClose(): void;
  onSave(config: GameConfig): void;
}

const VALUES_ROWS = [2, 3, 4, 5];
const VALUES_DIGIT = [2, 3, 5, 7];

export function DialogSettings({config, onClose, onSave}: Props) {
  const [nextConfig, setNextConfig] = useState(() => ({...config}));
  const handleChangeDigit = useCallback((nextDigit: string) => {
    setNextConfig((currConfig) => ({
      ...currConfig,
      digit: Number(nextDigit),
    }));
  }, []);

  const handleChangeRows = useCallback((nextRows: string) => {
    setNextConfig((currConfig) => ({
      ...currConfig,
      rows: Number(nextRows),
    }));
  }, []);

  const handleSave = useCallback(() => {
    onSave(nextConfig);
    onClose();
  }, [onSave, onClose, nextConfig]);

  return (
    <Dialog onClose={onClose}>
      <div className={styles.content}>
        <div className={styles.actions}><ButtonClose onClick={onClose} /></div>
        <label className={styles.label}>
          <div className={styles.text}>DIGIT</div>
          <div className={styles.group}>
            {VALUES_DIGIT.map((digit) => (
              <RadioButton
                key={digit}
                name='digit'
                value={`${digit}`}
                onClick={handleChangeDigit}
                checked={nextConfig.digit === digit}
              >
                <div
                  className={cn(styles.option, {
                    [styles.active]: nextConfig.digit === digit,
                  })}
                >
                  {digit}
                </div>
              </RadioButton>
            ))}
          </div>
        </label>
        <label className={styles.label}>
          <div className={styles.text}>ROWS</div>
          <div className={styles.group}>
            {VALUES_ROWS.map((rows) => (
              <RadioButton
                key={rows}
                name='rows'
                value={`${rows}`}
                onClick={handleChangeRows}
                checked={nextConfig.rows === rows}
              >
                <div
                  className={cn(styles.option, {
                    [styles.active]: nextConfig.rows === rows,
                  })}
                >
                  {rows}
                </div>
              </RadioButton>
            ))}
          </div>
        </label>
        <div className={styles.footer}>
          <button
            role='button'
            onClick={handleSave}
            className={styles.button}
            type='button'
          >
            SAVE
          </button>
          <span className={styles.hint}>
            <b>Be aware:</b> after changing the settings the game will be restarted
          </span>
        </div>
      </div>
    </Dialog>
  );
}
