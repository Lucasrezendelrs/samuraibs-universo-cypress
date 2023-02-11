import { el } from './elements'
import header from '../../components/header'

class DashPage {
  // Acesso aos elementos do "header" através do método contructor
  constructor() {
    this.header = header
  }

  calendarShouldBeVisible() {
    cy.get('.DayPicker', { timeout: 7000 }).should('be.visible')
  }

  selectDay(day) {
    const target = new RegExp('^' + day + '$', 'g')
    cy.contains('.DayPicker-Day--available', day).click({ force: true })
  }

  appointmentShoulBe(customer, hour) {
    cy.contains('div', customer.name)
      .should('be.visible')
      .parent()
      .contains('span[class="appointment"]', hour)
      .should('be.visible')
  }
}
export default new DashPage()
