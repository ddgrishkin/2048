import {createContext} from 'react';
import {DialogManager} from './index';

export const DialogManagerContext = createContext<DialogManager | undefined>(undefined);
