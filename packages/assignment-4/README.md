# React를 직접 구현해보자

## 시도해볼 것

## Basic 목표

이번 과제는 테스트 코드보단 클린코드 작성에 조금 더 집중해주세요. 테스트 코드는 여러분이 작성한 코드의 사이드 이펙트를 점검하기 위한 용도입니다.

## (1) 어플리케이션 요구사항

- 상품
  - 상품1 - 10,000원
  - 상품2 - 20,000원
  - 상품3 - 30,000원
- 상품 관리
  - 상품을 장바구니에 추가할 수 있어야 한다.
  - 장바구니에서 상품을 제거할 수 있어야 한다.
  - 각 상품의 수량을 변경할 수 있어야 한다.
- 가격 계산
  - 장바구니 내 모든 상품의 총액을 계산해야 한다.
  - 개별 상품의 가격과 수량에 따른 소계를 표시해야 한다.
  - 상품1 > 10개 이상 구매 시 10% 할인
  - 상품2 > 10개 이상 구매 시 15% 할인
  - 상품3 > 10개 이상 구매 시 20% 할인
  - 상품 종류와 상관 없이, 30개 이상 구매할 경우 25% 할인
- 기본 기능
  - 장바구니에 상품 추가 기능
  - 장바구니에서 상품 제거 기능
  - 상품 수량 변경 기능
  - 장바구니 내역 조회 기능
  - 총액 계산 기능

## (2) 더티코드 개선

### 1) 제공되는 더티 코드

