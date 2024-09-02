import { useMemo } from "react";

export function useMyRef<T>(initValue: T | null) {
  const value = useMemo(() => {
    return { current: initValue };
  }, [initValue]);

  return value;
}
