import {
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';

const GlobalStateContext = createContext();

const initailState = {
  refreshToken: '',
};

const reducers = {
  setRefreshToken(state, { payload: { refreshToken } }) {
    return {
      ...state,
      refreshToken,
    };
  },
};

function defaultReducer(state) {
  return state;
}

// eslint-disable-next-line default-param-last
function reducer(state = initailState, action) {
  return (reducers[action.type] || defaultReducer)(state, action);
}

export default function GlobalStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initailState);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  const context = useContext(GlobalStateContext);

  if (context === undefined) {
    throw new Error('useGlobalState should be used within GlobalStateProvider');
  }

  return context;
}
