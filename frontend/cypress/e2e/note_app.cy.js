describe('Note app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3001/api/testing/reset');
		const user = {
			name: 'Aditya Chakraborty',
			username: 'aditya',
			password: 'pass123',
		};
		cy.request('POST', 'http://localhost:3001/api/users/', user);
		cy.visit('http://localhost:3000');
	});

	it('front page can be opened', function () {
		cy.contains('Notes');
		cy.contains(
			'Note app, Department of Computer Science, University of Helsinki 2022'
		);
	});

	it('User can logged in', async function () {
		cy.contains('Login').click();
		await cy.get('#user').type('aditya');
		cy.get('#password').type('pass123');
		cy.get('#login-button').click();

		cy.contains('Aditya Chakraborty logged-in');
	});

	describe('When logged in', function () {
		beforeEach(function () {
			cy.login({
				username: 'aditya',
				password: 'pass123',
			});
		});

		it('a new note can be created', async function () {
			cy.contains('new note').click();
			cy.get('input').type('a note created by cypress');
			await cy.contains('Save').click();
			cy.contains('a note created by cypress');
		});

		describe('and a note exists', function () {
			beforeEach(function () {
				cy.createNote({
					content: 'another note cypress',
					important: false,
				});
			});

			it('can be made important', async function () {
				cy.contains('another note cypress').contains('make important').click();
				await cy
					.contains('another note cypress')
					.contains('make not important');
			});
		});

		describe('and several notes exist', function () {
			beforeEach(function () {
				cy.createNote({ content: 'first note', important: false });
				cy.createNote({ content: 'second note', important: false });
				cy.createNote({ content: 'third note', important: false });
			});

			it('one of those can be made important', async function () {
				await cy.contains('second note').contains('make important').click();

				await cy.contains('second note').contains('make not important');
			});
		});
	});

	it('login fails', async function () {
		cy.contains('Login').click();
		await cy.get('#user').type('aditya');
		cy.get('#password').type('wrong');
		cy.get('#login-button').click();

		// cy.contains('Wrong credentials');
		cy.get('.error')
			.should('contain', 'Wrong credentials')
			.and('have.css', 'color', 'rgb(255, 0, 0)')
			.and('have.css', 'border-style', 'solid');

		cy.get('html').should('not.contain', 'Matti Luukkainen logged in');
	});
});
