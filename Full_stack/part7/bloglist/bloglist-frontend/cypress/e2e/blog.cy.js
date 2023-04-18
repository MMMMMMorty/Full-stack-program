describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    const newUser = {
      name: 'John Luukkainen',
      username: 'root',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', newUser)
    cy.visit('http://localhost:3003')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')

  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login')
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.contains('login').click()
      cy.contains('Matti Luukkainen logged in')
    })

    it('succeeds with wrong credentials', function() {
      cy.contains('login')
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainennnnn')
      cy.contains('login').click()
      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
      cy.contains('Matti Luukkainen logged in').should('not.exist')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.contains('login').click()
    })

    it('a new blog can be created', function() {
      cy.contains('new note').click()
      cy.get('#title').type('title')
      cy.get('#author').type('author')
      cy.get('#url').type('url')
      cy.get('#create-button').click()
      cy.contains('Succefully created a new blog by mluukkai')
      cy.get('.blogTitle')
    })
  })

  describe('when logged in and one blog is created', function() {
    beforeEach(function() {
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.contains('login').click()
      cy.contains('new note').click()
      cy.get('#title').type('title')
      cy.get('#author').type('author')
      cy.get('#url').type('url')
      cy.get('#create-button').click()
    })

    it('user can like the blog', function() {
      cy.get('.view-button').click()
      cy.get('.blogTitle')
      cy.get('.blogAuthor')
      cy.get('.blogUrl')
      cy.get('.blogLikes')
      cy.get('.like-button').click()
      cy.contains('likes 1')
    })

    it('user can delete the blog', function() {
      cy.get('.view-button').click()
      cy.get('.blogTitle')
      cy.get('.blogAuthor')
      cy.get('.blogUrl')
      cy.get('.blogLikes')
      cy.get('.delete-button').click()
      cy.get('.blogTitle').should('not.exist')
      cy.get('.blogAuthor').should('not.exist')
      cy.get('.blogUrl').should('not.exist')
      cy.get('.blogLikes').should('not.exist')
    })
  })
  describe('when two users logged in and only one user created one blog', function() {
    beforeEach(function() {
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.contains('login').click()
      cy.contains('new note').click()
      cy.get('#title').type('title')
      cy.get('#author').type('author')
      cy.get('#url').type('url')
      cy.get('#create-button').click()

      cy.contains('logout').click()

      cy.get('input:first').type('root')
      cy.get('input:last').type('salainen')
      cy.contains('login').click()
    })

    it('users can only remove their blog', function() {
      cy.get('.view-button').click()
      cy.get('.blogTitle')
      cy.get('.blogAuthor')
      cy.get('.blogUrl')
      cy.get('.blogLikes')
      cy.get('.delete-button').should('not.exist')
    })
  })

  describe('when one users logged in and created two blogs with different likes', function() {
    beforeEach(function() {
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.contains('login').click()
      cy.contains('new note').click()
      cy.get('#title').type('The title with the most likes')
      cy.get('#author').type('author')
      cy.get('#url').type('url')
      cy.get('#create-button').click()
      cy.get('.view-button').eq(0).click()
      cy.get('#title').type('The title with the second most likes')
      cy.get('#author').type('author')
      cy.get('#url').type('url')
      cy.get('#create-button').click()
      cy.get('.view-button').last().click()
      cy.get('.like-button').eq(0).click()
      cy.get('.like-button').eq(0).click()
      cy.get('.like-button').eq(0).click()
      cy.get('.like-button').eq(1).click()
      cy.get('.like-button').eq(1).click()
    })

    it('users can only remove their blog', function() {
      cy.get('.blogTitle').eq(0).should('contain', 'The title with the most likes')
      cy.get('.blogTitle').eq(1).should('contain', 'The title with the second most likes')
      // cy.get('.view-button').click()
      // cy.get('.blogTitle')
      // cy.get('.blogAuthor')
      // cy.get('.blogUrl')
      // cy.get('.blogLikes')
      // cy.get('.delete-button').should('not.exist')
    })
  })
})
