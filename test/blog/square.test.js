
/**
 * @description 个人主页 test
 * @author  rumengbaobao
 */


const {COOKIE} = require('../test.userInfo')
const server = require('../server')

test('广场，加载第一页数据成功', async()=>{
    const res = await server
    .get(`/api/square/loadMore/0`)
    .set('cookie',COOKIE)
    
    expect(res.body.errno).toBe(0)
    const data = res.body.data
    expect(data).toHaveProperty('isEmpty')
    expect(data).toHaveProperty('blogList')
    expect(data).toHaveProperty('pageSize')
    expect(data).toHaveProperty('pageIndex')
    expect(data).toHaveProperty('count')
})