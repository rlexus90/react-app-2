import { createContext } from 'react';
import { RespContextValue } from '../types/types';

export const RespContext = createContext<RespContextValue>({
  respParam: { page: '1', limit: '10' },
  setRespParam: () => null,
  filmResp: undefined,
  setFilmResp: () => null,
  isFilmLoad: false,
  setIsFilmLoad: () => null,
});
