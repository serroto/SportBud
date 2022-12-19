import Welcome from './Welcome'

describe('<Welcome>', () => {
  it('mounts', () => {
    //Checking if the Welcome Page is created and rendered
    cy.mount(<Welcome />)
    //Checking if the google maps api autocomplete locations are passed and displayed
    cy.get('.autocomplete-dropdown-container').should('not.be.empty')
  })
})