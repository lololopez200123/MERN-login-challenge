const User = require('../models/User')
const { api, getUsers } = require('./helpers')
const moongose = require('mongoose')
const bcrypt = require('bcrypt')

// CREATE USER
describe('creating new user', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const password = await bcrypt.hash('pswd', 10)
        const user = new User({ name: 'lorenzo', email:'testdeprueba2@gmail.com', password})

        await user.save()
    })

    test('expected create a new user', async () => {
        const usersStart = await getUsers()
        const newUser = {
            name: 'lorenzo-test',
            email: 'testdeprueba@gmail.com',
            password: 'test123lorenzo'
        }
        await api
            .post('/api/users/add-user')
            .send(newUser)
            .expect(202)
            .expect('Content-Type', /application\/json/)

        const usersFinals = await getUsers()

        expect(usersFinals).toHaveLength(usersStart.length + 1)

        const userNames = usersFinals.map(user => user.name)
        expect(userNames).toContain(newUser.name)
    })

    // GET IF DUPLICATE EMAIL
    test('creation fails with email is already created', async () => {
    const usersStart = await getUsers()

    const newUser = {
            name: 'lorenzo-test',
            email: 'testdeprueba2@gmail.com',
            password: 'test123lorenzo'
        }

    const result = await api
      .post('/api/users/add-user')
      .send(newUser)
      .expect(409)
      .expect('Content-Type', /application\/json/)

    const usersFinals = await getUsers()
    expect(usersFinals).toHaveLength(usersStart.length)
  })


  afterAll(() => {
      moongose.connection.close()
    })

})