import { createContext, useContext } from 'react';
import { AsyncProcessManager } from '..';

export const AsyncProcessManagerContext =
  createContext<AsyncProcessManager | null>(null);

export const useAsyncProcessManagerContext = () =>
  useContext(AsyncProcessManagerContext);
