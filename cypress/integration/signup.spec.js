

it('Deve cadastrar um novo usuário', function () {
  const name = 'Lucas Rezende'
  const email = 'lucasilva17934@gmail.com'
  const password = 'pwd123'

  cy.visit('/signup')

  cy.get('input[placeholder = "Nome"]').type(name)
  cy.get('input[placeholder = "E-mail"]').type(email)
  cy.get('input[placeholder = "Senha"]').type(password)

  //Criação de ouvinte para ficar esperando até que uma requisição POST na rota "users" aconteça 
  //Uma vez que isso aconteça ele deve trocar para 200
  cy.intercept('POST','/users',{
    statusCode: 200
  }).as('postUser')

  cy.contains('button', 'Cadastrar').click()

  //Espera a aplicação invocar a API depois do clique no botão para pegar o status code para enganar a aplicação
  //Uma vez que a aplicação recebe o status 200, ela vai mostrar toaster de sucesso
  cy.wait('@postUser')

  cy.get('.toast')
    .should('be.visible')
    .find('p')
    .should(
      'have.text',
      'Agora você pode fazer seu login no Samurai Barbershop!'
    )
})