- 매우매우매우 더티한 코드가 제공됩니다. 이를 개선해보세요.

  ```jsx
  function main() {
    var p = [
      { id: "p1", n: "상품1", p: 10000 },
      { id: "p2", n: "상품2", p: 20000 },
      { id: "p3", n: "상품3", p: 30000 },
    ];

    var a = document.getElementById("app");
    var w = document.createElement("div");
    var b = document.createElement("div");
    var h = document.createElement("h1");
    var ct = document.createElement("div");
    var tt = document.createElement("div");
    var s = document.createElement("select");
    var ab = document.createElement("button");

    ct.id = "cart-items";
    tt.id = "cart-total";
    s.id = "product-select";
    ab.id = "add-to-cart";
    w.className = "bg-gray-100 p-8";
    b.className =
      "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8";
    h.className = "text-2xl font-bold mb-4";
    tt.className = "text-xl font-bold my-4";
    s.className = "border rounded p-2 mr-2";
    ab.className = "bg-blue-500 text-white px-4 py-2 rounded";
    h.textContent = "장바구니";
    ab.textContent = "추가";

    for (var j = 0; j < p.length; j++) {
      var o = document.createElement("option");
      o.value = p[j].id;
      o.textContent = p[j].n + " - " + p[j].p + "원";
      s.appendChild(o);
    }

    b.appendChild(h);
    b.appendChild(ct);
    b.appendChild(tt);
    b.appendChild(s);
    b.appendChild(ab);
    w.appendChild(b);
    a.appendChild(w);

    function uc() {
      var t = 0;
      var tq = 0;
      var items = ct.children;
      var tb = 0;

      for (var m = 0; m < items.length; m++) {
        var item;
        for (var n = 0; n < p.length; n++) {
          if (p[n].id === items[m].id) {
            item = p[n];
            break;
          }
        }
        var quantity = parseInt(
          items[m].querySelector("span").textContent.split("x ")[1]
        );
        var itemTotal = item.p * quantity;
        var disc = 0;

        tq += quantity;
        tb += itemTotal;
        if (quantity >= 10) {
          if (item.id === "p1") disc = 0.1;
          else if (item.id === "p2") disc = 0.15;
          else if (item.id === "p3") disc = 0.2;
        }
        t += itemTotal * (1 - disc);
      }

      var dr = 0;
      if (tq >= 30) {
        var bulkDiscount = t * 0.25;
        var individualDiscount = tb - t;
        if (bulkDiscount > individualDiscount) {
          t = tb * 0.75;
          dr = 0.25;
        } else {
          dr = (tb - t) / tb;
        }
      } else {
        dr = (tb - t) / tb;
      }

      tt.textContent = "총액: " + Math.round(t) + "원";
      if (dr > 0) {
        var dspan = document.createElement("span");
        dspan.className = "text-green-500 ml-2";
        dspan.textContent = "(" + (dr * 100).toFixed(1) + "% 할인 적용)";
        tt.appendChild(dspan);
      }
    }

    ab.onclick = function () {
      var v = s.value;
      var i;
      for (var k = 0; k < p.length; k++) {
        if (p[k].id === v) {
          i = p[k];
          break;
        }
      }
      if (i) {
        var e = document.getElementById(i.id);
        if (e) {
          var q =
            parseInt(e.querySelector("span").textContent.split("x ")[1]) + 1;
          e.querySelector("span").textContent = i.n + " - " + i.p + "원 x " + q;
        } else {
          var d = document.createElement("div");
          var sp = document.createElement("span");
          var bd = document.createElement("div");
          var mb = document.createElement("button");
          var pb = document.createElement("button");
          var rb = document.createElement("button");
          d.id = i.id;
          d.className = "flex justify-between items-center mb-2";
          sp.textContent = i.n + " - " + i.p + "원 x 1";
          mb.className =
            "quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1";
          mb.textContent = "-";
          mb.dataset.productId = i.id;
          mb.dataset.change = "-1";
          pb.className =
            "quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1";
          pb.textContent = "+";
          pb.dataset.productId = i.id;
          pb.dataset.change = "1";
          rb.className = "remove-item bg-red-500 text-white px-2 py-1 rounded";
          rb.textContent = "삭제";
          rb.dataset.productId = i.id;
          bd.appendChild(mb);
          bd.appendChild(pb);
          bd.appendChild(rb);
          d.appendChild(sp);
          d.appendChild(bd);
          ct.appendChild(d);
        }
        uc();
      }
    };

    ct.onclick = function (event) {
      var target = event.target;
      if (
        target.classList.contains("quantity-change") ||
        target.classList.contains("remove-item")
      ) {
        var productId = target.dataset.productId;
        var item = document.getElementById(productId);
        if (target.classList.contains("quantity-change")) {
          var change = parseInt(target.dataset.change);
          var quantity =
            parseInt(item.querySelector("span").textContent.split("x ")[1]) +
            change;
          if (quantity > 0) {
            item.querySelector("span").textContent =
              item.querySelector("span").textContent.split("x ")[0] +
              "x " +
              quantity;
          } else {
            item.remove();
          }
        } else if (target.classList.contains("remove-item")) {
          item.remove();
        }
        uc();
      }
    };
  }

  main();
  ```

### 2) 코드 개선 요구사항

1. **prettier, eslint 등을 무조건 추가합니다.**
2. 변수의 이름을 명확하게 표현할 것: 모든 변수와 함수의 이름은 그 용도와 기능을 명확히 나타내도록 작성해야 합니다.
3. 중복이 되는 로직은 함수로 분리할 것: 반복되는 로직은 별도의 함수로 추출하여 코드 중복을 제거해야 합니다.
4. DOM API 사용을 최소화할 것: 템플릿 문자열을 사용하여 HTML 생성을 최적화하고, DOM 조작은 필요한 최소한으로 줄여야 합니다.
5. 중첩 if를 사용하지 않을 것: 조건문을 단순화하고, 삼항 연산자나 early return 등을 사용하여 중첩된 if 문을 피해야 합니다.
6. 상수를 적극적으로 사용할 것: 매직 넘버와 반복되는 문자열을 제거하기 위해 상수를 사용해야 하며, 이러한 상수는 함수 외부에 전역으로 정의해야 합니다.
7. 데이터 처리 로직을 더 선언적으로 작성하기 위해 `reduce`, `filter`, `map` 등의 **고차 함수**를 사용해야 합니다.
8. 동적으로 생성되는 요소에 대한 효율적인 이벤트 처리를 위해 **이벤트 위임**을 사용해야 합니다.
9. 확장성 고려: 상품, 할인율 등을 쉽게 수정하고 확장할 수 있도록 설계해야 합니다.
10. 성능 최적화: 불필요한 DOM 조작을 최소화하고, 효율적인 데이터 구조를 사용하여 성능을 개선해야 합니다.
11. 일관된 코딩 스타일, 적절한 들여쓰기, 논리적인 함수 배치 등을 통해 전반적인 코드 가독성을 향상시켜야 합니다.

