describe("Play the game", () => {
    it('Choose lesson', function () {
        cy.visit('http://localhost:8080/')
        cy.title().should('eq', 'Dragon Learn')
        cy.location('protocol').should('eq', 'http:')
        cy.contains("Ai có nhiều khối hơn?").parent().click()

    })

    it('Start lesson form', function () {
        cy.contains('Bắt đầu').should('be.visible')
        cy.get('.scene_under_start').should('have.class', 'blur_effect')
        cy.contains('Bắt đầu').should('be.visible').click()
        cy.get('.scene_under_start').should('have.class', 'scene_under_start')
        cy.contains('Trở về').click()
        cy.location('protocol').should('eq', 'http:')

    })
    it('play game', function () {
        cy.contains("Ai có nhiều khối hơn?").parent().click().get('.btn_play--start').click()

    })
})