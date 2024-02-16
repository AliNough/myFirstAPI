describe('template spec', () => {
  it('passes', () => {
    cy.request('http://localhost:8090/api/collections/books/records')
  })
})