"use strict";

// https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/server-communication__offline/cypress/integration/offline-spec.js

const goOffline = () => {
  cy.log("**go offline**")
    .then(() =>
      Cypress.automation("remote:debugger:protocol", {
        command: "Network.enable",
      }),
    )
    .then(() =>
      Cypress.automation("remote:debugger:protocol", {
        command: "Network.emulateNetworkConditions",
        params: {
          offline: true,
          latency: -1,
          downloadThroughput: -1,
          uploadThroughput: -1,
        },
      }),
    );
};

const goOnline = () => {
  // offline 모드를 해제합니다. 그렇지 않으면 테스트가 깨질 수 있습니다 :)
  cy.log("**go online**")
    .then(() =>
      // https://chromedevtools.github.io/devtools-protocol/1-3/Network/#method-emulateNetworkConditions
      Cypress.automation("remote:debugger:protocol", {
        command: "Network.emulateNetworkConditions",
        params: {
          offline: false,
          latency: -1,
          downloadThroughput: -1,
          uploadThroughput: -1,
        },
      }),
    )
    .then(() =>
      Cypress.automation("remote:debugger:protocol", {
        command: "Network.disable",
      }),
    );
};

describe("offline", () => {
  describe("site", { browser: "!firefox" }, () => {
    // 테스트가 실패하더라도 반드시 다시 online 상태로 돌립니다.
    // 그렇지 않으면 Cypress가 브라우저 연결을 잃을 수 있습니다.
    beforeEach(goOnline);
    afterEach(goOnline);

    it("shows /migrate/ page", () => {
      const url = "/migrate/";
      const text = "Migrate";

      cy.visit(url);
      cy.get("h1").contains(text);

      // 네트워크를 끊기 전에 service worker가 precaching을 마치고
      // 활성화될 때까지 기다립니다. 그렇지 않으면 offline 방문 시
      // 제공할 내용이 없습니다. `navigator.serviceWorker.ready`는
      // 활성화된 worker가 이 scope를 제어하게 되면 브라우저에서
      // resolve되며, 이 promise를 기다리면 registration property를
      // 직접 읽지 않아도 됩니다. 이는 Cypress의 cross-realm context에서
      // 신뢰하기 어렵기 때문입니다. precaching에는 충분한 timeout을 둡니다.
      cy.window({ timeout: 90000 }).then((win) => {
        cy.wrap(win.navigator.serviceWorker.ready, { timeout: 90000 });
      });

      goOffline();

      cy.visit(url);
      cy.get("h1").contains(text);

      // `guides` 링크를 클릭합니다.
      cy.get('a[title="guides"]').click();
      cy.get("h1").contains("Guides");
    });

    it("open print dialog when accessing /printable url", () => {
      const url = "/migrate/printable";
      cy.visit(url, {
        onBeforeLoad: (win) => {
          cy.stub(win, "print");
        },
      });
      cy.window().then((win) => {
        expect(win.print).to.be.calledOnce;
      });
    });
  });
});