### 3) 코드를 작성하면서 생각해볼 것.

- **가독성**: 좋은 코드는 읽기 쉽고 이해하기 쉽습니다.
- **유지보수성**: 좋은 코드는 수정사항에 대응하기 쉬우며, 수정에 독립적이고 찾기 쉽습니다.
- **확장성**: 좋은 코드는 새로운 기능을 추가할 때, 기존 코드를 크게 수정하지 않을 수 있습니다.
- **견고성**: 좋은 코드는 에러가 발생했을 경우에도 동작하거나 대응하고, 에러를 발견하기 쉽습니다.
- **🔥 “테스트 가능성**: 좋은 코드는 테스트를 작성하기 쉬우며, 단위별 테스트를 할 수 있습니다.”
- **자기문서화**: 좋은 코드는 요구사항을 코드 자체로 이해할 수 있게 합니다.
- **일관성**: 좋은 코드는 같은 규칙과 철학으로 작성되어 예측이 가능합니다.

왜 이 코드가 더 좋아졌는지를 위 기준에 의거해서 설명할 수 있도록 합시다. 그리고 구체적인 방법들은 리팩토링 2판이나 GPT를 통해서 방법들을 함께 찾아보고 논의해보세요.

## (과제) 팀별 좋은코드 체크리스트 만들기 (여러분들끼리 서로 논의하면서 체크리스트를 늘려가 보세요!)

- [ ] 코드를 적절한 모듈로 분리하였는가?
- [ ] 상수를 적극적으로 사용하였는가?
- [ ] 가독성을 개선하였는가?
- [ ] 이벤트 처리 로직을 최적화하였는가?
- [ ] 상태 관리 방식을 개선하였는가?
- [ ] 변수와 함수 이름을 명확하게 지었는가?
- [ ] 중복 코드를 제거하고 재사용성을 높였는가?
- [ ] DOM 조작을 최소화하였는가?
- [ ] 코드의 테스트 가능성을 향상시켰는가?
- [ ] ...

## 개선된 점

(주요 개선 사항을 간단히 서술해주세요)

## 추가 고려사항

(추가로 개선이 필요한 부분이나 고려사항이 있다면 작성해주세요)

## Advanced 목표

심화과제는 토대로 몇 가지 원칙을 기반으로 **기본과제에서 작성한 코드를 리팩토링 하는 것**입니다.

## (1) 🔥 구조화

원칙: **데이터, UI 템플릿, 렌더링 등을 분리하여 관리**해봅시다.

1. 데이터를 다루는 코드를 분리합니다. (createShoppingCart)
2. UI 템플릿을 다루는 코드를 분리합니다. (templates)
3. 렌더링과 관련된 코드를 분리합니다. (createCartView)
4. 1~3을 조합하여 어플리케이션을 재구성 합니다.

**어느정도 구조화 가이드 라인을 제공하긴 하지만, 여러분들이 생각하는 최상의 코드를 만들어서 제출해주세요. 테스트 코드를 수정해도 좋고, 새로운 파일을 만들어도 좋고, 최대한 자유롭게 작성해주시면 된답니다.**
