import Login from './Login'

describe('<Login>', () => {
  it('mounts', () => {
    //Checking if the Login age is rendered
    cy.mount(<Login />)
    //Does the sign in button activates input validation function check
    cy.get('.login-form-button').invoke('validateForm')
  })
})