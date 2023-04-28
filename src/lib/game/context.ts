import {Game} from '.';
import {createContext} from 'react';
import {DEFAULT_CONFIG} from './constants';

const initialState: Game = new Game(DEFAULT_CONFIG);

export const GameContext = createContext(initialState);

export const GameConfigContext = createContext(DEFAULT_CONFIG);
