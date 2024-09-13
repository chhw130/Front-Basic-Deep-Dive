import { createHooks } from "./hooks";
import { render as updateElement } from "./render";

function MyReact() {
  let rootNode = null;
  let oldNode = null;
  let newNode = null;

  //useState에서 setState의 callback으로 넘겨야함
  const _render = () => {
    resetHookContext();

    if (!oldNode || !newNode || !rootNode) {
      return;
    }

    //새로운 context를 가진 컴포넌트 실행
    const node = newNode();

    updateElement(rootNode, node, oldNode);

    //새로운 노드는 oldNode가 된다.
    oldNode = node;
  };
  function render($root, rootComponent) {
    resetHookContext();

    //루트를 저장
    rootNode = $root;

    newNode = rootComponent;
    const node = newNode();

    updateElement($root, node);

    //현재 context를 기반으로 한 컴포넌트
    oldNode = node;
  }

  const {
    useState,
    useMemo,
    resetContext: resetHookContext,
  } = createHooks(_render);

  return { render, useState, useMemo };
}

export default MyReact();
