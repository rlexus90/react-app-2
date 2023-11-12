import { createContext } from 'react';
import { RespContextValue } from '../types/types';

export const RespContext = createContext<RespContextValue>({
  respParam: {},
  setRespParam: () => null,
  filmResp: undefined,
  setFilmResp: () => null,
  isFilmLoad: false,
  setIsFilmLoad: () => null,
});
