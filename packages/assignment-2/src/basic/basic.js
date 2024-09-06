import { shallowComparisonObj } from "./basic-util";

export function shallowEquals(target1, target2) {
  if (Object.is(target1, target2)) {
    return true;
  }

  if (
    (target1.constructor === Object && target2.constructor === Object) ||
    (Array.isLikeArray(target1) && Array.isLikeArray(target2))
  ) {
    return shallowComparisonObj(target1, target2);
  }

  return false;
}

export function deepEquals(target1, target2) {
  if (Object.is(target1, target2)) {
    return true;
  }

  if (typeof target1 !== "object" || typeof target2 !== "object") {
    return false;
  }

  if (
    (target1.constructor === Object && target2.constructor === Object) ||
    (Array.isLikeArray(target1) && Array.isLikeArray(target2))
  ) {
    const keys1 = Object.keys(target1);
    const keys2 = Object.keys(target2);

    if (keys1.length !== keys2.length) return false;

    for (let key of keys1) {
      if (!deepEquals(target1[key], target2[key])) {
        return false;
      }
    }

    return true;
  }
  return false;
}

export function createNumber1(n) {
  return {
    valueOf: () => n,
  };
}

export function createNumber2(n) {
  return {
    valueOf: () => `${n}`,
  };
}

export function createNumber3(n) {
  const obj = {
    valueOf: () => n,
    toString: () => `${n}`,
    toJSON: () => `this is createNumber3 => ${n}`,
  };

  return obj;
}

export class CustomNumber {
  static cache = new Map();

  constructor(n) {
    if (CustomNumber.cache.get(n)) {
      return CustomNumber.cache.get(n);
    }

    CustomNumber.cache.set(n, this);

    this.value = n;
  }

  valueOf() {
    return this.value;
  }

  toString() {
    return `${this.value}`;
  }

  toJSON() {
    return `${this.value}`;
  }
}

export function createUnenumerableObject(target) {
  return Object.create(target, {});
}

export function forEach(target, callback) {
  const isLikeArray = target instanceof Array || target instanceof NodeList;

  const newTarget = isLikeArray ? Array.from(target) : target;

  for (let key in newTarget) {
    const numKey = Number(key);
    const data = isNaN(numKey) ? key : numKey;

    callback(target[key], data);
  }
}

export function map(target, callback) {
  const isLikeArray = target instanceof Array || target instanceof NodeList;

  const newTarget = isLikeArray ? Array.from(target) : target;

  const returnData = isLikeArray ? [] : {};

  if (isLikeArray) {
    for (let item of newTarget) {
      returnData.push(callback(item));
    }
    return returnData;
  }

  if (!isLikeArray) {
    for (let item in newTarget) {
      returnData[item] = callback(newTarget[item]);
    }
    return returnData;
  }
}

export function filter(target, callback) {
  const isLikeArray = target instanceof Array || target instanceof NodeList;

  const newTarget = isLikeArray ? Array.from(target) : target;

  const returnData = isLikeArray ? [] : {};

  if (!isLikeArray) {
    for (let item in newTarget) {
      if (callback(newTarget[item])) returnData[item] = newTarget[item];
    }
    return returnData;
  }

  if (isLikeArray) {
    for (let item in newTarget) {
      if (callback(newTarget[item])) returnData.push(newTarget[item]);
    }
    return returnData;
  }
}

export function every(target, callback) {}

export function some(target, callback) {}
