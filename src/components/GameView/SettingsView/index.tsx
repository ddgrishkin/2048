import {GameConfig} from 'lib/game/types';
import React, {useCallback, useState} from 'react';
import {SettingsField} from './SettingsField';
import styles from './index.css';

export type Props = {
  config: GameConfig;
  onClose(): void;
  onSave(config: GameConfig): void;
};

const VALUES_ROWS = [2, 3, 4, 5];
const VALUES_COLS = [4, 5];
const VALUES_DIGIT = [2, 3, 5, 7];

export function SettingsView({config, onClose, onSave}: Props) {
  const [nextConfig, setNextConfig] = useState(() => ({...config}));
  const handleChangeGeneric = useCallback((field: keyof GameConfig) => {
    return (nextValue: number) => {
      setNextConfig((currConfig) => ({
        ...currConfig,
        [field]: nextValue,
      }));
    }
  }, [])

  const handleSave = useCallback(() => {
    onSave(nextConfig);
    onClose();
  }, [onSave, onClose, nextConfig]);

  return (
    <div className={styles.content}>
      <SettingsField
        label='Digit'
        options={VALUES_DIGIT}
        value={nextConfig.digit}
        onChange={handleChangeGeneric('digit')}
      />
      <SettingsField
        label='Cols, Rows'
        options={VALUES_COLS}
        value={nextConfig.cols}
        onChange={handleChangeGeneric('cols')}
      />
      <SettingsField
        // label='Rows'
        options={VALUES_ROWS}
        value={nextConfig.rows}
        onChange={handleChangeGeneric('rows')}
      />
      <div>
        <button
          role='button'
          onClick={handleSave}
          className={styles.button}
          type='button'
        >
          SAVE
        </button>
      </div>
    </div>
  );
}
