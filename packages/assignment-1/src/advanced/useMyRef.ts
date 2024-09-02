import { useMemo } from "react";

export function useMyRef<T>(initValue: T | null) {
  const value = useMemo(() => {
    return { current: initValue };
  }, [initValue]);

  return value;

  // const [value] = useState({current : initValue})
  // return value
}
