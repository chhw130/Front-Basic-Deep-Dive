export function createHooks(callback) {
  const stateContext = {
    idx: 0,
    state: [],
  };

  const memoContext = {
    idx: 0,
    memo: [],
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
    let { idx, memo } = memoContext;
    const currentIdx = idx;
    const previousMemo = memo[currentIdx];

    //이전 메모와 비교
    if (previousMemo) {
      const { refs: prevRefs, value } = previousMemo;

      // 의존성 배열 비교
      const isNotChanged = prevRefs.every((ref, idx) =>
        Object.is(ref, refs[idx])
      );

      // 기존 value 리턴
      if (isNotChanged) {
        idx++;
        return value;
      }
    }

    // 새로운 메모 값
    const newValue = fn();
    memo[currentIdx] = { refs, value: newValue };

    idx++;

    return newValue;
  };

  const resetContext = () => {
    // 문맥을 초기화 하여 순서를 보장함
    stateContext.idx = 0;
    memoContext.idx = 0;
  };

  return { useState, useMemo, resetContext };
}
