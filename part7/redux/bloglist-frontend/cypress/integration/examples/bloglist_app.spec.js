describe('Bloglist app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    const user2 = {
      name: 'Matt Damon',
      username: 'mdamon',
      password: 'ramon',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.contains('login').click()
      cy.contains('Matti Luukkainen logged-in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.contains('login').click()
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.contains('new note').click()
      cy.get('#title').type('The Title')
      cy.get('#author').type('The Author')
      cy.get('#url').type('The Url')
      cy.get('#create').click()
      cy.get('.info')
        .should('contain', 'a new blog The Title by The Author added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.contains('The Title The Author')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'The Title',
          author: 'The Author',
          url: 'The Url',
        })
      })
      it('it can be liked', function () {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes 1')
      })
      it('it can be deleted by his creator', function () {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('.blog').should('not.exist')
      })
      describe('and logged with another user', function () {
        beforeEach(function () {
          cy.login({ username: 'mdamon', password: 'ramon' })
        })
        it('it cannot be deleted by another user', function () {
          cy.contains('view').click()
          cy.contains('remove').should('have.css', 'display', 'none')
        })
      })
    })
    describe('and three blog exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'The Title 1',
          author: 'The Author 1',
          url: 'The Url 1',
        })
        cy.createBlog({
          title: 'The Title 2',
          author: 'The Author 2',
          url: 'The Url 2',
        })
        cy.createBlog({
          title: 'The Title 3',
          author: 'The Author 3',
          url: 'The Url 3',
        })
      })
      it('the blogs are ordered according to likes with the blog with the most likes being first', function () {
        cy.intercept('PUT', /api\/blogs/, {}).as('blogPut')
        cy.contains('The Title 1')
          .contains('view')
          .click()
          .parent()
          .contains('like')
          .click()
        cy.contains('The Title 2')
          .contains('view')
          .click()
          .parent()
          .contains('like')
          .click()
          .click()
        cy.contains('The Title 3')
          .contains('view')
          .click()
          .parent()
          .contains('like')
          .click()
          .click()
          .click()
        cy.get('.blog').then(blogs => {
          cy.wrap(blogs[0]).contains('The Title 3')
        })
      })
    })
  })
})
