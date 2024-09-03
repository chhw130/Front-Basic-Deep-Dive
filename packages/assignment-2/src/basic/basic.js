import { shallowComparisonObj } from "./basic-util";

export function shallowEquals(target1, target2) {
  if (Object.is(target1, target2)) {
    return true;
  }

  if (
    (target1.constructor === Object && target2.constructor === Object) ||
    (Array.isArray(target1) && Array.isArray(target2))
  ) {
    return shallowComparisonObj(target1, target2);
  }

  return false;
}

export function deepEquals(target1, target2) {
  return target1 === target2;
}

export function createNumber1(n) {
  return n;
}

export function createNumber2(n) {
  return n;
}

export function createNumber3(n) {
  return n;
}

export class CustomNumber {}

export function createUnenumerableObject(target) {
  return target;
}

export function forEach(target, callback) {}

export function map(target, callback) {}

export function filter(target, callback) {}

export function every(target, callback) {}

export function some(target, callback) {}
