"use strict";

describe("server side rendered page", () => {
  it("should find meta description", () => {
    cy.visit("/guides/getting-started/");
    cy.get('head meta[name="description"]').should(
      "have.attr",
      "content",
      "Learn how to bundle a JavaScript application with webpack 5.",
    );
  });

  it("should find html tag with lang", () => {
    cy.visit("/");
    cy.get('html[lang="en"]');
  });

  it("should find meta charset", () => {
    cy.visit("/");
    cy.get('meta[charset="utf-8"]');
  });

  it("should find the home page meta description", () => {
    cy.visit("/");
    cy.get('head meta[name="description"]').should(
      "have.attr",
      "content",
      "webpack은 JavaScript, CSS, HTML, WebAssembly와 애셋을 브라우저, Node.js, Deno, Bun 및 기타 환경에 최적화된 결과물로 번들링합니다.",
    );
  });

  it("should find title", () => {
    cy.visit("/");
    cy.title().should("eq", "webpack");

    cy.visit("/guides/getting-started/");
    cy.title().should("eq", "Getting Started | webpack");
  });
});
