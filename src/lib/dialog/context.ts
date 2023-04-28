import {createContext} from 'react';
import {DialogManager} from './index';

export const initialValue = new DialogManager();

export const DialogManagerContext = createContext(initialValue);
