// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import moment from 'moment'

import { apiServer } from '../../cypress.json'

import loginPage from './pages/login'
import dashPage from './pages/dash'

Cypress.Commands.add('uiLogin', function (user) {
  loginPage.go()
  loginPage.form(user)
  loginPage.submit()
  dashPage.header.userLoggedIn(user.name)
})

Cypress.Commands.add('postUser', function (user) {
  cy.task('removeUser', user.email).then(function (result) {
    console.log(result)
  })
  cy.request({
    method: 'POST',
    url: apiServer + '/users',
    body: user,
  }).then(function (response) {
    expect(response.status).to.eq(200)
  })
})
Cypress.Commands.add('recoveryPass', function (email) {
  cy.request({
    method: 'POST',
    url: apiServer + '/password/forgot',
    body: { email: email },
  }).then(function (response) {
    expect(response.status).to.eq(204)

    cy.task('findToken', email).then(function (result) {
      Cypress.env('recoveryToken', result.token)
    })
  })
})
Cypress.Commands.add('createAppointment', function (hour) {
  // Intalar a biblioteca moment no pasta do cypress - yarn add moment -D
  // Esta biblioteca ajuda a formatar a data
  let now = new Date()
  while (now.getDay() === 0 || now.getDay() === 6) {
    now.setDate(now.getDate() + 1)
  }
  Cypress.env('appointmentDay', now.getDate())

  const date = moment(now).format(`YYYY-MM-DD ${hour}:00`)

  const payload = {
    provider_id: Cypress.env('providerId'),
    date: date,
  }
  cy.request({
    method: 'POST',
    url: apiServer + '/appointments',
    body: payload,
    headers: {
      authorization: 'Bearer ' + Cypress.env('apiToken'),
    },
  }).then(function (response) {
    expect(response.status).to.eq(200)
  })
})
Cypress.Commands.add('setProviderId', function (providerEmail) {
  cy.request({
    method: 'GET',
    url: apiServer + '/providers',
    headers: {
      authorization: 'Bearer ' + Cypress.env('apiToken'),
    },
  }).then(function (response) {
    expect(response.status).to.eq(200)
    console.log(response.body)

    const providerlist = response.body

    providerlist.forEach(function (provider) {
      if (provider.email === providerEmail) {
        Cypress.env('providerId', provider.id)
      }
    })
  })
})
Cypress.Commands.add('apiLogin', function (user) {
  const payload = {
    email: user.email,
    password: user.password,
  }
  cy.request({
    method: 'POST',
    url: apiServer + '/sessions',
    body: payload,
  }).then(function (response) {
    expect(response.status).to.eq(200)
    Cypress.env('apiToken', response.body.token)
  })
})
