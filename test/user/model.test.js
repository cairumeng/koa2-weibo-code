/**
 * @description user model test
 * @author rumengbaobao
 */

const { User } = require('../../src/db/models/index')

test('User 模型的各个属性，符合预期', () => {
    // build 会构建一个内存的user实例，但是不会提交到数据库中
    const user = User.build({
        userName: 'zhangsan',
        password: 'p123123',
        nickName: '张三',
        picture: '/xxx.png',
        city: '北京'
    })
    // 验证各种属性
    expect(user.userName).toBe('zhangsan')
    expect(user.password).toBe('p123123')
    expect(user.nickName).toBe('张三')
    expect(user.gender).toBe(3)//测试gender默认值
    expect(user.picture).toBe('/xxx.png')
    expect(user.city).toBe('北京')
})