describe('server side rendered page', () => {
  it('should find meta description', () => {
    cy.visit('/guides/getting-started/');
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'Learn how to bundle a JavaScript application with webpack 5.'
    );
  });

  it('should find html tag with lang', () => {
    cy.visit('/');
    cy.get('html[lang="en"]');
  });

  it('should find meta charset', () => {
    cy.visit('/');
    cy.get('meta[charset="utf-8"]');
  });

  it('should find the default meta description', () => {
    cy.visit('/');
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      '웹팩은 모듈 번들러입니다. 주요 목적은 브라우저에서 사용할 수 있도록 JavaScript 파일을 번들로 묶는 것이지만, 리소스나 애셋을 변환하고 번들링 또는 패키징할 수도 있습니다.'
    );
  });

  it('should find title', () => {
    cy.visit('/');
    cy.title().should('eq', 'webpack');

    cy.visit('/guides/getting-started/');
    cy.title().should('eq', 'Getting Started | 웹팩');
  });
});
