# koa2 weibo
author: rumengbaobao

start a project:
1. koa2 -e projectname =>creat a project
2. npm i =>install concerned app
3. npm run dev =>to run the project
4. npm i cross-env -D =>install a tool cross-env
5. set environment as following in package.json
"dev": "cross-env NODE_ENV=dev./node_modules/.bin/nodemon bin/www",
"prd": "cross-env NODE_ENV=production pm2 start bin/www"

refactor your project:
6. add a folder "src" for all source code
  drag "routes","public","view" and "app" into src
  then change the path of app in the bin/www file
7. commit tips:
   for modifying structure of your codes 
   -> commit -m"refactor:xxxx"
   for a new feature
   -> commit -m"feature:xxx"
   for fix a bug
   -> commit -m"fix:xxx"
   for writing a new document
   -> commit -m"doc:xxx"

set your router:
8. get router => test with postman or page
=> get a page view
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Rumengbaobao'
  })
})
=>get a json file
router.get('/loadMore/:userName/:pageIndex', async(ctx,next)=>{
  const {userName,pageIndex} = ctx.params
  ctx.body= {
    title: 'this is loadMore page',
    userName,
    pageIndex
  }
})

9. post router => test with postman
router.post('/login',async(ctx,next)=>{
  const{userName, password} = ctx.request.body
  ctx.body={
    tag: "100",
    userName,
    password
  }
})


use ejs with variable:
10. variable
 <h1><%= title %></h1>
 <p><%= locals.msg %></p> =>if we're not sure of getting this variable from server, we could use "locals" to avoid problems

 11. condition if 
 <% if (isMe) { %>
      <a href="#">@ 提到我的(3)</a>
    <% } else { %>
      <button>关注</button>
    <% } %>
 * there is no = after %, because this is not output

 12. loop
    <ul>
        <% blogList.forEach(blog =>{%>
        <li><%= blog.title %></li>
        <% }) %>
    </ul>

 13. widgets
  <%- include('widgets/user_info',{
      isMe
    }) %> 
 * - include('path', {variable}) 


