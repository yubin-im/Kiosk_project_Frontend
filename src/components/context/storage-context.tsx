import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import { setStorage } from '../util/setStorage';
import { getStorage } from '../util/getStorage';

enum ACTION {
  LOG_IN = 'login',
  LOG_OUT = 'logout',
  SET = 'set',
}
type providerProps = {
  children: ReactNode;
};

type Action =
  | {
      type: ACTION.LOG_IN | ACTION.LOG_OUT;
      payload: UserToken | null;
    }
  | { type: ACTION.SET; payload: Storage };

type Storage = {
  token: UserToken | null;
};

type StorageContextProp = {
  storage: Storage;
  login: (token: string, userId: string) => boolean;
  logout: () => boolean;
};

const SessionContext = createContext<StorageContextProp>({
  storage: { token: null },
  login: () => {
    return false;
  },
  logout: () => {
    return false;
  },
});

const DefaultStorage: Storage = {
  token: null,
};

const reducer = (storage: Storage, { type, payload }: Action) => {
  let newer: Storage;
  switch (type) {
    case ACTION.LOG_IN:
      newer = { ...storage, token: payload };
      break;

    case ACTION.LOG_OUT:
      newer = { ...storage, token: payload };
      break;

    case ACTION.SET:
      newer = { ...payload };
      break;

    default:
      return storage;
  }

  setStorage<string | undefined>('AUTH-TOKEN', newer.token?.token);
  setStorage<string | undefined>('userId', newer.token?.userId);
  return newer;
};

export const StorageProvider = ({ children }: providerProps) => {
  const [storage, dispatch] = useReducer(reducer, DefaultStorage);

  const login = useCallback((token: string, userId: string) => {
    dispatch({ type: ACTION.LOG_IN, payload: { token, userId } });

    return true;
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: ACTION.LOG_OUT, payload: null });
    return true;
  }, []);

  useEffect(() => {
    const storedToken = getStorage<string>('AUTH-TOKEN', '');
    const storedUserId = getStorage<string>('userId', '');

    const userToken: UserToken = { token: storedToken, userId: storedUserId };

    dispatch({
      type: ACTION.SET,
      payload: { token: userToken },
    });
  }, []);

  return (
    <>
      <SessionContext.Provider value={{ storage, login, logout }}>
        {children}
      </SessionContext.Provider>
    </>
  );
};

export const useStorage = () => useContext(SessionContext);
