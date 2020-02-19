/**
 * @description user api test
 * @author rumengbaobao
 */

const server = require('../server')


// 用户信息
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
    userName,
    password,
    nickName: userName,
    gender: 1
}

// 存储cookie
let COOKIE = ''

// 注册
test('注册一个用户，应该成功', async () => {
    const res = await server
        .post('/api/user/register')
        .send(testUser)
    expect(res.body.errno).toBe(0)
})

// 重复注册
test('重复注册用户，应该失败', async () => {
    const res = await server
        .post('/api/user/register')
        .send(testUser)
    expect(res.body.errno).not.toBe(0)
})

// 查询用户是否存在
test('查询注册用户，应该存在', async () => {
    const res = await server
        .post('/api/user/isExist')
        .send({ userName })
    expect(res.body.errno).toBe(0)
})

// json schema 检测
test('json schema 检测，非法格式注册应该失败', async () => {
    const res = await server
        .post('/api/user/register')
        .send({
            userName: '123',//用户名不是字母或者下划线开头
            password: 'a',//最小长度不是3
            gender: 'mail'// 不是数字
        })
    expect(res.body.errno).not.toBe(0)
})

// 登录
test('登录，应该成功', async () => {
    const res = await server
        .post('/api/user/login')
        .send({
            userName,
            password
        })
    expect(res.body.errno).toBe(0)
    //获取cookie
    console.log(res.headers['set-cookie'])
    COOKIE = res.headers['set-cookie'].join(';')
})

// 删除
test('删除用户，应该成功', async () => {
    const res = await server
        .post('/api/user/delete')
        .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
})

// // 再次查询用户应该不存在
// test('删除之后，查询注册用户，应该不存在', async () => {
//     const res = await server
//         .post('/api/user/isExist')
//         .send({ userName })
//     expect(res.body.errno).not.toBe(0)
// })