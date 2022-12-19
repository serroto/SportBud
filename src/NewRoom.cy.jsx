import NewRoom from './NewRoom'

describe('<NewRoom>', () => {
  it('mounts', () => {
    //Checking if the New Room Page is created and rendered
    cy.mount(<NewRoom />)
    //Checking if the data is succesfully passed from Create New Event Page to New Room Page
    cy.get('.passed-name').should('not.be.empty')
    cy.get('.passed-place').should('not.be.empty')
    cy.get('.passed-time').should('not.be.empty')
    cy.get('.passed-capacity').should('not.be.empty')
  })
})