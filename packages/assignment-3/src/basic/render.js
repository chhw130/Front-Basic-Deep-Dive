export function jsx(type, props, ...children) {
  const childrens = children;
  return { type, props, childrens };
}

// jsx를 dom으로 변환
export function createElement(node) {
  if (typeof node === "string") {
    // text로만된 node를 만들수도 있음.
    return document.createTextNode(node);
  }

  const { type, props, childrens } = node;
  const newNode = document.createElement(type);

  if (props) {
    const property = Object.entries(props);
    property.forEach((ele) => {
      const [key, attribute] = ele;
      newNode.setAttribute(key, attribute);
    });
  }

  // children요소가 하나뿐이고 string이라면 early return
  if (childrens.length === 1 && typeof childrens[0] === "string") {
    newNode.textContent = childrens;
    return newNode;
  }

  // childrendythrk 여러개라면 재귀로 child요소를 붙여주기
  if (childrens && childrens.length > 1) {
    for (let children of childrens) {
      const childrenElement = createElement(children);

      newNode.appendChild(childrenElement);
    }
  }

  return newNode;
}

function updateAttributes(target, newProps, oldProps) {
  const newPropsObj = newProps || {};
  const oldPropsObj = oldProps || {};

  // newProps들을 반복하여 각 속성과 값을 확인
  Object.entries(newPropsObj).forEach((newProp) => {
    const [key, value] = newProp;

    //   만약 oldProps에 같은 속성이 있고 값이 동일하다면
    //     다음 속성으로 넘어감 (변경 불필요)
    if (newProp[key] === oldPropsObj[key]) {
      return;
    }

    //   만약 위 조건에 해당하지 않는다면 (속성값이 다르거나 구속성에 없음)
    //     target에 해당 속성을 새 값으로 설정
    target.setAttribute(key, value);
  });

  // oldProps을 반복하여 각 속성 확인
  Object.entries(oldPropsObj).forEach((newProp) => {
    const [key] = newProp;

    //   만약 newProps들에 해당 속성이 존재한다면
    //     다음 속성으로 넘어감 (속성 유지 필요)
    if (newPropsObj[key]) {
      return;
    }

    //   만약 newProps들에 해당 속성이 존재하지 않는다면
    //     target에서 해당 속성을 제거
    target.removeAttribute(key);
  });
}

export function render(parent, newNode, oldNode, index = 0) {
  // 1. 만약 newNode가 없고 oldNode만 있다면
  //   parent에서 oldNode를 제거
  //   종료
  if (!newNode && oldNode) {
    parent.removeChild(oldNode);
    return;
  }
  // 2. 만약 newNode가 있고 oldNode가 없다면
  //   newNode를 생성하여 parent에 추가
  //   종료
  if (newNode && !oldNode) {
    const newElement = createElement(newNode);
    parent.appendChild(newElement);
    return;
  }

  // 3. 만약 newNode와 oldNode 둘 다 문자열이고 서로 다르다면
  //   oldNode를 newNode로 교체
  //   종료
  if (
    typeof newNode === "string" &&
    typeof oldNode === "string" &&
    newNode !== oldNode
  ) {
    const newElement = createElement(newNode);
    parent.replaceChild(newElement, parent.children[index]);
    return;
  }

  // 4. 만약 newNode와 oldNode의 타입이 다르다면
  //   oldNode를 newNode로 교체
  //   종료
  // 5. newNode와 oldNode에 대해 updateAttributes 실행

  updateAttributes(parent.children[index], newNode.props, oldNode.props);

  // 6. newNode와 oldNode 자식노드들 중 더 긴 길이를 가진 것을 기준으로 반복
  //   각 자식노드에 대해 재귀적으로 render 함수 호출
  const newChildrens = newNode.childrens;
  const oldChildrens = oldNode.childrens;

  const repeatChild = Math.max(
    newChildrens?.length ?? 0,
    oldChildrens?.length ?? 0
  );

  for (let i = 0; i < repeatChild; i++) {
    render(parent.childNodes[index], newChildrens[i], oldChildrens[i], i);
  }
}
