import { UseBoundStore, StoreApi } from 'zustand';

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & {
      use: {
        [K in keyof T]: () => T[K];
      };
    }
  : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(_store: S) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = Object.fromEntries(
    Object.keys(store.getState()).map((key) => [
      key,
      () => store((state) => state[key as keyof typeof state]),
    ])
  ) as WithSelectors<typeof _store>['use'];

  return store;
};

export default createSelectors;
