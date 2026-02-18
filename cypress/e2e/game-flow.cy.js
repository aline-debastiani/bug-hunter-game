describe("Bug Hunter Game - main flow", () => {
  beforeEach(() => {
    // garante estado limpo entre testes
    cy.clearLocalStorage();
  });

  it("plays mission M1 and shows result", () => {
    cy.visit("/");

    cy.getByCy("mission-card-M1").click();

    // seleciona opção A (ajuste se sua missão M1 tiver outra correta)
    cy.getByCy("option-A").click();

    cy.getByCy("submit-answer").click();

    cy.getByCy("result-card").should("exist");
    cy.getByCy("points-earned").should("contain", "Points earned");
  });

  it("does not award points twice for the same mission", () => {
    cy.visit("/");

    // primeira vez: pontua
    cy.getByCy("mission-card-M1").click();
    cy.getByCy("option-A").click();
    cy.getByCy("submit-answer").click();

    cy.getByCy("points-earned").invoke("text").then((t1) => {
      // volta e joga de novo a mesma missão
      cy.visit("/");
      cy.getByCy("mission-card-M1").click();
      cy.getByCy("option-A").click();
      cy.getByCy("submit-answer").click();

      cy.getByCy("points-earned").should("contain", "0");
      // opcional: se você colocou a mensagem
      // cy.getByCy("no-points-message").should("exist");
    });
  });
});
