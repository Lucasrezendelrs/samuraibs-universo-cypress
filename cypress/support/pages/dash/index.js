import { el } from './elements'
import header from '../../components/header'

class DashPage {
  // Acesso aos elementos do "header" através do método contructor
  constructor() {
    this.header = header
  }

  calendarShouldBeVisible() {
    cy.get(el.calendar, { timeout: 7000 }).should('be.visible')
  }

  selectDay(day) {
    const target = new RegExp('^' + day + '$', 'g')
    cy.contains(el.boxday, target).click({ force: true })
  }

  appointmentShoulBe(customer, hour) {
    cy.contains('div', customer.name)
      .should('be.visible')
      .parent()
      .contains(el.boxHour, hour)
      .should('be.visible')
  }
}
export default new DashPage()
