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

const textContextDefaultValue = {
  user: null,
  todoItems: [],
  count: 0,
};

export const TestContext = createContext({
  value: textContextDefaultValue,
  setValue: () => null,
});

export const TestContextProvider = ({ children }) => {
  const [value, setValue] = useState(textContextDefaultValue);

  return (
    <TestContext.Provider value={{ value, setValue }}>
      {children}
    </TestContext.Provider>
  );
};

const useTestContext = () => {
  return useContext(TestContext);
};

export const useUser = () => {
  const { value, setValue } = useTestContext();

  return [value.user, (user) => setValue({ ...value, user })];
};

export const useCounter = () => {
  const { value, setValue } = useTestContext();

  return [value.count, (count) => setValue({ ...value, count })];
};

export const useTodoItems = () => {
  const { value, setValue } = useTestContext();

  return [value.todoItems, (todoItems) => setValue({ ...value, todoItems })];
};
