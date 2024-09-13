import { createHooks } from "./hooks";
import { render as updateElement } from "./render";

function MyReact() {
  let currentNode;

  const _render = () => {
    resetHookContext();
  };
  function render($root, rootComponent) {
    updateElement($root, rootComponent());

    currentNode = rootComponent();
  }

  const {
    useState,
    useMemo,
    resetContext: resetHookContext,
  } = createHooks(_render);

  return { render, useState, useMemo };
}

export default MyReact();
