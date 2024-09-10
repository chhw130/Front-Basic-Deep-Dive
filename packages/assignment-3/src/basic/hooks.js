export function createHooks(callback) {
  // const globalState = [];
  // let globalStateIdx = 0;

  const stateContext = {
    idx: 0,
    state: [],
  };

  const useState = (initState) => {
    // 게으른 초기화도 반영
    const state = typeof initState === "function" ? initState() : initState;

    const tempIdx = stateContext.idx;

    // 기존 값이 있다면 그대로
    stateContext.state[tempIdx] = stateContext.state[tempIdx] || state;

    const setState = (newState) => {
      const currentIdx = tempIdx;

      if (!Object.is(stateContext.state[currentIdx], newState)) {
        stateContext.state[currentIdx] = newState;
        callback();
        return;
      }
    };

    stateContext.idx++;

    return [stateContext.state[tempIdx], setState];
  };

  const useMemo = (fn, refs) => {
    return fn();
  };

  const resetContext = () => {
    // 문맥을 초기화 하여 순서를 보장함
    stateContext.idx = 0;
  };

  return { useState, useMemo, resetContext };
}
