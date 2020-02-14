/**
 * @description test demo
 */
const request = require('./server')

const sum = (a, b) => a + b

test('test demo', async () => {
    const response = await request.get('/users')
    expect(response.text).toBe('this is a users response!')
})