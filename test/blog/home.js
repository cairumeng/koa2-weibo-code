
/**
 * @description blog home test
 * @author  rumengbaobao
 */


const {COOKIE} = require('../test.userInfo')
const server = require('../server')

//存储微博id
let BLOG_ID = ''

test('创建微博应该成功', async () => {
    //定义测试内容
    const content = '单元测试自动创建的微博_' + Date.now()
    const image = '/xxx.png'

    //开始测试
    const res = await server
        .post('/api/blog/create')
        .send({
            content,
            image
        })
        .set('cookie', COOKIE)

    expect(res.body.errno).toBe(0)
    expect(res.body.data.content).toBe(content)
    expect(res.body.data.image).toBe(image)

    BLOG_ID = res.body.data.id
})

