export const shallowComparisonObj = (target1, target2) => {
  const target1List = Object.entries(target1);
  const target2List = Object.entries(target2);

  if (target1List.length !== target2List.length) return false;

  for (let i = 0; i < target1List.length; i++) {
    const [key1, value1] = target1List[i];
    const [key2, value2] = target2List[i];

    if (key1 !== key2 || value1 !== value2) {
      return false;
    }
  }

  return true;
};
