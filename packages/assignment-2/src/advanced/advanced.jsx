import { createContext, useContext, useState } from "react";
import { shallowEquals } from "../basic/basic";

export const memo1 = (() => {
  const cache = new Map();

  return (fn) => {
    if (cache.get(JSON.stringify(fn))) {
      return cache.get(JSON.stringify(fn));
    }

    cache.set(JSON.stringify(fn), fn());

    return cache.get(JSON.stringify(fn));
  };
})();

export const memo2 = (() => {
  const cache = new Map();

  return (fn, keys) => {
    const [key] = keys;
    if (cache.get(key)) {
      return cache.get(key);
    }

    cache.set(key, fn());

    return cache.get(key);
  };
})();

export const useCustomState = (initialValue) => {
  const [state, setState] = useState(initialValue);

  const newSetState = (value) => {
    if (!shallowEquals(state, value)) {
      return setState(value);
    }
  };

  return [state, newSetState];
};

const TestUserContext = createContext();
const TestTodoContext = createContext();
const TestCounterContext = createContext();

export const TestContextProvider = ({ children }) => {
  return (
    <TestUserContextProvider>
      <TestTodoContextProvider>
        <TestCounterContextProvider>{children}</TestCounterContextProvider>
      </TestTodoContextProvider>
    </TestUserContextProvider>
  );
};

const TestUserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <TestUserContext.Provider value={{ user, setUser }}>
      {children}
    </TestUserContext.Provider>
  );
};

const TestCounterContextProvider = ({ children }) => {
  const [counter, setCounter] = useState(0);
  return (
    <TestCounterContext.Provider value={{ counter, setCounter }}>
      {children}
    </TestCounterContext.Provider>
  );
};

const TestTodoContextProvider = ({ children }) => {
  const [todo, setTodo] = useState([]);
  return (
    <TestTodoContext.Provider value={{ todo, setTodo }}>
      {children}
    </TestTodoContext.Provider>
  );
};

export const useUser = () => {
  const { user, setUser } = useContext(TestUserContext);
  return [user, setUser];
};

export const useCounter = () => {
  const { counter, setCounter } = useContext(TestCounterContext);
  return [counter, setCounter];
};

export const useTodoItems = () => {
  const { todo, setTodo } = useContext(TestTodoContext);
  return [todo, setTodo];
};
